import { MongoCleanerConnectionOptions, MongoCleanerInternalOptions, MongoCleanerOptions } from '../interfaces';

/**
 * The default mongo uri for the [[clean]] function.
 */
const DEFAULT_URI = 'mongodb://localhost:27017';
/**
 * The default connection options for the [[clean]] function.
 */
const DEFAULT_CONNECTION_OPTIONS: MongoCleanerConnectionOptions = {};
/**
 * The default cleaner options for the [[clean]] function
 */
const DEFAULT_OPTIONS: MongoCleanerInternalOptions = {
    noConfirm: true,
    keep: [],
    log: false,
    dropDatabases: true,
    emptyCollections: false,
    emptyDatabases: false,
    numberOfRetries: 1,
    retryMilliseconds: 20,
    throwIfNotTotal: false
};

/**
 * Fallbacks the given uri with the default uri.
 * @param uri The uri to fallback.
 * @returns The fallbacked uri.
 */
export function mergeUri(uri?: string): string {
    return uri ?? DEFAULT_URI;
}
/**
 * Fallbacks the given connection options with the default connection options.
 * @param options The connection options to fallback.
 * @returns The fallbacked connection options.
 */
export function mergeConnectionOptions(options?: MongoCleanerConnectionOptions): MongoCleanerConnectionOptions {
    return options ? { ...DEFAULT_CONNECTION_OPTIONS, ...options } : DEFAULT_CONNECTION_OPTIONS;
}

/**
 * Fallbacks the given cleaner options with the default cleaner options.
 * @param options The cleaner options to fallback.
 * @returns The fallbacked cleaner options.
 */
export function mergeOptions(options?: MongoCleanerOptions): MongoCleanerInternalOptions {
    const merged: MongoCleanerInternalOptions = {} as MongoCleanerInternalOptions;
    options = options ?? {};
    for (const key in DEFAULT_OPTIONS) {
        merged[key] = options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key];
    }

    if (!Array.isArray(merged.keep)) {
        merged.keep = [merged.keep];
    }
    if (!(merged.dropDatabases || merged.emptyDatabases || merged.emptyCollections)) {
        merged.emptyCollections = true;
    }
    if (typeof merged.numberOfRetries !== 'number') {
        merged.numberOfRetries = DEFAULT_OPTIONS.numberOfRetries;
    }
    if (typeof merged.retryMilliseconds !== 'number') {
        merged.retryMilliseconds = DEFAULT_OPTIONS.retryMilliseconds;
    }

    return merged;
}
