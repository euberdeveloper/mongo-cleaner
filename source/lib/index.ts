import { MongoClient, MongoClientOptions } from 'mongodb';

/**
 * The options of the mongodb connection. The module uses the npm module mongodb under
 * the hood, so these are the same as the MongoClientOptions.
 */
export type MongoCleanOptions = MongoClientOptions;

const DEFAULT_URI = 'mongodb://localhost:27017';
const DEFAULT_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

/**
 * Removes all the databases from mongodb, except for the admin database.
 * @param uri The uri of the mongodb connection. Default: mongodb://localhost:27017
 * @param options The options for the connection. This function uses the npm module mongodb under
 * the hood, so these are the MongoClientOptions. By default, if not explicitly set to false, 
 * "useUnifiedTopology" and "useNewUrlParser" are set to true.
 */
export async function clean(uri?: string, options?: MongoCleanOptions): Promise<void> {
    // Parse parameters
    uri = uri || DEFAULT_URI;
    options = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS;
    // Open collection
    const connection = await MongoClient.connect(uri, options);
    // Get databases except for admin
    const databases = (await connection.db().admin().listDatabases())
        .databases.map(database => database.name).filter(database => database !== 'admin');
    // Delete each database
    for (const database of databases) {
        await connection.db(database).dropDatabase();
    }
    // Close connection
    await connection.close();
}

clean();