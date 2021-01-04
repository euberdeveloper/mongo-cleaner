/* eslint-disable @typescript-eslint/naming-convention */

/** An error in the mongo-cleaner module */
export class MongoCleanerError extends Error {
    protected __proto__: Error;

    /** The error that happened */
    public triggerError: Error;

    /**
     * The constructor of the MongoCleanerError class.
     * @param message The message of the error.
     * @param triggerError The original error that triggered this error.
     */
    constructor(message?: string, triggerError?: Error) {
        // This includes a trick in order to make the instanceof properly work
        const trueProto = new.target.prototype;
        /* istanbul ignore next */
        super(message);
        this.__proto__ = trueProto;

        this.name = 'MongoCleanerError';
        this.triggerError = triggerError ?? null;
    }
}
