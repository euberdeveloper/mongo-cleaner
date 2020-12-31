import { MongoCleanerConnectionOptions } from '../interfaces';
import { MongoCleanerError } from './mongoCleanerError';

/** The error of a problem with mongo-cleaner when connecting to MongoDB */
export class MongoCleanerConnectionError extends MongoCleanerError {
    /** The uri of the failed connection */
    public uri: string;
    /** The MongoClient connection-options of the failed connection */
    public connectionOptions: MongoCleanerConnectionOptions;

    constructor(
        message?: string,
        uri?: string,
        connectionOptions?: MongoCleanerConnectionOptions,
        triggerError?: Error
    ) {
        super(message);
        this.name = 'MongoCleanerConnectionError';
        this.message = message || 'MongoCleaner: Error in connecting to mongodb';
        this.uri = uri || null;
        this.connectionOptions = connectionOptions || null;
        this.triggerError = triggerError || null;
    }
}
