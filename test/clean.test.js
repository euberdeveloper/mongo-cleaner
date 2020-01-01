module.exports = (expect, mongodb, execSync, mongoclean) => {

    describe('Test: clean function', function () {

        this.slow(500);
        this.timeout(0);
        this.beforeEach(() => {
            execSync('npm run db:populate');
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

    });

};