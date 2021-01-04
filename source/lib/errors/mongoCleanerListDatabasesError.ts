import { MongoCleanerError } from './mongoCleanerError';

/** The error of mongo-cleaner when listing databases */
export class MongoCleanerListDatabasesError extends MongoCleanerError {
    /**
     * The constructor of the MongoCleanerListDatabasesError class.
     * @param message The message of the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, triggerError?: Error) {
        /* istanbul ignore next */
        super(message);
        this.name = 'MongoCleanerListDatabasesError';
        this.message = message || 'MongoCleaner: Error in listing databases';
        this.triggerError = triggerError || null;
    }
}
