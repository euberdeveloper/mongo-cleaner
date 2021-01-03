module.exports = (expect, mongodb, execSync, mongoCleaner) => {

    describe('Test: clean function', function () {
        let connection;

        this.slow(1000);
        this.timeout(0);
        this.beforeEach(async () => {
            execSync('npm run db:populate -- --quiet', { silent: true });

            const { MongoClient } = mongodb;
            connection = await MongoClient.connect('mongodb://localhost:27017', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        });
        this.afterEach(async () => {
            await connection.close();
        });

        it(`Should remove all databases except for admin`, async function () {

            await mongoCleaner.clean();
            
            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.include('admin');
            expect(databases.length).to.equal(1);
        });

        it(`Should remove all collections except for system`, async function () {

            await mongoCleaner.clean(null, null, {
                dropDatabases: false,
                emptyDatabases: true
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            let collections = [];
            for (const database of databases) {
                collections = [...collections, ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))];
            }

            expect(collections).to.be.empty;
        });

        it(`Should remove only documents of collections`, async function () {

            await mongoCleaner.clean(null, null, {
                dropDatabases: false,
                emptyDatabases: false,
                emptyCollections: true
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);
            let collections = [];
            for (const database of databases) {
                collections = [...collections, ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))];
            }

            expect(collections).to.not.be.empty;
        });

        it(`Should keep computers database`, async function () {

            await mongoCleaner.clean(null, null, {
                keep: 'computers'
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
        });

        it(`Should keep computers and animals databases`, async function () {

            await mongoCleaner.clean(null, null, {
                keep: ['computers', 'animals']
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.not.include('cars');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('animals');

        });

        it(`Should keep computers and cars databases`, async function () {

            await mongoCleaner.clean(null, null, {
                keep: /c/
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('cars');

        });

        it(`Should keep computers and cars databases`, async function () {

            await mongoCleaner.clean(null, null, {
                keep: /c/
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('cars');

        });

        it(`Should keep databases beginning with 'c'`, async function () {

            await mongoCleaner.clean(null, null, {
                keep: database => database[0] === 'c'
            });

            const databases = (await connection.db().admin().listDatabases())
                .databases.map(database => database.name);

            expect(databases).to.be.an('array').that.does.not.include('animals');
            expect(databases).to.be.an('array').that.does.include('computers');
            expect(databases).to.be.an('array').that.does.include('cars');

        });

    });

};