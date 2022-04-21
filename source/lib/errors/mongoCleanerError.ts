/* eslint-disable @typescript-eslint/naming-convention */

/** An error in the mongo-cleaner module */
export class MongoCleanerError extends Error {
    protected __proto__: Error;

    /** The error that happened */
    public triggerError: Error | null;

    /**
     * The constructor of the MongoCleanerError class.
     * @param message The message of the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, triggerError?: Error) {
        // This includes a trick in order to make the instanceof properly work
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = 'MongoCleanerError';
        this.triggerError = triggerError ?? null;
    }
}
