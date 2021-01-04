const mongoclean = require('../dist/lib/index');
const mongodb = require('mongodb');
const sinon = require('sinon');
const execSync = require('child_process').execSync;

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('MongoBack module tests', function() {

    require('./clean.test')(chai.expect, mongodb, execSync, mongoclean);
    require('./errors.test')(chai.expect, mongoclean);
    require('./logger.test')(chai.expect, sinon);
    require('./options.test')(chai.expect);
    require('./askConfirm.test')(chai.expect, sinon);

});