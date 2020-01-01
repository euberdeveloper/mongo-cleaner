import { MongoCleanerConnectionOptions, MongoCleanerOptions } from '../interfaces';

const DEFAULT_URI = 'mongodb://localhost:27017';
const DEFAULT_CONNECTION_OPTIONS: MongoCleanerConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
const DEFAULT_OPTIONS: MongoCleanerOptions = {
    noConfirm: true,
    keep: [],
    log: true,
    dropDatabases: true,
    emptyCollections: false,
    emptyDatabases: false,
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

    if (typeof merged.keep === 'string') {
        merged.keep = [merged.keep];
    }
    if (!(merged.dropDatabases || merged.emptyDatabases || merged.emptyCollections)) {
        merged.emptyCollections = true;
    }

    return merged;
}