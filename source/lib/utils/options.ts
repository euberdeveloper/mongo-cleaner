import { MongoCleanerConnectionOptions, MongoCleanerOptions } from '../interfaces';

const DEFAULT_URI = 'mongodb://localhost:27017';
const DEFAULT_CONNECTION_OPTIONS: MongoCleanerConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
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

export function mergeUri(uri: string): string {
    return uri || DEFAULT_URI;
}
export function mergeConnectionOptions(options: MongoCleanerConnectionOptions): MongoCleanerConnectionOptions {
    return options ? { ...DEFAULT_CONNECTION_OPTIONS, ...options } : DEFAULT_CONNECTION_OPTIONS;
}
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
