export interface UriOptions {
    uri?: string;
    host?: string;
    port?: number;
    db?: string;
    username?: string;
    password?: string;
    srv?: boolean;
}

export function getUri(options: UriOptions): string {
    const {
        srv,
        uri,
        host,
        port,
        db,
        username,
        password
    } = options;
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

export function parseKeep(values: string[]): (string | RegExp)[] {
    return values.map((value: string) => {
        const penultimo = value.length - 2;
        const ultimo = value.length - 1;
        if (value[0] === '/' && (value[ultimo] === '/' || (value[penultimo] === '/' && 'gimsuy'.includes(value[ultimo])))) {
            const pieces = value.split('/').splice(1);
            try {
                return pieces.length === 1 ? new RegExp(pieces[0]) : new RegExp(pieces[0], pieces[1]);
            }
            catch (error) {
                return value;
            }
        }
        else {
            return value;
        }
    });
}