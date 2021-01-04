import { MongoClient } from 'mongodb';

import { MongoCleanerConnectionOptions, MongoCleanerOptions } from '../interfaces';
import { MongoCleanerConnectionError } from '../errors/mongoCleanerConnectionError';
import { MongoCleanerDisconnectionError } from '../errors/mongoCleanerDisconnectionError';
import { MongoCleanerListDatabasesError, MongoCleanerListCollectionsError } from '../errors';
import { MongoCleanerCleanError } from '../errors/mongoCleanerCleanError';
import { Logger } from './logger';

/**
 * The class that handles the cleaning code, doing the bigger part of the job.
 */
export class Cleaner {
    /**
     * The uri for the MongoDB database.
     */
    private readonly uri: string;
    /**
     * The connection options to the MongoDB.
     */
    private readonly connectionOptions: MongoCleanerConnectionOptions;
    /**
     * The options for the cleaner.
     */
    private readonly options: MongoCleanerOptions;
    /**
     * The MongoDB connection.
     */
    private connection: MongoClient;
    /**
     * The instance of the logger.
     */
    private readonly logger: Logger;

    /**
     * The constructor of the class.
     * @param uri The uri for the MongoDB database.
     * @param connectionOptions The connection options to the MongoDB.
     * @param options The options for the cleaner.
     */
    constructor(uri: string, connectionOptions: MongoCleanerConnectionOptions, options: MongoCleanerOptions) {
        this.uri = uri;
        this.connectionOptions = connectionOptions;
        this.options = options;
        this.logger = new Logger(options);
    }

    /**
     * A method returning a promise that waits the passed number of milliseconds.
     * @param millisecond The number of milliseconds.
     */
    private async sleep(millisecond: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, millisecond));
    }

    /**
     * The method for connecting to the database.
     * @throws MongoCleanerConnectionError
     */
    private async connect(): Promise<void> {
        try {
            this.connection = await MongoClient.connect(this.uri, this.connectionOptions);
        } catch (error) {
            /* istanbul ignore next */
            throw new MongoCleanerConnectionError(null, this.uri, this.connectionOptions, error);
        }
    }

    /**
     * The method for disconnecting to the database.
     * @throws MongoCleanerDisconnectionError
     */
    private async disconnect(): Promise<void> {
        try {
            await this.connection.close();
        } catch (error) {
            /* istanbul ignore next */
            throw new MongoCleanerDisconnectionError(null, this.uri, error);
        }
    }

    /**
     * A method that passed a database name, based on the instance options, reurns true if the database is to be cleaned or false otherwise.
     * @param database The database name.
     * @returns If the database is to be cleaned.
     */
    private filterDatabase(database: string): boolean {
        return (this.options.keep as (string | RegExp | ((db: string) => boolean))[]).every(
            pattern =>
                (typeof pattern === 'string' && database !== pattern) ||
                (pattern instanceof RegExp && !pattern.test(database)) ||
                (typeof pattern === 'function' && !pattern(database))
        );
    }

    /**
     * Fetches from MongoDB all the databases and returns the ones that are to be cleaned.
     * @returns The databases that are to be cleaned.
     * @throws MongoCleanerListDatabasesError
     */
    private async getDatabases(): Promise<string[]> {
        try {
            return (await this.connection.db().admin().listDatabases()).databases
                .map(database => database.name)
                .filter((database: string) => this.filterDatabase(database));
        } catch (error) {
            /* istanbul ignore next */
            throw new MongoCleanerListDatabasesError(null, error);
        }
    }

    /**
     * Fetches from MongoDB all the collections of a database and returns the ones that are to be cleaned.
     * @param database The database whose collections will be fetched.
     * @returns The collections of the database that are to be cleaned.
     * @throws MongoCleanerListCollectionsError
     */
    private async getCollections(database: string): Promise<string[]> {
        try {
            return (await this.connection.db(database).listCollections().toArray())
                .map(collection => collection.name)
                .filter((collection: string) => !/^system./.test(collection));
        } catch (error) {
            if (this.options.throwIfNotTotal) {
                throw new MongoCleanerListCollectionsError(null, database, error);
            }
        }
    }

    /**
     * Empties a collection, by removing all its documents.
     * @param database The database of the collection.
     * @param collection The collection to empty.
     * @param attempts The number of remaining attempts to empty the collection, after which an error could be thrown.
     * @throws MongoCleanerCleanError
     */
    private async emptyCollection(database: string, collection: string, attempts: number): Promise<void> {
        try {
            this.logger.startEmptyCollection(collection);
            await this.connection.db(database).collection(collection).deleteMany({});
            this.logger.stopEmptyCollection(true);
        } catch (error) {
            if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.emptyCollection(database, collection, attempts - 1);
            } else {
                this.logger.stopEmptyCollection(false);
                /* istanbul ignore if */
                if (this.options.throwIfNotTotal) {
                    throw new MongoCleanerCleanError(
                        'MongoCleaner: Error in emptying collection',
                        database,
                        collection,
                        error
                    );
                }
            }
        }
    }

    /**
     * Cleans a collection, by removing it.
     * @param database The database of the collection.
     * @param collection The collection to empty.
     * @param attempts The number of remaining attempts to clean the collection, after which an error could be thrown.
     * @throws MongoCleanerCleanError
     */
    private async cleanCollection(database: string, collection: string, attempts: number): Promise<void> {
        try {
            this.logger.startDropCollection(collection);
            await this.connection.db(database).dropCollection(collection);
            this.logger.stopDropCollection(true);
        } catch (error) {
            if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.cleanCollection(database, collection, attempts - 1);
            } else if (this.options.emptyCollections) {
                this.logger.stopDropCollection(false, true);
                await this.emptyCollection(database, collection, this.options.numberOfRetries);
            } else {
                this.logger.stopDropCollection(false, false);
                if (this.options.throwIfNotTotal) {
                    throw new MongoCleanerCleanError(
                        'MongoCleaner: Error in dropping collection',
                        database,
                        collection,
                        error
                    );
                }
            }
        }
    }

    /**
     * Empties a database, by removing all its collections.
     * @param database The database to empty.
     */
    private async emptyDatabase(database: string): Promise<void> {
        const collections = await this.getCollections(database);

        for (const collection of collections) {
            if (this.options.emptyDatabases) {
                await this.cleanCollection(database, collection, this.options.numberOfRetries);
            } else {
                await this.emptyCollection(database, collection, this.options.numberOfRetries);
            }
        }
    }

    /**
     * Cleans a database, by removing it.
     * @param database The database to clean.
     * @param attempts The number of remaining attempts to clean the database, after which an error could be thrown.
     * @throws MongoCleanerCleanError
     */
    private async cleanDatabase(database: string, attempts: number): Promise<void> {
        try {
            this.logger.startDropDatabase(database);
            await this.connection.db(database).dropDatabase();
            this.logger.stopDropDatabase(true);
        } catch (error) {
            if (database === 'admin') {
                this.logger.stopDropDatabase(false, true);
            } else if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.cleanDatabase(database, attempts - 1);
            } else if (this.options.emptyDatabases || this.options.emptyCollections) {
                this.logger.stopDropDatabase(false, true);
                await this.emptyDatabase(database);
            } else {
                this.logger.stopDropDatabase(false, false);
                if (this.options.throwIfNotTotal && database !== 'admin') {
                    throw new MongoCleanerCleanError('MongoCleaner: Error in dropping database', database, null, error);
                }
            }
        }
    }

    /**
     * Cleans an array of databases.
     * @param databases The database to be cleaned.
     */
    private async cleanDatabases(databases: string[]): Promise<void> {
        for (const database of databases) {
            if (this.options.dropDatabases) {
                await this.cleanDatabase(database, this.options.numberOfRetries);
            } else {
                this.logger.printDatabase(database);
                await this.emptyDatabase(database);
            }
        }
    }

    /**
     * Does the whole process of cleaning the databases, based on the options given to the class constructor.
     * @throws MongoCleanerCleanError
     */
    public async clean(): Promise<void> {
        await this.connect();
        const databases = await this.getDatabases();
        await this.cleanDatabases(databases);
        await this.disconnect();
    }
}
