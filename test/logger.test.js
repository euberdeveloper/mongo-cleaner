const proxyquire = require('proxyquire');

module.exports = (expect, sinon) => {

    describe('Test: logger', function () {

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

            expect(stubOra).to.have.been.calledOnceWith(sinon.match({
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
        
    });

};