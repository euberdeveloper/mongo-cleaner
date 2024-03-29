/** An error in the mongo-cleaner module */
export class MongoCleanerError extends Error {
    /** The error that happened */
    public triggerError: Error | null;

    /**
     * The constructor of the MongoCleanerError class.
     * @param message The message of the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, triggerError?: Error) {
        super(message);
        this.name = 'MongoCleanerError';
        this.triggerError = triggerError ?? null;
    }
}
