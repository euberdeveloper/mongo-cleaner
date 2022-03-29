import mongoclean from '../dist/lib/index.js';
import mongodb from 'mongodb';
import sinon from 'sinon';
import { execSync } from 'child_process';

import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('MongoBack module tests', function() {

    require('./clean.test')(chai.expect, mongodb, execSync, mongoclean);
    require('./errors.test')(chai.expect, mongoclean);
    require('./logger.test')(chai.expect, sinon);
    require('./options.test')(chai.expect);
    require('./askConfirm.test')(chai.expect, sinon);

});