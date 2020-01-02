[![Build Status](https://travis-ci.org/euberdeveloper/mongo-cleaner.svg?branch=master)](https://travis-ci.org/euberdeveloper/mongo-cleaner)
[![CircleCI](https://circleci.com/gh/euberdeveloper/mongo-cleaner.svg?style=svg)](https://circleci.com/gh/euberdeveloper/mongo-cleaner)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/mongo-cleaner/badge.svg?branch=master)](https://coveralls.io/github/euberdeveloper/mongo-cleaner?branch=master)
[![Codecov Status](https://codecov.io/gh/euberdeveloper/mongo-cleaner/branch/master/graph/badge.svg)](https://codecov.io/gh/euberdeveloper/mongo-cleaner)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/mongo-cleaner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/mongo-cleaner?targetFile=package.json)
[![dependencies Status](https://david-dm.org/euberdeveloper/mongo-cleaner/status.svg)](https://david-dm.org/euberdeveloper/mongo-cleaner)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/issues)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/stargazers)
![npm](https://img.shields.io/npm/v/mongo-cleaner.svg)

# mongo-cleaner
An npm module to quickly clean your mongodb, both from code and cli.

## Install

To install mongo-cleaner as a local module:

```bash
$ npm install mongo-cleaner
```

To install mongo-cleaner as a global module:

```bash
$ npm install -g mongo-cleaner
```

## Usage (local module)

### Clear everything

```js
const mongoCleaner = require('mongoCleaner');
await mongoCleaner.clean();
```

### Specify connection

```js
const mongoCleaner = require('mongoCleaner');
const uri = 'mongodb://localhost:27017';
const mongoClientOptions = { numberOfRetries: 10 };

await mongoCleaner.clean(uri, mongoClientOptions);
```

### Ask a confirm and show logs

```js
const mongoCleaner = require('mongoCleaner');
const options = {
    noConfirm: false,
    log: true
};

await mongoCleaner.clean(null, null, options);
```

### Keep some databases

```js
const mongoCleaner = require('mongoCleaner');
const options = {
    keep: ['animals', /test$/]
};

await mongoCleaner.clean(null, null, options);
```

### Only remove collections' documents

```js
const mongoCleaner = require('mongoCleaner');
const options = {
    dropDatabases: false,
    emptyDatabases: false,
    emptyCollections: true
};

await mongoCleaner.clean(null, null, options);
```

### Only drop collections or remove their documents as a fallback

```js
const mongoCleaner = require('mongoCleaner');
const options = {
    dropDatabases: true,
    emptyDatabases: true,
    emptyCollections: true
};

await mongoCleaner.clean(null, null, options);
```

### Throw an error if only partially cleaned

```js
const mongoCleaner = require('mongoCleaner');
const options = {
    throwIfNotTotal: true
};

await mongoCleaner.clean(null, null, options);
```

## Usage (global module)

### Clear everything

```bash
$ npm mongo-cleaner clean
```

This way everything on `mongodb://localhost:27017` will be cleaned

### Skip confirmation

```bash
$ npm mongo-cleaner clean -y
```

This way no proceeding-confirmation will be asked.

### Keep databases

```bash
$ npm mongo-cleaner clean --keep first second /test$/i
```

This way first, second and all databases that end with "test" (case-insensitive) will be keeped.

### Specify uri

```bash
$ npm mongo-cleaner clean --uri mongodb://localhost:8080
```

This way everything on `mongodb://localhost:8080` will be cleaned.

### Specify uri with other options

```bash
$ npm mongo-cleaner clean --host localhost --port 27017 --username euber --password secret --srv
```

This way everything on `srv+mongodb://euber:pass@localhost:27017` will be cleaned.

### Specify options file

```bash
$ npm mongo-cleaner clean -o mongo-cleaner.config.json -y
```

This way options will be taken by the file `./mongo-cleaner.config.json`. These options do not overwrite
the command ones, so in every case of this example no confirmation to proceed will be asked.

### See all options

```bash
$ npm mongo-cleaner --help
```

## API

### clean

**Syntax:**

`mongoCleaner.clean(uri, connectionOptions, options)`

**Description:**

Tries to remove all the database of MongoDB. 
The function is __asynchronous__ and returns nothing.
See __Usage__ to have an example.

**Parameters:**

* __uri__: Optional. The `string` uri of the mongodb connection. Default: `mongodb://localhost:27017`.
* __connectionOptions__: Optional. The options for the MongoDB connection. This function uses the npm module mongodb under the hood, so these are the `MongoClientOptions`. By default, if not explicitly set to false, "useUnifiedTopology" and "useNewUrlParser" are set to true.
* __options__: Optional. The `MongoCleanerOptions` object for the cleaner. You can specify things such as asking a confirm before cleaning, databases to be kept, keeping collections and removing their documents.

**MongoCleanerOptions parameters:**

* __noConfirm__: Default value: `true`. If you want the method to skip asking confirm before cleaning the MongoDB.
* __keep__: Default value: `[]`. A `string`, a `RegExp` or an `array of both` specifying databases that will not be cleaned.
* __log__: Default value: `false`. If you want to display the clean method's log on console. 
* __dropDatabases__: Default value: `true`. If you want to drop the whole database. NB: The admin database cannot be dropped and is ignored.
* __emptyDatabases__: Default value: `false`. If you want to drop databases' collections without dropping the databases. If both "dropDatabases" and this options are true, this option will be used as a fallback if a database drop fails.
* __emptyCollections__: Default value: `false`. If you want to empty collections without dropping them and their databases. If both "emptyDatabases" and this options are true, this option will be used as a fallback if a collection drop fails. NB: If "dropDatabases", "emptyDatabases" and "emptyCollections" are all false, this option will eventually become true.
* __throwIfNotTotal__: Default value: `false`. If you want to throw a `MongoCleanerCleanError` when MongoDB is only partially cleaned.

## Project structure

Made with **[dree](https://www.npmjs.com/package/dree)**.

```
mongo-cleaner
 ├─> dist
 ├─> source
 │   ├─> bin
 │   │   ├── index.ts
 │   │   └─> utils
 │   │       └── index.ts
 │   └─> lib
 │       ├─> errors
 │       │   ├── index.ts
 │       │   ├── mongoCleanerCleanError.ts
 │       │   ├── mongoCleanerConnectionError.ts
 │       │   ├── mongoCleanerDisconnectionError.ts
 │       │   ├── mongoCleanerError.ts
 │       │   ├── mongoCleanerListCollectionsError.ts
 │       │   └── mongoCleanerListDatabasesError.ts
 │       ├── index.ts
 │       ├─> interfaces
 │       │   └── index.ts
 │       └─> utils
 │           ├── askConfirm.ts
 │           ├── cleaner.ts
 │           ├── logger.ts
 │           └── options.ts
 ├─> test
 │   ├── clean.test.js
 │   ├─> mock
 │   └── test.js
 ├─> docs
 │   ├─> html
 │   └─> tree
 │       ├── dree.config.json
 │       └── tree.txt
 ├── LICENSE
 ├── .npmignore
 ├── package-lock.json
 ├── package.json
 ├── tsconfig.json
 └── tslint.json
```

## Build

To build the module make sure you have Typescript installed or install the dev dependencies. After this, run:

```bash
$ npm run transpile
```

The `source` folder will be compiled in the `dist` folder.

## Dev

Make sure you have the dev dependencies installed.

To lint the code go to the package root in your CLI and run

```bash
$ npm run lint
```

To run tests go to the package root in your CLI and run

```bash
$ npm test
```

**Note: Running tests will delete permanently your MongoDB data. Do not do it if you have important data on it.**