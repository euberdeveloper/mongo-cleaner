import { MongoCleanerError } from './mongoCleanerError';

/** The error thrown when the MongoDB is not totally cleaned */
export class MongoCleanerCleanError extends MongoCleanerError {
    /** The database that cannot be dropped or whose collection cannot be dropped/emptied */
    public database: string;
    /** The collection that cannot be dropped or emptied. Null, if the problem is with a database */
    public collection: string;

    constructor(message?: string, database?: string, collection?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerCleanError';
        this.message = message || 'MongoCleaner: Error in cleaning MongoDB';
        this.database = database || null;
        this.collection = collection || null;
        this.triggerError = triggerError || null;
    }
}
