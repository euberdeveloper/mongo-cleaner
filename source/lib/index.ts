import { MongoCleanerConnectionOptions, MongoCleanerInternalOptions } from './interfaces/index.js';
import { Cleaner } from './utils/cleaner.js';
import { askConfirm } from './utils/askConfirm.js';
import { mergeUri, mergeConnectionOptions, mergeOptions } from './utils/options.js';

export * from './interfaces/exported.js';
export * from './errors/index.js';

/**
 * Tries to remove all the database of MongoDB.
 * @param uri The string uri of the mongodb connection. Default: mongodb://localhost:27017
 * @param connectionOptions The [[MongoCleanerConnectionOptions | options]] for the connection. This function uses the npm module mongodb under
 * the hood, so these are the MongoClientOptions. By default, if not explicitly set to false,
 * "useUnifiedTopology" and "useNewUrlParser" are set to true.
 * @param options The [[MongoCleanerInternalOptions | options]] for the cleaner. You can specify things such as
 * asking a confirm before cleaning, databases to be kept, keeping collections and removing their documents.
 */
export async function clean(
    uri?: string,
    connectionOptions?: MongoCleanerConnectionOptions,
    options?: MongoCleanerInternalOptions
): Promise<void> {
    uri = mergeUri(uri);
    connectionOptions = mergeConnectionOptions(connectionOptions);
    options = mergeOptions(options);

    if (await askConfirm(!options.noConfirm)) {
        const cleaner = new Cleaner(uri, connectionOptions, options);
        await cleaner.clean();
    }
}
