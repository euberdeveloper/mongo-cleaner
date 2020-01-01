import * as ora from 'ora';
import { Ora } from 'ora';
import { MongoCleanerOptions } from '../interfaces';

export class Logger {

    private log: boolean;
    private spinner: Ora;

    constructor(options: MongoCleanerOptions) {
        this.log = options.log;
    }

    public printDatabase(database: string): void {
        if (this.log) {
            console.log(database);
        }
    }

    public startDropDatabase(database: string): void {
        if (this.log) {
            this.spinner = ora({
                text: `Dropping ${database}`,
                spinner: 'dots2'
            }).start();
        }
    }
    public stopDropDatabase(succeded: boolean, fallback?: boolean): void {
        if (this.log) {
            if (succeded) {
                this.spinner.succeed();
            }
            else if (fallback) {
                this.spinner.warn();
            }
            else {
                this.spinner.fail();
            }
        }
    }

    public startDropCollection(collection: string): void {
        if (this.log) {
            this.spinner = ora({
                text: `Dropping ${collection}`,
                indent: 2,
                spinner: 'dots2'
            }).start();
        }
    }
    public stopDropCollection(succeded: boolean, fallback?: boolean): void {
        if (this.log) {
            if (succeded) {
                this.spinner.succeed();
            }
            else if (fallback) {
                this.spinner.warn();
            }
            else {
                this.spinner.fail();
            }
        }
    }

    public startEmptyCollection(collection: string): void {
        if (this.log) {
            this.spinner = ora({
                text: `Emptying ${collection}`,
                indent: 2,
                spinner: 'dots2'
            }).start();
        }
    }
    public stopEmptyCollection(succeded: boolean): void {
        if (this.log) {
            if (succeded) {
                this.spinner.succeed();
            }
            else {
                this.spinner.fail();
            }
        }
    }


}