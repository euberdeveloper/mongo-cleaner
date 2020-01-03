import { MongoClientOptions } from 'mongodb';

/**
 * The options of the mongodb connection. The module uses the npm module mongodb under
 * the hood, so these are the same as the MongoClientOptions.
 */
export type MongoCleanerConnectionOptions = MongoClientOptions;

/**
 * The options of the mongo-cleaner [[clean]] function.
 */
export interface MongoCleanerOptions {
    /**
     * If you want the method to skip asking confirm before cleaning the MongoDB.
     * 
     * Default: true
     */
    noConfirm?: boolean;
    /**
     * A string, a RegExp or an array of both specifying databases that will not be cleaned.
     * 
     * Default: []
     */
    keep?: string | RegExp | (string | RegExp)[];
    /**
     * If you want to display the clean method's log on console.
     * 
     * Default: false
     */
    log?: boolean;
    /**
     * If you want to drop the whole database. 
     * 
     * NB: The admin database cannot be dropped and is ignored.
     * 
     * Default: true
     */
    dropDatabases?: boolean;
    /**
     * If you want to drop databases' collections without dropping the databases. If both "dropDatabases"
     * and this options are true, this option will be used as a fallback if a database drop fails.
     * 
     * Default: false
     */
    emptyDatabases?: boolean;
    /**
     * If you want to empty collections without dropping them and their databases. If both "emptyDatabases"
     * and this options are true, this option will be used as a fallback if a collection drop fails.
     * 
     * NB: If "dropDatabases", "emptyDatabases" and "emptyCollections" are all false, this option will eventually
     * become true.
     * 
     * Default: false
     */
    emptyCollections?: boolean;
    /**
     * The number of times a drop or empty operation is retried before throwing an error or passing to a fallback.
     * 
     * Default: 1
     */
    numberOfRetries?: number;
    /**
     * The number of milliseconds between two attempts of a drop or empty operation.
     * 
     * Default: 20
     */
    retryMilliseconds?: number;
    /**
     * If you want to throw a [MongoCleanerCleanError] when MongoDB is only partially cleaned.
     * 
     * Default: false
     */
    throwIfNotTotal?: boolean;
}