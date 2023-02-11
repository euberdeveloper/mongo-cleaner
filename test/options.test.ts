import {
    mergeOptions,
    mergeConnectionOptions,
    DEFAULT_OPTIONS,
    DEFAULT_CONNECTION_OPTIONS
} from '@lib/utils/options.js';

describe('Test: options', function () {
    /* mergeConnectionOptions */

    it(`Should merge connection options for undefined`, function () {
        const options = undefined;
        const result = mergeConnectionOptions(options);
        const expected = DEFAULT_CONNECTION_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge connection options for null`, function () {
        const options = null as any;
        const result = mergeConnectionOptions(options);
        const expected = DEFAULT_CONNECTION_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge connection options for {}`, function () {
        const options = {};
        const result = mergeConnectionOptions(options);
        const expected = DEFAULT_CONNECTION_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge connection options with port set to 23023`, function () {
        const options = { port: 23_023 };
        const result = mergeConnectionOptions(options);
        const expected = { ...DEFAULT_CONNECTION_OPTIONS, ...options };

        expect(result).toEqual(expected);
    });

    /* mergeOptions */

    it(`Should merge options for undefined`, function () {
        const options = undefined;
        const result = mergeOptions(options);
        const expected = DEFAULT_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge options for null`, function () {
        const options = null as any;
        const result = mergeOptions(options);
        const expected = DEFAULT_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge options for {}`, function () {
        const options = {};
        const result = mergeOptions(options);
        const expected = DEFAULT_OPTIONS;

        expect(result).toEqual(expected);
    });

    it(`Should merge options with noConfirm and log`, function () {
        const options = {
            noConfirm: false,
            log: true
        };
        const result = mergeOptions(options);

        expect(result.noConfirm).toEqual(false);
        expect(result.log).toEqual(true);
    });

    it(`Should merge options with numberOfRetries and retryMilliseconds`, function () {
        const options = {
            numberOfRetries: 23,
            retryMilliseconds: 5
        };
        const result = mergeOptions(options);

        expect(result.numberOfRetries).toEqual(23);
        expect(result.retryMilliseconds).toEqual(5);
    });

    it(`Should merge options with throwIfNotTotal`, function () {
        const options = {
            throwIfNotTotal: true
        };
        const result = mergeOptions(options);

        expect(result.throwIfNotTotal).toEqual(true);
    });

    it(`Should merge options with keep as string`, function () {
        const options = {
            keep: 'db'
        };
        const result = mergeOptions(options);

        expect(result.keep).toEqual(['db']);
    });

    it(`Should merge options with keep as array`, function () {
        const options = {
            keep: ['db', 'zarro']
        };
        const result = mergeOptions(options);

        expect(result.keep).toEqual(['db', 'zarro']);
    });

    it(`Should merge options with emptyCollections set to true even if everything was false`, function () {
        const options = {
            dropDatabases: false,
            emptyDatabases: false,
            emptyCollections: false
        };
        const result = mergeOptions(options);

        expect(result.dropDatabases).toEqual(false);
        expect(result.emptyDatabases).toEqual(false);
        expect(result.emptyCollections).toEqual(true);
    });

    it(`Should merge options and work even if numberOfRetries and retryMilliseconds were invalid`, function () {
        const options = {
            numberOfRetries: 'invalid' as any,
            retryMilliseconds: 'not valid' as any
        };
        const result = mergeOptions(options);

        expect(result.numberOfRetries).toEqual(DEFAULT_OPTIONS.numberOfRetries);
        expect(result.retryMilliseconds).toEqual(DEFAULT_OPTIONS.retryMilliseconds);
    });
});
