import { mockOra, mockOraStart, mockOraSucceed, mockOraWarn, mockOraFail } from '@test/utils/mockOra.js';

import { mergeOptions } from '@lib/utils/options.js';
import { Logger } from '@lib/utils/logger.js';

describe('Test: logger', function () {
    let spyConsoleLog: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

    beforeAll(function () {
        spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(function () {
        spyConsoleLog.mockClear();
        mockOraSucceed.mockClear();
        mockOraFail.mockClear();
        mockOraWarn.mockClear();
        mockOraStart.mockClear();
        mockOra.mockClear();
    });

    afterAll(function () {
        spyConsoleLog.mockRestore();
        mockOraSucceed.mockRestore();
        mockOraFail.mockRestore();
        mockOraWarn.mockRestore();
        mockOraStart.mockRestore();
        mockOra.mockRestore();
    });

    /* printDatabase */

    it(`Should properly execute printDatabase with log enabled`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.printDatabase('database');
        expect(spyConsoleLog).toHaveBeenCalledTimes(1);
        expect(spyConsoleLog).toHaveBeenCalledWith('database');
    });

    it(`Should properly execute printDatabase with log disabled`, function () {
        const logger = new Logger(mergeOptions({ log: false }));
        logger.printDatabase('database');
        expect(spyConsoleLog).not.toHaveBeenCalled();
    });

    /* startDropDatabase */

    it(`Should properly execute startDropDatabase with log enabled`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.startDropDatabase('database');
        expect(mockOra).toHaveBeenCalledWith({
            text: `Dropping database`,
            spinner: 'dots2'
        });
        expect(mockOraStart).toHaveBeenCalledTimes(1);
    });

    it(`Should properly execute startDropDatabase with log disabled`, function () {
        const logger = new Logger(mergeOptions({ log: false }));
        logger.startDropDatabase('database');
        expect(mockOraStart).not.toHaveBeenCalled();
    });

    /* stopDropDatabase */

    it(`Should properly execute stopDropDatabase with succeded`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.startDropDatabase('database');
        logger.stopDropDatabase(true, false);
        logger.stopDropDatabase(true, true);
        expect(mockOra).toHaveBeenCalledWith({
            text: `Dropping database`,
            spinner: 'dots2'
        });
        expect(mockOra).toHaveBeenCalledTimes(1);
        expect(mockOraStart).toHaveBeenCalledTimes(1);
        expect(mockOraSucceed).toHaveBeenCalledTimes(2);
        expect(mockOraFail).not.toHaveBeenCalled();
        expect(mockOraWarn).not.toHaveBeenCalled();
    });

    it(`Should properly execute stopDropDatabase with fallback`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.startDropDatabase('database');
        logger.stopDropDatabase(true, true);
        logger.stopDropDatabase(false, true);
        expect(mockOra).toHaveBeenCalledWith({
            text: `Dropping database`,
            spinner: 'dots2'
        });
        expect(mockOra).toHaveBeenCalledTimes(1);
        expect(mockOraStart).toHaveBeenCalledTimes(1);
        expect(mockOraSucceed).toHaveBeenCalledTimes(1);
        expect(mockOraFail).not.toHaveBeenCalled();
        expect(mockOraWarn).toHaveBeenCalledTimes(1);
    });

    it(`Should properly execute stopDropDatabase without fallback`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.startDropDatabase('database');
        logger.stopDropDatabase(true, false);
        logger.stopDropDatabase(false, false);
        expect(mockOra).toHaveBeenCalledWith({
            text: `Dropping database`,
            spinner: 'dots2'
        });
        expect(mockOra).toHaveBeenCalledTimes(1);
        expect(mockOraStart).toHaveBeenCalledTimes(1);
        expect(mockOraSucceed).toHaveBeenCalledTimes(1);
        expect(mockOraFail).toHaveBeenCalledTimes(1);
        expect(mockOraWarn).not.toHaveBeenCalled();
    });

    it(`Should properly execute stopDropDatabase with log disabled`, function () {
        const logger = new Logger(mergeOptions({ log: false }));
        logger.startDropDatabase('database');
        logger.stopDropDatabase(true);
        expect(mockOra).not.toHaveBeenCalled();
        expect(mockOraStart).not.toHaveBeenCalled();
        expect(mockOraSucceed).not.toHaveBeenCalled();
        expect(mockOraFail).not.toHaveBeenCalled();
        expect(mockOraWarn).not.toHaveBeenCalled();
    });

    /* startDropCollection */

    it(`Should properly execute startDropCollection with log enabled`, function () {
        const logger = new Logger(mergeOptions({ log: true }));
        logger.startDropCollection('collection');
        expect(mockOra).toHaveBeenCalledWith({
            text: `Dropping collection`,
            spinner: 'dots2'
        });
        expect(mockOra).toHaveBeenCalledTimes(1);
        expect(mockOraStart).toHaveBeenCalledTimes(1);
    });
    // it(`Should properly execute startDropCollection with log disabled`, function () {
    //     const stubOra = sinon.stub();
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: false });
    //     logger.startDropCollection('collection');
    //     expect(stubOra).not.toHaveBeenCalled();
    // });
    // /* stopDropCollection */
    // it(`Should properly execute stopDropCollection with succeded`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubWarn = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         warn: stubWarn,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startDropCollection('collection');
    //     logger.stopDropCollection(true, false);
    //     logger.stopDropCollection(true, true);
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Dropping collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    //     expect(stubSucceeded).to.have.been.calledTwice;
    //     expect(stubFail).not.toHaveBeenCalled();
    //     expect(stubWarn).not.toHaveBeenCalled();
    // });
    // it(`Should properly execute stopDropCollection with fallback`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubWarn = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         warn: stubWarn,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startDropCollection('collection');
    //     logger.stopDropCollection(true, true);
    //     logger.stopDropCollection(false, true);
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Dropping collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    //     expect(stubSucceeded).to.have.been.calledOnce;
    //     expect(stubFail).not.toHaveBeenCalled();
    //     expect(stubWarn).to.have.been.calledOnce;
    // });
    // it(`Should properly execute stopDropCollection without fallback`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubWarn = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         warn: stubWarn,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startDropCollection('collection');
    //     logger.stopDropCollection(true, false);
    //     logger.stopDropCollection(false, false);
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Dropping collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    //     expect(stubSucceeded).to.have.been.calledOnce;
    //     expect(stubWarn).not.toHaveBeenCalled();
    //     expect(stubFail).to.have.been.calledOnce;
    // });
    // it(`Should properly execute stopDropCollection with log disabled`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubWarn = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         warn: stubWarn,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: false });
    //     logger.startDropCollection('collection');
    //     logger.stopDropCollection(true);
    //     expect(stubOra).not.toHaveBeenCalled();
    //     expect(stubStart).not.toHaveBeenCalled();
    //     expect(stubSucceeded).not.toHaveBeenCalled();
    //     expect(stubWarn).not.toHaveBeenCalled();
    //     expect(stubFail).not.toHaveBeenCalled();
    // });
    // /* startEmptyCollection */
    // it(`Should properly execute startEmptyCollection with log enabled`, function () {
    //     const stubStart = sinon.stub();
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startEmptyCollection('collection');
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Emptying collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    // });
    // it(`Should properly execute startEmptyCollection with log disabled`, function () {
    //     const stubOra = sinon.stub();
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: false });
    //     logger.startEmptyCollection('collection');
    //     expect(stubOra).not.toHaveBeenCalled();
    // });
    // /* stopEmptyCollection */
    // it(`Should properly execute stopEmptyCollection with succeded`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startEmptyCollection('collection');
    //     logger.stopEmptyCollection(true);
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Emptying collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    //     expect(stubSucceeded).to.have.been.calledOnce;
    //     expect(stubFail).not.toHaveBeenCalled();
    // });
    // it(`Should properly execute stopEmptyCollection with failed`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startEmptyCollection('collection');
    //     logger.stopEmptyCollection(false);
    //     expect(stubOra).to.have.been.calledOnceWithExactly(
    //         sinon.match({
    //             text: `Emptying collection`,
    //             spinner: 'dots2'
    //         })
    //     );
    //     expect(stubStart).to.have.been.calledOnce;
    //     expect(stubSucceeded).not.toHaveBeenCalled();
    //     expect(stubFail).to.have.been.calledOnce;
    // });
    // it(`Should properly execute stopEmptyCollection with log disabled`, function () {
    //     const stubSucceeded = sinon.stub();
    //     const stubFail = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         succeed: stubSucceeded,
    //         fail: stubFail
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: false });
    //     logger.startEmptyCollection('collection');
    //     logger.stopEmptyCollection(true);
    //     expect(stubOra).not.toHaveBeenCalled();
    //     expect(stubStart).not.toHaveBeenCalled();
    //     expect(stubSucceeded).not.toHaveBeenCalled();
    //     expect(stubFail).not.toHaveBeenCalled();
    // });
    // /* stopAndClear */
    // it(`Should properly execute stopAndClear with logs enabled`, function () {
    //     const stubStop = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         stop: stubStop
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: true });
    //     logger.startDropDatabase('database');
    //     logger.stopAndClear();
    //     logger.startDropCollection('collection');
    //     logger.stopAndClear();
    //     logger.startEmptyCollection('collection');
    //     logger.stopAndClear();
    //     expect(stubOra).to.have.been.calledThrice;
    //     expect(stubStart).to.have.been.calledThrice;
    //     expect(stubStop).to.have.been.calledThrice;
    // });
    // it(`Should properly execute stopAndClear with logs disabled`, function () {
    //     const stubStop = sinon.stub();
    //     const stubStart = sinon.stub().returns({
    //         stop: stubStop
    //     });
    //     const stubOra = sinon.stub().returns({
    //         start: stubStart
    //     });
    //     const { Logger } = proxyquire('../dist/lib/utils/logger', {
    //         ora: stubOra
    //     });
    //     const logger = new Logger({ log: false });
    //     logger.startDropDatabase('database');
    //     logger.stopAndClear();
    //     logger.startDropCollection('collection');
    //     logger.stopAndClear();
    //     logger.startEmptyCollection('collection');
    //     logger.stopAndClear();
    //     expect(stubOra).not.toHaveBeenCalled();
    //     expect(stubStart).not.toHaveBeenCalled();
    //     expect(stubStop).not.toHaveBeenCalled();
    // });
});
