import * as mongoCleaner from '@lib/index.js';

import { execSync } from 'child_process';
import { MongoClient } from 'mongodb';

describe('Test: clean function', function () {
    let connection: MongoClient;

    jest.setTimeout(10 * 60 * 1000);

    beforeEach(async () => {
        execSync('npm run db:populate -- --quiet');

        connection = await MongoClient.connect('mongodb://localhost:27017');
    });
    afterEach(async () => {
        await connection.close();
    });

    it(`Should remove all databases except for admin`, async function () {
        await mongoCleaner.clean();

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('admin');
        expect(databases.length).toEqual(1);
    });

    it(`Should remove all collections except for system`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            dropDatabases: false,
            emptyDatabases: true
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);
        let collections: string[] = [];
        for (const database of databases) {
            collections = [
                ...collections,
                ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))
            ];
        }

        expect(collections.length).toEqual(0);
    });

    it(`Should remove only documents of collections`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            dropDatabases: false,
            emptyDatabases: false,
            emptyCollections: true
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);
        let collections: string[] = [];
        for (const database of databases) {
            collections = [
                ...collections,
                ...(await connection.db(database).listCollections().toArray())
                    .map(collection => collection.name)
                    .filter(collection => !/^system./.test(collection))
            ];
        }

        expect(collections.length).toBeGreaterThan(0);
    });

    it(`Should keep computers database`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            keep: 'computers'
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).not.toContainEqual('animals');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('computers');
    });

    it(`Should keep computers and animals databases`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            keep: ['computers', 'animals']
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).not.toContainEqual('cars');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('computers');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('animals');
    });

    it(`Should keep computers and cars databases`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            keep: /c/
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).not.toContainEqual('animals');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('computers');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('cars');
    });

    it(`Should keep computers and cars databases`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            keep: /c/
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).not.toContainEqual('animals');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('computers');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('cars');
    });

    it(`Should keep databases beginning with 'c'`, async function () {
        await mongoCleaner.clean(undefined, undefined, {
            keep: database => database.startsWith('c')
        });

        const databases = (await connection.db().admin().listDatabases()).databases.map(database => database.name);

        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).not.toContainEqual('animals');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('computers');
        expect(Array.isArray(databases)).toBeTruthy();
        expect(databases).toContainEqual('cars');
    });
});
