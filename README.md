![Build](https://github.com/euberdeveloper/mongo-cleaner/workflows/Build/badge.svg)
![Test](https://github.com/euberdeveloper/mongo-cleaner/workflows/Test/badge.svg)
![Lint](https://github.com/euberdeveloper/mongo-cleaner/workflows/Lint/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/mongo-cleaner/badge.svg?branch=master)](https://coveralls.io/github/euberdeveloper/mongo-cleaner?branch=master)
[![Codecov Status](https://codecov.io/gh/euberdeveloper/mongo-cleaner/branch/master/graph/badge.svg)](https://codecov.io/gh/euberdeveloper/mongo-cleaner)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/mongo-cleaner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/mongo-cleaner?targetFile=package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/mongo-cleaner.svg)](https://github.com/euberdeveloper/mongo-cleaner/issues)
[![Types](https://img.shields.io/npm/types/mongo-cleaner.svg)](https://www.npmjs.com/package/mongo-cleaner)
[![License](https://img.shields.io/npm/l/mongo-cleaner.svg?color=blue)](https://github.com/euberdeveloper/mongo-cleaner/blob/master/LICENSE)
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

[//]: # (dree - BEGIN)
Made with [dree](https://github.com/marketplace/actions/ga-dree)


```
mongo-cleaner
 ├── .eslintignore
 ├── .eslintrc.cjs
 ├─> .git
 │   ├── FETCH_HEAD
 │   ├── HEAD
 │   ├─> branches
 │   ├── config
 │   ├── description
 │   ├─> hooks
 │   │   ├── applypatch-msg.sample
 │   │   ├── commit-msg.sample
 │   │   ├── fsmonitor-watchman.sample
 │   │   ├── post-update.sample
 │   │   ├── pre-applypatch.sample
 │   │   ├── pre-commit.sample
 │   │   ├── pre-merge-commit.sample
 │   │   ├── pre-push.sample
 │   │   ├── pre-rebase.sample
 │   │   ├── pre-receive.sample
 │   │   ├── prepare-commit-msg.sample
 │   │   ├── push-to-checkout.sample
 │   │   └── update.sample
 │   ├── index
 │   ├─> info
 │   │   └── exclude
 │   ├─> logs
 │   │   ├── HEAD
 │   │   └─> refs
 │   │       ├─> heads
 │   │       │   └── main
 │   │       └─> remotes
 │   │           └─> origin
 │   │               └── main
 │   ├─> objects
 │   │   ├─> 05
 │   │   │   └── 9cc46d3d07605c13643edf1e6cfed527e667a3
 │   │   ├─> 0b
 │   │   │   └── 5d89bfd6b4dfe653f01379a61988ce0f4ddb12
 │   │   ├─> 0d
 │   │   │   ├── 335eddf6fbd714b2bf22334e4526a0ae8f1e1a
 │   │   │   └── 3a1da2c42da6727506970672b48326caad9271
 │   │   ├─> 11
 │   │   │   └── be53359311769d78d1d13d2d454f874b591353
 │   │   ├─> 1c
 │   │   │   └── 8f781fb5673d39e75bb0faff39630a29b9df7a
 │   │   ├─> 1d
 │   │   │   └── ba9ae4d10e071f990e1f1cbd034dcf83b84c4a
 │   │   ├─> 21
 │   │   │   └── 3fbf3b65a7925634c0cb115cd5632e90d21d02
 │   │   ├─> 28
 │   │   │   ├── 480df97aecbcdd8cce80d457949ac40a69985c
 │   │   │   └── b307cf203bdc6f72e9869fade771fa388118db
 │   │   ├─> 2a
 │   │   │   ├── 62e132ed3c9ff75777e29670113dd687e25321
 │   │   │   └── 96bc4a1f6bf1753e99a1ced903f2b0cc40d956
 │   │   ├─> 38
 │   │   │   └── b771979b2e74d20c7667dce65295917c1ffe63
 │   │   ├─> 39
 │   │   │   └── 7519b58d522d79847c340869361c2654e7d23f
 │   │   ├─> 3b
 │   │   │   └── 211c5cdd37eef30b71d3648b6c3ecae0a71e18
 │   │   ├─> 3d
 │   │   │   └── 7d9df85b0b7b920dd44986990ed8f80a9c1f70
 │   │   ├─> 43
 │   │   │   └── e5b430d498295fbce9b223ee96eed56ae4abe7
 │   │   ├─> 45
 │   │   │   └── 4c145f0c74dbfd8713274736f3d456850f6a4f
 │   │   ├─> 47
 │   │   │   └── 4f2dfbd1694e0d38e43a89304fd5cb12bd6940
 │   │   ├─> 4b
 │   │   │   └── 5ad7195e5abe3e0c5453a8d2fb1879b74ae9e2
 │   │   ├─> 4e
 │   │   │   └── a6bea88d9210e492d0b479a29461380366f853
 │   │   ├─> 4f
 │   │   │   └── af9e74310a59139a4a37a9585ab87b4a19c82d
 │   │   ├─> 52
 │   │   │   └── 136322e55eb1c5affa671762e45a360d1472e9
 │   │   ├─> 53
 │   │   │   └── 8242c502f50857efd83d54059345b8060adc71
 │   │   ├─> 56
 │   │   │   ├── 14e99459bf235c5f986633302ee6fedc39ba22
 │   │   │   └── 3e15ea3bf5dd8e99a8f60775a33d1ed17c930e
 │   │   ├─> 59
 │   │   │   └── b812098a099dba6195f7fdb45b603aa7b060b8
 │   │   ├─> 5a
 │   │   │   └── d9d4bd07397ede8244c6d4078cdafd6f662e8a
 │   │   ├─> 5b
 │   │   │   ├── 099658e3e910a80b2f5eaaf19f7b6205d7b1da
 │   │   │   └── c490de1e42f70ea2571ea2a26297441f649826
 │   │   ├─> 60
 │   │   │   └── b0987a6257d05465127746cc217c1c301252c5
 │   │   ├─> 64
 │   │   │   └── 3c352ee7cc293ceb5e1848ff376a892373f95d
 │   │   ├─> 68
 │   │   │   └── 312e0d21831a4f12aa827838c80e65d7749fe2
 │   │   ├─> 69
 │   │   │   └── e6c67534c9b7c4b952b7e79b66438e408056fa
 │   │   ├─> 72
 │   │   │   └── 2a0e804eaa9bf3665fb92e549d1dc67889d0ee
 │   │   ├─> 73
 │   │   │   ├── 9862ae461d91d0d5310a90adb938768bdc408f
 │   │   │   └── c077e16b4e863d390cc414af0b2562072e10a1
 │   │   ├─> 74
 │   │   │   └── d547acdb280008c6eee744842b49d43d153c64
 │   │   ├─> 75
 │   │   │   └── 68d03c2dd5c9451ac24f251fd9e56df0d12754
 │   │   ├─> 76
 │   │   │   └── ac1d9700e8a5fd6ec9a79bd30a2cf74edf2e88
 │   │   ├─> 77
 │   │   │   └── c37dc0a6213e082a5736fdd039d12dcec7b21e
 │   │   ├─> 79
 │   │   │   └── b449e5d74cd0c2a1b470fbde12c050225711b3
 │   │   ├─> 7b
 │   │   │   └── f3b5f8d48f470c09eaa690bee564dbd1178d77
 │   │   ├─> 7d
 │   │   │   └── ce8e8646f090b88b1bff94824e991348f0d415
 │   │   ├─> 80
 │   │   │   └── 74a990f6d23f8c87ec00ea2e479b0066f9dd46
 │   │   ├─> 82
 │   │   │   └── d59eba265e0615a79632fe8ad0c3c21d46548d
 │   │   ├─> 84
 │   │   │   ├── 98b779b5cd60a34435ddfc868b4f2fe28ccf74
 │   │   │   └── a078f799817cd034257adf8b0375cffbc3b20a
 │   │   ├─> 86
 │   │   │   └── eff4e6e981e3d8c24e763ca3219d191fdde279
 │   │   ├─> 87
 │   │   │   └── baddb48f2ad661972119f6d17d6a10903d211d
 │   │   ├─> 88
 │   │   │   └── ef4375ecd2f065daf4da9ea89eb883af022349
 │   │   ├─> 8a
 │   │   │   └── bb4fa046b6170a989ad1b273ed67b4a9258a00
 │   │   ├─> 91
 │   │   │   ├── 84cf3cdc07b94f45de2c7a233608915dac54a6
 │   │   │   └── 87051ccdf2b34bf80fcac57bde2f354d9b32c5
 │   │   ├─> 93
 │   │   │   └── 6efbaec634a7ca6fc3faa5b603fc9d4fb4c6d7
 │   │   ├─> 98
 │   │   │   └── e4bce57199bf7cc44f043c517411bf4adbaba5
 │   │   ├─> 9c
 │   │   │   └── ed2fbe1356f3d95d930e2ea15af2ba12faccb7
 │   │   ├─> 9d
 │   │   │   └── 5e07ece26f7d5a5daff75e7f5c395e3dfe0e35
 │   │   ├─> a0
 │   │   │   └── 737d88729bdb222f75a0a3f27acd858c47c4bd
 │   │   ├─> a6
 │   │   │   ├── ac61403388472f45b32840d710662120c22aad
 │   │   │   └── e2190002adddee71eba828885d9d1b2cebffdc
 │   │   ├─> ad
 │   │   │   └── e16602af63b3e7bbaef52a029708e479fdacbd
 │   │   ├─> b0
 │   │   │   └── 3000accb8a440473c7cb306f282f10277a739a
 │   │   ├─> b6
 │   │   │   └── 86cc62f518bbc353e41e3f2f4d783b84fd89b8
 │   │   ├─> bf
 │   │   │   └── ab56f107c20ef333f1cc17cb540cbdd20ae2e2
 │   │   ├─> c1
 │   │   │   └── 8be790ea20c2511da4a93db4063ffb25ce3a6f
 │   │   ├─> c3
 │   │   │   ├── b86952901a51f4672dfff994d386f2539af883
 │   │   │   └── c85ef64d9d84118e1f3e2b4241befadf4fa2ff
 │   │   ├─> c4
 │   │   │   └── c3fd1fcfba259f53e6090e6b59ad1da1eb7eb7
 │   │   ├─> c5
 │   │   │   └── e2b411bbc5e6f6649397ec715cc939cd2ea292
 │   │   ├─> c7
 │   │   │   └── 7f2f359530a21152d29d1f63058c024dc6997a
 │   │   ├─> cd
 │   │   │   └── 03ce4231c78b185eaa48e6ad5dc77058546e6f
 │   │   ├─> d0
 │   │   │   └── 25b408e40c334abe3cab6e7ff55455e263e4c5
 │   │   ├─> d7
 │   │   │   ├── 9c5196ea6456fc93e5f381a478f1bee63cc25f
 │   │   │   └── c0b9d537015f44efd76435b0ee73a06cd2479a
 │   │   ├─> da
 │   │   │   └── ccccb19f105678c22da5476d239e76eb13c5a8
 │   │   ├─> dd
 │   │   │   └── e1947c1734714c30036988b327ffaa31f7c6bd
 │   │   ├─> de
 │   │   │   ├── 4f70fd78ae82f4122d660f9555186f2be7c3a1
 │   │   │   └── fd83cc4299e44017a75b93b86e9588a8ce6ae7
 │   │   ├─> e1
 │   │   │   └── 946493557b46a3719b4124b52dbcf32fbb12ca
 │   │   ├─> e2
 │   │   │   ├── 5f766b7d2ffd773d99800d602066eab8b5f069
 │   │   │   └── b9b22458a16af29c2fe705ee6a988cb6d220fd
 │   │   ├─> e4
 │   │   │   └── ee0be8697d616bf9efb09c81b0dbf8c87bae86
 │   │   ├─> e5
 │   │   │   └── 9c68fba8959b9f32f1cab7e4f3c81f2f62bc36
 │   │   ├─> ea
 │   │   │   ├── 253414678173b9e0bd0df68e0c4fc616f7cd32
 │   │   │   └── 8745fb2c09648429b569a702dd34fc4a1dd8e5
 │   │   ├─> f0
 │   │   │   └── bd172c3d97ac7bcf1cc87849768a5154bcef40
 │   │   ├─> f2
 │   │   │   └── 88702d2fa16d3cdf0035b15a9fcbc552cd88e7
 │   │   ├─> f4
 │   │   │   └── 2567c975c94a2a3461420d76dea0063cb87f7d
 │   │   ├─> f5
 │   │   │   ├── 1f68151052cd8f4fa8dd0d6b2e0474e52d88a6
 │   │   │   ├── 97d65d8b7717866f6d7d1cf512a67c31982f8a
 │   │   │   ├── b70dd75b053f6f3ae95915564e4f400154c191
 │   │   │   └── d34f5ec8d74a114c38fe9fdb68b8965eb59836
 │   │   ├─> f9
 │   │   │   └── 5b59494f8195607eacf53ff90abe1cd5043903
 │   │   ├─> ff
 │   │   │   └── 920b25e17693100ac368e8c736238c020371fe
 │   │   ├─> info
 │   │   └─> pack
 │   ├─> refs
 │   │   ├─> heads
 │   │   │   └── main
 │   │   ├─> remotes
 │   │   │   └─> origin
 │   │   │       └── main
 │   │   └─> tags
 │   └── shallow
 ├─> .github
 │   └─> workflows
 │       ├── build.yml
 │       ├── dree.yml
 │       ├── lint.yml
 │       └── test.yml
 ├── .gitignore
 ├── .prettierrc.cjs
 ├── LICENSE
 ├── README.md
 ├── babel.config.cjs
 ├── build.mjs
 ├─> docs
 │   ├── .gitignore
 │   └─> tree
 │       └── dree.config.json
 ├── jest.config.ts
 ├── package-lock.json
 ├── package.json
 ├─> source
 │   ├─> bin
 │   │   ├── .eslintrc.cjs
 │   │   ├── index.ts
 │   │   └─> utils
 │   │       └── index.ts
 │   ├─> lib
 │   │   ├─> errors
 │   │   │   ├── index.ts
 │   │   │   ├── mongoCleanerCleanError.ts
 │   │   │   ├── mongoCleanerConnectionError.ts
 │   │   │   ├── mongoCleanerDisconnectionError.ts
 │   │   │   ├── mongoCleanerError.ts
 │   │   │   ├── mongoCleanerListCollectionsError.ts
 │   │   │   └── mongoCleanerListDatabasesError.ts
 │   │   ├── index.ts
 │   │   ├─> types
 │   │   │   ├── exported.ts
 │   │   │   ├── index.ts
 │   │   │   └── internal.ts
 │   │   └─> utils
 │   │       ├── askConfirm.ts
 │   │       ├── cleaner.ts
 │   │       ├── logger.ts
 │   │       └── options.ts
 │   └── tsconfig.json
 ├─> test
 │   ├── .eslintrc.cjs
 │   ├── askConfirm.test.ts
 │   ├── clean.test.ts
 │   ├── errors.test.ts
 │   ├── logger.test.ts
 │   ├─> mock
 │   │   ├─> admin
 │   │   │   ├── system.version.bson
 │   │   │   └── system.version.metadata.json
 │   │   ├─> animals
 │   │   │   ├── Cats.bson
 │   │   │   ├── Cats.metadata.json
 │   │   │   ├── Giaguars.bson
 │   │   │   ├── Giaguars.metadata.json
 │   │   │   ├── Leopards.bson
 │   │   │   ├── Leopards.metadata.json
 │   │   │   ├── Lions.bson
 │   │   │   ├── Lions.metadata.json
 │   │   │   ├── Tigers.bson
 │   │   │   └── Tigers.metadata.json
 │   │   ├─> cars
 │   │   │   ├── AlfaRomeo.bson
 │   │   │   ├── AlfaRomeo.metadata.json
 │   │   │   ├── Ferrari.bson
 │   │   │   ├── Ferrari.metadata.json
 │   │   │   ├── McLaren.bson
 │   │   │   ├── McLaren.metadata.json
 │   │   │   ├── Mercedes.bson
 │   │   │   ├── Mercedes.metadata.json
 │   │   │   ├── RedBull.bson
 │   │   │   └── RedBull.metadata.json
 │   │   └─> computers
 │   │       ├── Dell.bson
 │   │       ├── Dell.metadata.json
 │   │       ├── Mac.bson
 │   │       ├── Mac.metadata.json
 │   │       ├── Thinkpad.bson
 │   │       └── Thinkpad.metadata.json
 │   ├── options.test.ts
 │   └─> utils
 │       ├── mockAskConfirm.ts
 │       └── mockOra.ts
 ├── tsconfig.json
 ├── typedoc.cjs
 └── typedoc.dev.cjs
```
[//]: # (dree - END)



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

