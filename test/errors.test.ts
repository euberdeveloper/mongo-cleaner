import {
    MongoCleanerError,
    MongoCleanerListCollectionsError,
    MongoCleanerListDatabasesError,
    MongoCleanerDisconnectionError,
    MongoCleanerConnectionError,
    MongoCleanerCleanError
} from '@lib/errors/index.js';

describe('Test: errors', function () {
    it(`Should properly create a default MongoCleanerError`, function () {
        const error = new MongoCleanerError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerError);
        expect(error.name).toEqual('MongoCleanerError');
    });
    it(`Should properly create a custom MongoCleanerError`, function () {
        const triggerError = new Error();
        const error = new MongoCleanerError('MESSAGE', triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerError);
        expect(error.name).toEqual('MongoCleanerError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.triggerError).toEqual(triggerError);
    });

    it(`Should properly create a default MongoCleanerListCollectionsError`, function () {
        const error = new MongoCleanerListCollectionsError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerListCollectionsError);
        expect(error.name).toEqual('MongoCleanerListCollectionsError');
    });
    it(`Should properly create a custom MongoCleanerListCollectionsError`, function () {
        const triggerError = new Error();
        const error = new MongoCleanerListCollectionsError('MESSAGE', 'database', triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerListCollectionsError);
        expect(error.name).toEqual('MongoCleanerListCollectionsError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.database).toEqual('database');
        expect(error.triggerError).toEqual(triggerError);
    });

    it(`Should properly create a default MongoCleanerListDatabasesError`, function () {
        const error = new MongoCleanerListDatabasesError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerListDatabasesError);
        expect(error.name).toEqual('MongoCleanerListDatabasesError');
    });
    it(`Should properly create a custom MongoCleanerListDatabasesError`, function () {
        const triggerError = new Error();
        const error = new MongoCleanerListDatabasesError('MESSAGE', triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerListDatabasesError);
        expect(error.name).toEqual('MongoCleanerListDatabasesError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.triggerError).toEqual(triggerError);
    });

    it(`Should properly create a default MongoCleanerDisconnectionError`, function () {
        const error = new MongoCleanerDisconnectionError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerDisconnectionError);
        expect(error.name).toEqual('MongoCleanerDisconnectionError');
    });
    it(`Should properly create a custom MongoCleanerDisconnectionError`, function () {
        const triggerError = new Error();
        const error = new MongoCleanerDisconnectionError('MESSAGE', 'uri', triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerDisconnectionError);
        expect(error.name).toEqual('MongoCleanerDisconnectionError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.uri).toEqual('uri');
        expect(error.triggerError).toEqual(triggerError);
    });

    it(`Should properly create a default MongoCleanerConnectionError`, function () {
        const error = new MongoCleanerConnectionError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerConnectionError);
        expect(error.name).toEqual('MongoCleanerConnectionError');
    });
    it(`Should properly create a custom MongoCleanerConnectionError`, function () {
        const triggerError = new Error();
        const connectionOptions = {};
        const error = new MongoCleanerConnectionError('MESSAGE', 'uri', connectionOptions, triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerConnectionError);
        expect(error.name).toEqual('MongoCleanerConnectionError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.uri).toEqual('uri');
        expect(error.connectionOptions).toEqual(connectionOptions);
        expect(error.triggerError).toEqual(triggerError);
    });

    it(`Should properly create a default MongoCleanerCleanError`, function () {
        const error = new MongoCleanerCleanError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerCleanError);
        expect(error.name).toEqual('MongoCleanerCleanError');
    });
    it(`Should properly create a custom MongoCleanerCleanError`, function () {
        const triggerError = new Error();
        const error = new MongoCleanerCleanError('MESSAGE', 'database', 'collection', triggerError);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MongoCleanerCleanError);
        expect(error.name).toEqual('MongoCleanerCleanError');
        expect(error.message).toEqual('MESSAGE');
        expect(error.database).toEqual('database');
        expect(error.collection).toEqual('collection');
        expect(error.triggerError).toEqual(triggerError);
    });
});
