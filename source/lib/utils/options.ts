import { MongoCleanerConnectionOptions, MongoCleanerOptions } from '../interfaces';

/**
 * The default mongo uri for the [[clean]] function.
 */
const DEFAULT_URI = 'mongodb://localhost:27017';
/**
 * The default connection options for the [[clean]] function.
 */
const DEFAULT_CONNECTION_OPTIONS: MongoCleanerConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
/**
 * The default cleaner options for the [[clean]] function
 */
const DEFAULT_OPTIONS: MongoCleanerOptions = {
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
 * Fallbakcs the given uri with the [[DEFAULT_URI | default uri]].
 * @param uri The uri to fallback.
 * @returns The fallbacked uri.
 */
export function mergeUri(uri: string): string {
    return uri || DEFAULT_URI;
}
/**
 * Fallbakcs the given connection options with the [[DEFAULT_CONNECTION_OPTIONS | default connection options]].
 * @param options The connection options to fallback.
 * @returns The fallbacked connection options.
 */
export function mergeConnectionOptions(options: MongoCleanerConnectionOptions): MongoCleanerConnectionOptions {
    return options ? { ...DEFAULT_CONNECTION_OPTIONS, ...options } : DEFAULT_CONNECTION_OPTIONS;
}
/**
 * Fallbakcs the given cleaner options with the [[DEFAULT_OPTIONS | default cleaner options]].
 * @param options The cleaner options to fallback.
 * @returns The fallbacked cleaner options.
 */
export function mergeOptions(options: MongoCleanerOptions): MongoCleanerOptions {
    const merged: MongoCleanerOptions = {};
    options = options || {};
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
        merged.numberOfRetries = 1;
    }
    if (typeof merged.retryMilliseconds !== 'number') {
        merged.retryMilliseconds = 5;
    }

    return merged;
}
