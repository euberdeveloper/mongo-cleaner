const proxyquire = require('proxyquire');

module.exports = (expect, sinon) => {

    describe('Test: logger', function () {

        /* printDatabase */

        it(`Should properly execute printDatabase with log enabled`, function () {
            const sandbox = sinon.createSandbox();
            const stubConsoleLog = sandbox.stub(console, 'log');
            const { Logger } = require('../dist/lib/utils/logger');

            const logger = new Logger({ log: true });
            logger.printDatabase('database');

            sandbox.restore();

            expect(stubConsoleLog).to.have.been.calledOnceWithExactly('database');
        });
        it(`Should properly execute printDatabase with log disabled`, function () {
            const sandbox = sinon.createSandbox();
            const stubConsoleLog = sandbox.stub(console, 'log');
            const { Logger } = require('../dist/lib/utils/logger');

            const logger = new Logger({ log: false });
            logger.printDatabase('database');

            sandbox.restore();

            expect(stubConsoleLog).to.have.not.been.called;
        });

        /* startDropDatabase */

        it(`Should properly execute startDropDatabase with log enabled`, function () {
            const stubStart = sinon.stub();
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropDatabase('database');

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping database`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
        });
        it(`Should properly execute startDropDatabase with log disabled`, function () {
            const stubOra = sinon.stub()

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startDropDatabase('database');

            expect(stubOra).to.have.not.been.called;
        });

        /* stopDropDatabase */

        it(`Should properly execute stopDropDatabase with succeded`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropDatabase('database');
            logger.stopDropDatabase(true, false);
            logger.stopDropDatabase(true, true);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping database`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledTwice;
            expect(stubFail).to.have.not.been.called;
            expect(stubWarn).to.have.not.been.called;
        });
        it(`Should properly execute stopDropDatabase with fallback`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropDatabase('database');
            logger.stopDropDatabase(true, true);
            logger.stopDropDatabase(false, true);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping database`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledOnce;
            expect(stubFail).to.have.not.been.called;
            expect(stubWarn).to.have.been.calledOnce;
        });
        it(`Should properly execute stopDropDatabase without fallback`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropDatabase('database');
            logger.stopDropDatabase(true, false);
            logger.stopDropDatabase(false, false);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping database`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledOnce;
            expect(stubWarn).to.have.not.been.called;
            expect(stubFail).to.have.been.calledOnce;
        });
        it(`Should properly execute stopDropDatabase with log disabled`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startDropDatabase('database');
            logger.stopDropDatabase(true);

            expect(stubOra).to.have.not.been.called;
            expect(stubStart).to.have.not.been.called;
            expect(stubSucceeded).to.have.not.been.called;
            expect(stubWarn).to.have.not.been.called;
            expect(stubFail).to.have.not.been.called;
        });

        /* startDropCollection */

        it(`Should properly execute startDropCollection with log enabled`, function () {
            const stubStart = sinon.stub();
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropCollection('collection');

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
        });
        it(`Should properly execute startDropCollection with log disabled`, function () {
            const stubOra = sinon.stub()

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startDropCollection('collection');

            expect(stubOra).to.have.not.been.called;
        });

        /* stopDropCollection */

        it(`Should properly execute stopDropCollection with succeded`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropCollection('collection');
            logger.stopDropCollection(true, false);
            logger.stopDropCollection(true, true);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledTwice;
            expect(stubFail).to.have.not.been.called;
            expect(stubWarn).to.have.not.been.called;
        });
        it(`Should properly execute stopDropCollection with fallback`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropCollection('collection');
            logger.stopDropCollection(true, true);
            logger.stopDropCollection(false, true);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledOnce;
            expect(stubFail).to.have.not.been.called;
            expect(stubWarn).to.have.been.calledOnce;
        });
        it(`Should properly execute stopDropCollection without fallback`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropCollection('collection');
            logger.stopDropCollection(true, false);
            logger.stopDropCollection(false, false);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Dropping collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledOnce;
            expect(stubWarn).to.have.not.been.called;
            expect(stubFail).to.have.been.calledOnce;
        });
        it(`Should properly execute stopDropCollection with log disabled`, function () {
            const stubSucceeded = sinon.stub();
            const stubWarn = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                warn: stubWarn,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startDropCollection('collection');
            logger.stopDropCollection(true);

            expect(stubOra).to.have.not.been.called;
            expect(stubStart).to.have.not.been.called;
            expect(stubSucceeded).to.have.not.been.called;
            expect(stubWarn).to.have.not.been.called;
            expect(stubFail).to.have.not.been.called;
        });

        /* startEmptyCollection */

        it(`Should properly execute startEmptyCollection with log enabled`, function () {
            const stubStart = sinon.stub();
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startEmptyCollection('collection');

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Emptying collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
        });
        it(`Should properly execute startEmptyCollection with log disabled`, function () {
            const stubOra = sinon.stub()

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startEmptyCollection('collection');

            expect(stubOra).to.have.not.been.called;
        });

        /* stopEmptyCollection */

        it(`Should properly execute stopEmptyCollection with succeded`, function () {
            const stubSucceeded = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startEmptyCollection('collection');
            logger.stopEmptyCollection(true);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Emptying collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.been.calledOnce;
            expect(stubFail).to.have.not.been.called;
        });
        it(`Should properly execute stopEmptyCollection with failed`, function () {
            const stubSucceeded = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startEmptyCollection('collection');
            logger.stopEmptyCollection(false);

            expect(stubOra).to.have.been.calledOnceWithExactly(sinon.match({
                text: `Emptying collection`,
                spinner: 'dots2'
            }));
            expect(stubStart).to.have.been.calledOnce;
            expect(stubSucceeded).to.have.not.been.called;
            expect(stubFail).to.have.been.calledOnce;
        });
        it(`Should properly execute stopEmptyCollection with log disabled`, function () {
            const stubSucceeded = sinon.stub();
            const stubFail = sinon.stub();
            const stubStart = sinon.stub().returns({
                succeed: stubSucceeded,
                fail: stubFail
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startEmptyCollection('collection');
            logger.stopEmptyCollection(true);

            expect(stubOra).to.have.not.been.called;
            expect(stubStart).to.have.not.been.called;
            expect(stubSucceeded).to.have.not.been.called;
            expect(stubFail).to.have.not.been.called;
        });

        /* stopAndClear */

        it(`Should properly execute stopAndClear with logs enabled`, function () {
            const stubStop = sinon.stub();
            const stubStart = sinon.stub().returns({
                stop: stubStop
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: true });
            logger.startDropDatabase('database');
            logger.stopAndClear();
            logger.startDropCollection('collection');
            logger.stopAndClear();
            logger.startEmptyCollection('collection');
            logger.stopAndClear();

            expect(stubOra).to.have.been.calledThrice;
            expect(stubStart).to.have.been.calledThrice;
            expect(stubStop).to.have.been.calledThrice;
        });
        it(`Should properly execute stopAndClear with logs disabled`, function () {
            const stubStop = sinon.stub();
            const stubStart = sinon.stub().returns({
                stop: stubStop
            });
            const stubOra = sinon.stub().returns({
                start: stubStart
            });

            const { Logger } = proxyquire('../dist/lib/utils/logger', {
                ora: stubOra
            });

            const logger = new Logger({ log: false });
            logger.startDropDatabase('database');
            logger.stopAndClear();
            logger.startDropCollection('collection');
            logger.stopAndClear();
            logger.startEmptyCollection('collection');
            logger.stopAndClear();

            expect(stubOra).to.have.not.been.called;
            expect(stubStart).to.have.not.been.called;
            expect(stubStop).to.have.not.been.called;
        });
        
    });

};