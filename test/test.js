import * as mongoclean from '../dist/lib/index.js';
import mongodb from 'mongodb';
import { execSync } from 'child_process';

import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import cleanTest from'./clean.test.js';
import errorsTest from'./errors.test.js';
import optionsTest from'./options.test.js';

// TODO: Re-add tests that used mocking
describe('MongoBack module tests', async function() {
    cleanTest(chai.expect, mongodb, execSync, mongoclean);
    errorsTest(chai.expect, mongoclean);
    optionsTest(chai.expect);
});