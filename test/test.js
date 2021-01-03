const mongoclean = require('../dist/lib/index');
const mongodb = require('mongodb');
const expect = require('chai').expect;
const execSync = require('child_process').execSync;

describe('MongoBack module tests', function() {

    require('./clean.test')(expect, mongodb, execSync, mongoclean);
    require('./errors.test')(expect, mongoclean);

});