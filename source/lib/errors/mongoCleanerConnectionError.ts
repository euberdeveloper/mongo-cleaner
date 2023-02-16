import { MongoCleanerConnectionOptions } from '../types/index.js';
import { MongoCleanerError } from './mongoCleanerError.js';

/** The error of a problem with mongo-cleaner when connecting to MongoDB */
export class MongoCleanerConnectionError extends MongoCleanerError {
    /** The uri of the failed connection */
    public uri: string | null;
    /** The MongoClient connection-options of the failed connection */
    public connectionOptions: MongoCleanerConnectionOptions | null;

    /**
     * The constructor of the MongoCleanerConnectionOptions class.
     * @param message The message of the error.
     * @param uri The uri of the MongoDB connection that caused the error.
     * @param connectionOptions The options of the MongoDB connection that caused the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(
        message?: string,
        uri?: string,
        connectionOptions?: MongoCleanerConnectionOptions,
        triggerError?: Error
    ) {
        super(message);
        this.name = 'MongoCleanerConnectionError';
        this.uri = uri ?? null;
        this.connectionOptions = connectionOptions ?? null;
        this.triggerError = triggerError ?? null;
    }
}
