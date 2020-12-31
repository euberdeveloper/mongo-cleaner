import * as ora from 'ora';
import { Ora } from 'ora';
import { MongoCleanerOptions } from '../interfaces';

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
    constructor(options: MongoCleanerOptions) {
        this.log = options.log;
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
        if (this.log) {
            this.spinner = ora({
                text: `Dropping ${database}`,
                spinner: 'dots2'
            }).start();
        }
    }
    /**
     * Stops the log for dropping a database, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopDropDatabase(succeded: boolean, fallback?: boolean): void {
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
     * Starts the log for dropping a collection, by showing a spinner.
     * @param collection The collection that is going to be dropped.
     */
    public startDropCollection(collection: string): void {
        if (this.log) {
            this.spinner = ora({
                text: `Dropping ${collection}`,
                indent: 2,
                spinner: 'dots2'
            }).start();
        }
    }
    /**
     * Stops the log for dropping a collection, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopDropCollection(succeded: boolean, fallback?: boolean): void {
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
     * Starts the log for emptying a collection, by showing a spinner.
     * @param collection The collection that is going to be emptied.
     */
    public startEmptyCollection(collection: string): void {
        if (this.log) {
            this.spinner = ora({
                text: `Emptying ${collection}`,
                indent: 2,
                spinner: 'dots2'
            }).start();
        }
    }
    /**
     * Stops the log for emptying a collection, by stopping the current spinner.
     * @param succeded If the operation succeded.
     * @param fallback If there is a fallback in case the operation did not succed.
     */
    public stopEmptyCollection(succeded: boolean): void {
        if (this.log) {
            if (succeded) {
                this.spinner.succeed();
            } else {
                this.spinner.fail();
            }
        }
    }

    /**
     * Stops the current spinner.
     */
    public stopAndClear(): void {
        if (this.log) {
            this.spinner.stop();
        }
    }
}
