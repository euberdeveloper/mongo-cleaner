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

            expect(stubConsoleLog).to.have.callCount(0);
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

            expect(stubOra).to.have.callCount(0);
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
            expect(stubFail).to.have.callCount(0);
            expect(stubWarn).to.have.callCount(0);
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
            expect(stubFail).to.have.callCount(0);
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
            expect(stubWarn).to.have.callCount(0);
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

            expect(stubOra).to.have.callCount(0);
            expect(stubStart).to.have.callCount(0);
            expect(stubSucceeded).to.have.callCount(0);
        });


        
    });

};