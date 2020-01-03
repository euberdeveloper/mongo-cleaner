#!/usr/bin/env node
import * as yargs from 'yargs';
import * as mongoCleaner from '../lib/index';
import { MongoCleanerOptions } from '../lib/index';
import { UriOptions, getUri, parseKeep } from './utils';

yargs
    .scriptName('mongo-cleaner')
    .command(
        'clean',
        'Removes all database except for admin from your mongodb',
        () => {
            return {};
        },
        async argv => {
            const args: any = argv;
            const uriOptions: UriOptions = {
                uri: args.uri,
                host: args.host,
                port: args.port,
                db: args.db,
                username: args.username,
                password: args.password,
                srv: args.srv === 'true'
            };
            const options: MongoCleanerOptions = {
                noConfirm: args.noConfirm,
                keep: args.keep,
                log: args.log,
                dropDatabases: args.dropDatabases,
                emptyDatabases: args.emptyDatabases,
                emptyCollections: args.emptyCollections,
                numberOfRetries: args.numberOfRetries,
                retryMilliseconds: args.retryMilliseconds,
                throwIfNotTotal: args.throwIfNotTotal
            };
            await mongoCleaner.clean(getUri(uriOptions), null, options);
        }
    )
    .demandCommand(1, 'You must specify a command')
    .options({
        'uri': {
            describe: 'The uri of the Connection options:',
            type: 'string',
            group: 'Connection options:'
        },
        'host': {
            default: 'localhost',
            describe: 'The host of the connection. Ignored if also uri is specified',
            type: 'string',
            group: 'Connection options:'
        },
        'port': {
            default: 27017,
            describe: 'The port of the connection. Ignored if also uri is specified',
            type: 'number',
            group: 'Connection options:'
        },
        'db': {
            default: '',
            describe: 'The database of the connection. Ignored if also uri is specified',
            type: 'string',
            group: 'Connection options:'
        },
        'username': {
            default: '',
            describe: 'The username of the connection. Ignored if also uri is specified',
            type: 'string',
            group: 'Connection options:'
        },
        'password': {
            default: '',
            describe: 'The password of the connection. Ignored if also uri is specified',
            type: 'string',
            group: 'Connection options:'
        },
        'srv': {
            default: false,
            describe: 'If the connection uri uses srv. Ignore if also uri is specified',
            type: 'boolean',
            group: 'Connection options:'
        },
        'connectionOptions': {
            default: '{}',
            describe: 'The connection options object passed to MongoClient. Note: string parsed with JSON.parse',
            type: 'string',
            group: 'Connection options:',
            coerce: value => typeof value === 'object' ? value : JSON.parse(value)
        },
        'noConfirm': {
            alias: 'y',
            default: false,
            describe: 'If you want the module to skip asking confirm before executing',
            type: 'boolean'
        },
        'keep': {
            default: [],
            describe: 'An array of strings and RegExp specifying databases that will not be cleaned',
            type: 'array',
            coerce: parseKeep
        },
        'log': {
            default: true,
            describe: 'If you want to display the clean method\'s log on console',
            type: 'boolean'
        },
        'dropDatabases': {
            default: true,
            describe: 'If you want to drop the whole database. Note: The admin database cannot be dropped and is ignored',
            type: 'boolean'
        },
        'emptyDatabases': {
            default: false,
            describe: 'If you want to drop databases\' collections without dropping the databases. If both "dropDatabases" and this options are true, this option will be used as a fallback if a database drop fails.',
            type: 'boolean'
        },
        'emptyCollections': {
            default: false,
            describe: 'If you want to empty collections without dropping them and their databases. If both "emptyDatabases" and this options are true, this option will be used as a fallback if a collection drop fails.',
            type: 'boolean'
        },
        'numberOfRetries': {
            default: 1,
            describe: 'The number of times a drop or empty operation is retried before throwing an error or passing to a fallback.',
            type: 'number'
        },
        'retryMilliseconds': {
            default: 20,
            describe: 'The number of milliseconds between two attempts of a drop or empty operation.',
            type: 'number'
        },
        'throwIfNotTotal': {
            default: true,
            describe: 'If you want to throw a MongoCleanerCleanError when MongoDB is only partially cleaned.',
            type: 'boolean'
        },
        'options': {
            alias: 'o',
            describe: 'A path to a json config file. If an option is both on the file and in the command, the command one will be considered',
            config: true
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/mongo-cleaner#readme')
    .argv;