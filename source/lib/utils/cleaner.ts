import { MongoClient } from 'mongodb';

import { MongoCleanerConnectionOptions, MongoCleanerOptions } from '../interfaces';
import { MongoCleanerConnectionError } from '../errors/mongoCleanerConnectionError';
import { MongoCleanerDisconnectionError } from '../errors/mongoCleanerDisconnectionError';
import { MongoCleanerListDatabasesError, MongoCleanerListCollectionsError } from '../errors';
import { MongoCleanerCleanError } from '../errors/mongoCleanerCleanError';
import { Logger } from './logger';

export class Cleaner {

    private uri: string;
    private connectionOptions: MongoCleanerConnectionOptions;
    private options: MongoCleanerOptions;
    private connection: MongoClient;
    private logger: Logger;

    constructor(uri: string, connectionOptions: MongoCleanerConnectionOptions, options: MongoCleanerOptions) {
        this.uri = uri;
        this.connectionOptions = connectionOptions;
        this.options = options;
        this.logger = new Logger(options);
    }

    private async sleep(millisecond: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, millisecond));
    }

    private async connect(): Promise<void> {
        try {
            this.connection = await MongoClient.connect(this.uri, this.connectionOptions);
        }
        catch (error) {
            throw new MongoCleanerConnectionError(null, this.uri, this.connectionOptions, error);
        }
    }

    private async disconnect(): Promise<void> {
        try {
            await this.connection.close();
        }
        catch (error) {
            throw new MongoCleanerDisconnectionError(null, this.uri, error);
        }
    }

    private filterDatabase(database: string): boolean {
        return (this.options.keep as (string | RegExp | ((db: string) => boolean))[])
            .every(pattern =>  (
                typeof pattern === 'string' && database !== pattern)
                || pattern instanceof RegExp && !pattern.test(database)
                || typeof pattern === 'function' && !pattern(database)
            );
    }

    private async getDatabases(): Promise<string[]> {
        try {
            return (await this.connection.db().admin().listDatabases())
                .databases.map(database => database.name)
                .filter((database: string) => this.filterDatabase(database));
        }
        catch (error) {
            throw new MongoCleanerListDatabasesError(null, error);
        }
    }

    private async getCollections(database: string): Promise<string[]> {
        try {
            return (await this.connection.db(database).listCollections().toArray())
                .map(collection => collection.name)
                .filter((collection: string) => !/^system./.test(collection));
        }
        catch (error) {
            if (this.options.throwIfNotTotal) {
                throw new MongoCleanerListCollectionsError(null, database, error);
            }
        }
    }

    private async emptyCollection(database: string, collection: string, attempts: number): Promise<void> {
        try {
            this.logger.startEmptyCollection(collection);
            await this.connection.db(database).collection(collection).deleteMany({});
            this.logger.stopEmptyCollection(true);
        }
        catch (error) {
            if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.emptyCollection(database, collection, attempts - 1);
            }
            else {
                this.logger.stopEmptyCollection(false);
                if (this.options.throwIfNotTotal) {
                    throw new MongoCleanerCleanError('MongoCleaner: Error in emptying collection', database, collection, error);
                }
            }
        }
    }

    private async cleanCollection(database: string, collection: string, attempts: number): Promise<void> {
        try {
            this.logger.startDropCollection(collection);
            await this.connection.db(database).dropCollection(collection);
            this.logger.stopDropCollection(true);
        }
        catch (error) {
            if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.cleanCollection(database, collection, attempts - 1);
            }
            else if (this.options.emptyCollections) {
                this.logger.stopDropCollection(false, true);
                await this.emptyCollection(database, collection, this.options.numberOfRetries);
            }
            else {
                this.logger.stopDropCollection(false, false);
                if (this.options.throwIfNotTotal) {
                    throw new MongoCleanerCleanError('MongoCleaner: Error in dropping collection', database, collection, error);
                }
            }
        }
    }

    private async emptyDatabase(database: string): Promise<void> {
        const collections = await this.getCollections(database);

        for (const collection of collections) {
            if (this.options.emptyDatabases) {
                await this.cleanCollection(database, collection, this.options.numberOfRetries);
            }
            else {
                await this.emptyCollection(database, collection, this.options.numberOfRetries);
            }
        }
    }

    private async cleanDatabase(database: string, attempts: number): Promise<void> {
        try {
            this.logger.startDropDatabase(database);
            await this.connection.db(database).dropDatabase();
            this.logger.stopDropDatabase(true);
        }
        catch (error) {
            if (database === 'admin') {
                this.logger.stopDropDatabase(false, true);
            }
            else if (attempts > 0) {
                this.logger.stopAndClear();
                await this.sleep(this.options.retryMilliseconds);
                await this.cleanDatabase(database, attempts - 1);
            }
            else if (this.options.emptyDatabases || this.options.emptyCollections) {
                this.logger.stopDropDatabase(false, true);
                await this.emptyDatabase(database);
            }
            else {
                this.logger.stopDropDatabase(false, false);
                if (this.options.throwIfNotTotal && database !== 'admin') {
                    throw new MongoCleanerCleanError('MongoCleaner: Error in dropping database', database, null, error);
                }
            }
        }
    }

    private async cleanDatabases(databases: string[]): Promise<void> {
        for (const database of databases) {

            if (this.options.dropDatabases) {
                await this.cleanDatabase(database, this.options.numberOfRetries);
            }
            else {
                this.logger.printDatabase(database);
                await this.emptyDatabase(database);
            }

        }
    }

    public async clean(): Promise<void> {
        await this.connect();
        const databases = await this.getDatabases();
        await this.cleanDatabases(databases);
        await this.disconnect();
    }

}