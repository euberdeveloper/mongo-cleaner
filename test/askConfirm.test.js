import proxyquire from 'proxyquire';

export default (expect, sinon) => {

    describe('Test: askConfirm', function () {

        it(`Should ask confirm and return true`, async function () {
            const stubInquirer = sinon.stub().resolves({ clean: true });
            const { askConfirm } = proxyquire('../dist/lib/utils/askConfirm', {
                inquirer: {
                    prompt: stubInquirer
                }
            });

            const result = await askConfirm(true);

            expect(result).to.equal(true);
            expect(stubInquirer).to.have.been.calledOnce;
        });

        it(`Should ask confirm and return false`, async function () {
            const stubInquirer = sinon.stub().resolves({ clean: false });
            const { askConfirm } = proxyquire('../dist/lib/utils/askConfirm', {
                inquirer: {
                    prompt: stubInquirer
                }
            });

            const result = await askConfirm(true);

            expect(result).to.equal(false);
            expect(stubInquirer).to.have.been.calledOnce;
        });

        it(`Should not ask confirm and return true`, async function () {
            const stubInquirer = sinon.stub().resolves({ clean: true });
            const { askConfirm } = proxyquire('../dist/lib/utils/askConfirm', {
                inquirer: {
                    prompt: stubInquirer
                }
            });

            const result = await askConfirm();

            expect(result).to.equal(true);
            expect(stubInquirer).to.have.not.been.called;
        });

    });

};