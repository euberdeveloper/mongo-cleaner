/** An error in the mongo-cleaner module */
export class MongoCleanerError extends Error {
    /** The error that happened */
    public triggerError: Error;

    constructor(message?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerError';
        this.triggerError = triggerError || null;
    }
}
