import { MongoCleanerError } from './mongoCleanerError.js';

/** The error thrown when the MongoDB is not totally cleaned */
export class MongoCleanerCleanError extends MongoCleanerError {
    /** The database that cannot be dropped or whose collection cannot be dropped/emptied */
    public database: string | null;
    /** The collection that cannot be dropped or emptied. Null, if the problem is with a database */
    public collection: string | null;

    /**
     * The constructor of the MongoCleanerError class.
     * @param message The message of the error.
     * @param database The database that was attempted to be cleaned.
     * @param collection The collection that was attempted to be cleaned.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, database?: string, collection?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerCleanError';
        this.database = database ?? null;
        this.collection = collection ?? null;
        this.triggerError = triggerError ?? null;
    }
}
