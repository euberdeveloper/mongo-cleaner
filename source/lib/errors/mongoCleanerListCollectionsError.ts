import { MongoCleanerError } from './mongoCleanerError';

/** The error of mongo-cleaner when listing collections */
export class MongoCleanerListCollectionsError extends MongoCleanerError {
    /** Database whose collections failed to be listed */
    public database: string;

    /**
     * The constructor of the MongoCleanerListCollectionsError class.
     * @param message The message of the error.
     * @param database The database whose collections were to be listed.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, database?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerListCollectionsError';
        this.message = message || 'MongoCleaner: Error in listing collections';
        this.database = database || null;
        this.triggerError = triggerError || null;
    }
}
