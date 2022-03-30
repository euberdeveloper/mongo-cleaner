![Build](https://github.com/euberdeveloper/mongo-cleaner/workflows/Build/badge.svg)
![Test](https://github.com/euberdeveloper/mongo-cleaner/workflows/Test/badge.svg)
![Lint](https://github.com/euberdeveloper/mongo-cleaner/workflows/Lint/badge.svg)
[![Build Status](https://travis-ci.org/euberdeveloper/mongo-cleaner.svg?branch=master)](https://travis-ci.org/euberdeveloper/mongo-cleaner)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/mongo-cleaner/badge.svg?branch=master)](https://coveralls.io/github/euberdeveloper/mongo-cleaner?branch=master)
[![Codecov Status](https://codecov.io/gh/euberdeveloper/mongo-cleaner/branch/master/graph/badge.svg)](https://codecov.io/gh/euberdeveloper/mongo-cleaner)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/mongo-cleaner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/mongo-cleaner?targetFile=package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/issues)
[![Types](https://img.shields.io/npm/types/mongo-cleaner.svg)](https://www.npmjs.com/package/mongo-cleaner)
[![License](https://img.shields.io/npm/l/mongo-cleaner.svg?color=blue)](https://github.com/euberdeveloper/mongo-cleaner/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/stargazers)
![npm](https://img.shields.io/npm/v/mongo-cleaner.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/5068a068ce9e29c3c061/maintainability)](https://codeclimate.com/github/euberdeveloper/mongo-cleaner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5068a068ce9e29c3c061/test_coverage)](https://codeclimate.com/github/euberdeveloper/mongo-cleaner/test_coverage)

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
$ mongo-cleaner clean
```

This way everything on `mongodb://localhost:27017` will be cleaned

### Skip confirmation

```bash
$ mongo-cleaner clean -y
```

This way no proceeding-confirmation will be asked.

### Keep databases

```bash
$ mongo-cleaner clean --keep first second /test$/i
```

This way first, second and all databases that end with "test" (case-insensitive) will be keeped.

### Specify uri

```bash
$ mongo-cleaner clean --uri mongodb://localhost:8080
```

This way everything on `mongodb://localhost:8080` will be cleaned.

### Specify uri with other options

```bash
$ mongo-cleaner clean --host localhost --port 27017 --username euber --password secret --srv
```

This way everything on `srv+mongodb://euber:pass@localhost:27017` will be cleaned.

### Specify options file

```bash
$ mongo-cleaner clean -o mongo-cleaner.config.json -y
```

This way options will be taken by the file `./mongo-cleaner.config.json`. These options do not overwrite
the command ones, so in every case of this example no confirmation to proceed will be asked.

### See all options

```bash
$ mongo-cleaner --help
```

## API

### clean

**Syntax:**

`mongoCleaner.clean(uri, connectionOptions, options)`

**Description:**

Tries to remove all the databases of MongoDB. 
The function is __asynchronous__ and returns nothing.
See __Usage__ to have an example.

**Parameters:**

* __uri__: Optional. The `string` uri of the mongodb connection. Default: `mongodb://localhost:27017`.
* __connectionOptions__: Optional. The options for the MongoDB connection. This function uses the npm module mongodb under the hood, so these are the `MongoClientOptions`. By default, if not explicitly set to false, "useUnifiedTopology" and "useNewUrlParser" are set to true.
* __options__: Optional. The `MongoCleanerOptions` object for the cleaner. You can specify things such as asking a confirm before cleaning, databases to be kept, keeping collections and removing their documents.

**MongoCleanerOptions parameters:**

* __noConfirm__: Default value: `true`. If you want the method to skip asking confirm before cleaning the MongoDB.
* __keep__: Default value: `[]`. A `string`, a `RegExp`, a `(db: name) => boolean` or an `array of all of them` specifying databases that will not be cleaned.
* __log__: Default value: `false`. If you want to display the clean method's log on console. 
* __dropDatabases__: Default value: `true`. If you want to drop the whole database. NB: The admin database cannot be dropped and is ignored.
* __emptyDatabases__: Default value: `false`. If you want to drop databases' collections without dropping the databases. If both "dropDatabases" and this options are true, this option will be used as a fallback if a database drop fails.
* __emptyCollections__: Default value: `false`. If you want to empty collections without dropping them and their databases. If both "emptyDatabases" and this options are true, this option will be used as a fallback if a collection drop fails. NB: If "dropDatabases", "emptyDatabases" and "emptyCollections" are all false, this option will eventually become true.
* __numberOfRetries__: Default value: `1`. The number of times a drop or empty operation is retried before throwing an error or passing to a fallback.
* __retryMilliseconds__: Default value: `20`. The number of milliseconds between two attempts of a drop or empty operation.
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

## Development

To build the module make sure you have the dev dependencies installed.

The project is written in `Typescript`, bundled with `Webpack` and linted with `ESLint`.

### Lint

In order to lint the code:

```bash
$ npm run lint
```

In order to lint and fix the code:

```bash
$ npm run lint:fix
```

There are also the `:source` and `:test` suffix after `lint` in order to lint only the source code or the test code.

### Transpile

To transpile the source code:

```bash
$ npm run transpile
```

The `source` folder will be transpiled in the `dist` folder. Also the `type declarations` will be generated.

### Test

**Note: Running tests will delete permanently your MongoDB data. Do not do it if you have important data on it.**

After having transpiled the code, run:

```bash
$ npm test
```

in order to run the tests with `mocha`.

If a coverage report is to be generated, run:

```bash
$ npm run nyc
```

### Bundle

```bash
$ npm run bundle
```

The `source` folder will be compiled in the `bundled` folder. It will contain the bundled `lib/index.js`, `lib/index.d.ts` and `bin/index.js` files.

