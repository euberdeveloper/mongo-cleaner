import * as ora from 'ora';
import { Ora } from 'ora';
import { MongoCleanerInternalOptions } from '@/interfaces';

/**
 * The logger class.
 */
export class Logger {
    /**
     * If the logger is activated.
     */
    private readonly log: boolean;
    /**
     * The instance of a spinner made by the ora module.
     */
    private spinner: Ora;

    /**
     * The constructor of the logger class.
     * @param options The options of the logger.
     */
    constructor(options: MongoCleanerInternalOptions) {
        this.log = options.log;
    }

    /**
     * Helper method for starting the spinner.
     * @param message The message to log.
     */
    private startSpinner(message: string): void {
        if (this.log) {
            this.spinner = ora({
                text: message,
                spinner: 'dots2'
            }).start();
        }
    }

    /**
     * Helper method for stopping the spinner.
     * @param succeded If the outcome were positive.
     * @param fallback If the outcome were negative, use a fallback.
     */
    private stopSpinner(succeded: boolean, fallback?: boolean): void {
        if (this.log) {
            if (succeded) {
                this.spinner.succeed();
            } else if (fallback) {
                this.spinner.warn();
            } else {
                this.spinner.fail();
            }
        }
    }

    /**
     * Prints a database.
     * @param database The database to print.
     */
    public printDatabase(database: string): void {
        if (this.log) {
            console.log(database);
        }
    }

    /**
     * Starts the log for dropping a database, by showing a spinner.
     * @param database The database that is going to be dropped.
     */
    public startDropDatabase(database: string): void {
        this.startSpinner(`Dropping ${database}`);
    }
    /**
     * Stops the log for dropping a database, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopDropDatabase(succeded: boolean, fallback?: boolean): void {
        this.stopSpinner(succeded, fallback);
    }

    /**
     * Starts the log for dropping a collection, by showing a spinner.
     * @param collection The collection that is going to be dropped.
     */
    public startDropCollection(collection: string): void {
        this.startSpinner(`Dropping ${collection}`);
    }
    /**
     * Stops the log for dropping a collection, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopDropCollection(succeded: boolean, fallback?: boolean): void {
        this.stopSpinner(succeded, fallback);
    }

    /**
     * Starts the log for emptying a collection, by showing a spinner.
     * @param collection The collection that is going to be emptied.
     */
    public startEmptyCollection(collection: string): void {
        this.startSpinner(`Emptying ${collection}`);
    }
    /**
     * Stops the log for emptying a collection, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopEmptyCollection(succeded: boolean): void {
        this.stopSpinner(succeded, false);
    }

    /**
     * Stops the current spinner, deleting its last output.
     */
    public stopAndClear(): void {
        if (this.log) {
            this.spinner.stop();
        }
    }
}
