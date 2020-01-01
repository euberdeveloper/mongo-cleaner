import { MongoCleanerError } from './mongoCleanerError';

/** The error of a problem with mongo-cleaner when connecting to MongoDB */
export class MongoCleanerDisconnectionError extends MongoCleanerError {
    /** The uri of the failed connection */
    public uri: string;

    constructor(message?: string, uri?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerDisconnectionError';
        this.message = message || 'MongoCleaner: Error in disconnecting to mongodb';
        this.uri = uri || null;
        this.triggerError = triggerError || null;
    }
}