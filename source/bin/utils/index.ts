/**
 * The uri options for a MongoDB connection.
 */
export interface UriOptions {
    /**
     * The uri of the MongoDB connection.
     */
    uri?: string;
    /**
     * The host of the MongoDB connection..
     */
    host?: string;
    /**
     * The port of the MongoDB connection.
     */
    port?: number;
    /**
     * The db of the MongoDB connection.
     */
    db?: string;
    /**
     * The username of the MongoDB connection.
     */
    username?: string;
    /**
     * The password of the MongoDB connection.
     */
    password?: string;
    /**
     * The srv of the MongoDB connection.
     */
    srv?: boolean;
}

/**
 * Given the [[UriOptions | uri options]], returns the uri string.
 * @param options The uri options.
 * @returns The connection uri.
 */
export function getUri(options: UriOptions): string {
    const { srv, uri, host, port, db, username, password } = options;
    let result = uri;

    if (!result) {
        const protocol = srv ? 'srv+mongodb://' : 'mongodb://';
        const hostname = `${host}:${port}`;
        const access = username ? (password ? `${username}:${password}@` : `${username}@`) : '';
        const database = db ? '/db' : '';
        result = `${protocol}${access}${hostname}${database}`;
    }

    return result;
}

/**
 * Given an array of strings of databases to keep, maps the strings that are to be RegExp to RegExps and returns the new array.
 * @param values The array of strings of databases to keep.
 * @returns An array of strings and RegExps. The RegExps are the passed strings that represented a RegExp.
 */
export function parseKeep(values: string[]): (string | RegExp)[] {
    return values.map((value: string) => {
        const penultimo = value.length - 2;
        const ultimo = value.length - 1;
        if (
            value.startsWith('/') &&
            (value[ultimo] === '/' || (value[penultimo] === '/' && 'gimsuy'.includes(value[ultimo])))
        ) {
            const pieces = value.split('/').splice(1);
            try {
                return pieces.length === 1 ? new RegExp(pieces[0]) : new RegExp(pieces[0], pieces[1]);
            } catch (error) {
                return value;
            }
        } else {
            return value;
        }
    });
}
