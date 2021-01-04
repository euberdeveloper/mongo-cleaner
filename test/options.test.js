const rewire = require('rewire');
const { mergeOptions } = require('../dist/lib/utils/options');

const DEFAULT_OPTIONS = rewire('../dist/lib/utils/options').__get__('DEFAULT_OPTIONS');

module.exports = (expect) => {

    describe('Test: options', function () {

        it(`Should merge options for null`, function () {
            const options = null;
            const result = mergeOptions(options);
            const expected = DEFAULT_OPTIONS;

            expect(result).to.deep.equal(expected);
        });

        it(`Should merge options for {}`, function () {
            const options = {};
            const result = mergeOptions(options);
            const expected = DEFAULT_OPTIONS;

            expect(result).to.deep.equal(expected);
        });

        it(`Should merge options with noConfirm and log`, function () {
            const options = { 
                noConfirm: false,
                log: true
            };
            const result = mergeOptions(options);

            expect(result.noConfirm).to.equal(false);
            expect(result.log).to.equal(true);
        });

        it(`Should merge options with numberOfRetries and retryMilliseconds`, function () {
            const options = { 
                numberOfRetries: 23,
                retryMilliseconds: 5
            };
            const result = mergeOptions(options);

            expect(result.numberOfRetries).to.equal(23);
            expect(result.retryMilliseconds).to.equal(5);
        });

        it(`Should merge options with throwIfNotTotal`, function () {
            const options = { 
                throwIfNotTotal: true
            };
            const result = mergeOptions(options);

            expect(result.throwIfNotTotal).to.equal(true);
        });

        it(`Should merge options with keep as string`, function () {
            const options = { 
                keep: 'db'
            };
            const result = mergeOptions(options);

            expect(result.keep).to.deep.equal(['db']);
        });

        it(`Should merge options with keep as array`, function () {
            const options = { 
                keep: ['db', 'zarro']
            };
            const result = mergeOptions(options);

            expect(result.keep).to.deep.equal(['db', 'zarro']);
        });

        it(`Should merge options with emptyCollections set to true even if everything was false`, function () {
            const options = { 
                dropDatabases: false,
                emptyDatabases: false,
                emptyCollections: false
            };
            const result = mergeOptions(options);

            expect(result.dropDatabases).to.equal(false);
            expect(result.emptyDatabases).to.equal(false);
            expect(result.emptyCollections).to.equal(true);
        });

        it(`Should merge options and work even if numberOfRetries and retryMilliseconds were invalid`, function () {
            const options = { 
                numberOfRetries: 'invalid',
                retryMilliseconds: 'not valid'
            };
            const result = mergeOptions(options);

            expect(result.numberOfRetries).to.equal(DEFAULT_OPTIONS.numberOfRetries);
            expect(result.retryMilliseconds).to.equal(DEFAULT_OPTIONS.retryMilliseconds);
        });
    });

};