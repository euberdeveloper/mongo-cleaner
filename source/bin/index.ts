#!/usr/bin/env node
import * as yargs from 'yargs';
import * as inquirer from 'inquirer';
import * as mongoCleaner from '../lib/index';

async function cleanWithConfirm(noConfirm: boolean): Promise<void> {
    let clean = noConfirm;
    if (!clean) {
        clean = (await inquirer.prompt({
            name: 'clean',
            message: 'Do you really want to clean your MongoDB?',
            default: false,
            type: 'confirm'
        })).clean;
    }
    if (clean) {
        await mongoCleaner.clean();
    }
}

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
            await cleanWithConfirm(args.noConfirm);
        }
    )
    .demandCommand(1, 'You must specify a command')
    .options({
        'noConfirm': {
            alias: 'y',
            default: false,
            describe: 'If you want the module to skip asking confirm before executing',
            type: 'boolean'
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/mongo-cleaner#readme')
    .argv;