import { MongoCleanerError } from './mongoCleanerError';

/** The error of mongo-cleaner when listing databases */
export class MongoCleanerListDatabasesError extends MongoCleanerError {
    constructor(message?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerListDatabasesError';
        this.message = message || 'MongoCleaner: Error in listing databases';
        this.triggerError = triggerError || null;
    }
}