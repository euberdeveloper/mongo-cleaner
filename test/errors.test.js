module.exports = (expect, mongoCleaner) => {

    describe('Test: errors', function () {

        const {
            MongoCleanerError,
            MongoCleanerListCollectionsError, 
            MongoCleanerListDatabasesError, 
            MongoCleanerDisconnectionError, 
            MongoCleanerConnectionError, 
            MongoCleanerCleanError 
        } = mongoCleaner;

        it(`Should properly create a default MongoCleanerError`, function () {
            const error = new MongoCleanerError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerError);
            expect(error.name).to.equals('MongoCleanerError');
        });
        it(`Should properly create a custom MongoCleanerError`, function () {
            const triggerError = new Error();
            const error = new MongoCleanerError('MESSAGE', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerError);
            expect(error.name).to.equals('MongoCleanerError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default MongoCleanerListCollectionsError`, function () {
            const error = new MongoCleanerListCollectionsError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerListCollectionsError);
            expect(error.name).to.equals('MongoCleanerListCollectionsError');
        });
        it(`Should properly create a custom MongoCleanerListCollectionsError`, function () {
            const triggerError = new Error();
            const error = new MongoCleanerListCollectionsError('MESSAGE', 'database', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerListCollectionsError);
            expect(error.name).to.equals('MongoCleanerListCollectionsError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.database).to.equals('database');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default MongoCleanerListDatabasesError`, function () {
            const error = new MongoCleanerListDatabasesError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerListDatabasesError);
            expect(error.name).to.equals('MongoCleanerListDatabasesError');
        });
        it(`Should properly create a custom MongoCleanerListDatabasesError`, function () {
            const triggerError = new Error();
            const error = new MongoCleanerListDatabasesError('MESSAGE', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerListDatabasesError);
            expect(error.name).to.equals('MongoCleanerListDatabasesError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default MongoCleanerDisconnectionError`, function () {
            const error = new MongoCleanerDisconnectionError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerDisconnectionError);
            expect(error.name).to.equals('MongoCleanerDisconnectionError');
        });
        it(`Should properly create a custom MongoCleanerDisconnectionError`, function () {
            const triggerError = new Error();
            const error = new MongoCleanerDisconnectionError('MESSAGE', 'uri', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerDisconnectionError);
            expect(error.name).to.equals('MongoCleanerDisconnectionError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.uri).to.equals('uri');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default MongoCleanerConnectionError`, function () {
            const error = new MongoCleanerConnectionError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerConnectionError);
            expect(error.name).to.equals('MongoCleanerConnectionError');
        });
        it(`Should properly create a custom MongoCleanerConnectionError`, function () {
            const triggerError = new Error();
            const connectionOptions = {};
            const error = new MongoCleanerConnectionError('MESSAGE', 'uri', connectionOptions, triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerConnectionError);
            expect(error.name).to.equals('MongoCleanerConnectionError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.uri).to.equals('uri');
            expect(error.connectionOptions).to.equals(connectionOptions);
            expect(error.triggerError).to.equals(triggerError);
        });
        
        it(`Should properly create a default MongoCleanerCleanError`, function () {
            const error = new MongoCleanerCleanError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerCleanError);
            expect(error.name).to.equals('MongoCleanerCleanError');
        });
        it(`Should properly create a custom MongoCleanerCleanError`, function () {
            const triggerError = new Error();
            const error = new MongoCleanerCleanError('MESSAGE', 'database', 'collection', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoCleanerCleanError);
            expect(error.name).to.equals('MongoCleanerCleanError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.database).to.equals('database');
            expect(error.collection).to.equals('collection');
            expect(error.triggerError).to.equals(triggerError);
        });

    });

};