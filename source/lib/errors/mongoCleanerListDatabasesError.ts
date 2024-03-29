import { MongoCleanerError } from './mongoCleanerError.js';

/** The error of mongo-cleaner when listing databases */
export class MongoCleanerListDatabasesError extends MongoCleanerError {
    /**
     * The constructor of the MongoCleanerListDatabasesError class.
     * @param message The message of the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerListDatabasesError';
        this.triggerError = triggerError ?? null;
    }
}
