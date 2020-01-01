module.exports = (expect, mongodb, execSync, mongoclean) => {

    describe('Test: clean function', function () {

        this.slow(1000);
        this.timeout(0);
        this.beforeEach(() => {
            execSync('npm run db:populate -- --quiet', { silent: true });
        });

        it(`Should remove all databases except for admin`, async function () {

            await mongoclean.clean();

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            await connection.close();

            expect(databases).to.be.an('array').that.does.include('admin');
            expect(databases.length).to.equal(1);
        });

        it(`Should remove all collections except for system`, async function () {

            await mongoclean.clean(null, null, {
                dropDatabases: false,
                emptyDatabases: true
            });

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            let collections = [];
            for (const database of databases) {
                collections = [...collections, ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))];
            }
            await connection.close();

            expect(collections).to.be.empty;
        });

        it(`Should remove only documents of collections`, async function () {

            await mongoclean.clean(null, null, {
                dropDatabases: false,
                emptyDatabases: false,
                emptyCollections: true
            });

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            let collections = [];
            for (const database of databases) {
                collections = [...collections, ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))];
            }
            await connection.close();

            expect(collections).to.not.be.empty;
        });

        it(`Should keep computers database`, async function () {

            await mongoclean.clean(null, null, {
                keep: 'computers'
            });

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            await connection.close();

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
        });

        it(`Should keep computers and animals databases`, async function () {

            await mongoclean.clean(null, null, {
                keep: ['computers', 'animals']
            });

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            await connection.close();

            expect(databases).to.be.an('array').that.does.not.include('cars');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('animals');

        });

        it(`Should keep computers and cars databases`, async function () {

            await mongoclean.clean(null, null, {
                keep: /c/
            });

            const { MongoClient } = mongodb;
            const connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            await connection.close();

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('cars');

        });

    });

};