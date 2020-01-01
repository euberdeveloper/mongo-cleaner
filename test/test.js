const mongoclean = require('../dist/lib/index');
const mongodb = require('mongodb');
const expect = require('chai').expect;

describe('MongoBack module tests', function() {

    require('./clean.test')(expect, mongodb, mongoclean);

});