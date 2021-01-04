import { MongoCleanerError } from './mongoCleanerError';

/** The error of a problem with mongo-cleaner when connecting to MongoDB */
export class MongoCleanerDisconnectionError extends MongoCleanerError {
    /** The uri of the failed connection */
    public uri: string;

    /**
     * The constructor of the MongoCleanerDisconnectionError class.
     * @param message The message of the error.
     * @param uri The uri of the MongoDB connection that caused the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, uri?: string, triggerError?: Error) {
        /* istanbul ignore next */
        super(message);
        this.name = 'MongoCleanerDisconnectionError';
        this.message = message || 'MongoCleaner: Error in disconnecting to mongodb';
        this.uri = uri || null;
        this.triggerError = triggerError || null;
    }
}
