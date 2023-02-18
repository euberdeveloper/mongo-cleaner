import { mockInquirerPrompt } from '@test/utils/mockAskConfirm.js';

import { askConfirm } from '@lib/utils/askConfirm.js';

describe('Test: askConfirm', function () {
    beforeEach(function () {
        mockInquirerPrompt.mockClear();
    });

    afterAll(function () {
        mockInquirerPrompt.mockRestore();
    });

    it(`Should ask confirm and return true`, async function () {
        mockInquirerPrompt.mockResolvedValueOnce({ clean: true });
        const result = await askConfirm(true);
        expect(result).toEqual(true);
        expect(mockInquirerPrompt).toHaveBeenCalled();
    });

    it(`Should ask confirm and return false`, async function () {
        mockInquirerPrompt.mockResolvedValueOnce({ clean: false });
        const result = await askConfirm(true);
        expect(result).toEqual(false);
        expect(mockInquirerPrompt).toHaveBeenCalled();
    });

    it(`Should not ask confirm and return true`, async function () {
        mockInquirerPrompt.mockResolvedValueOnce({ clean: false });
        const result = await askConfirm();
        expect(result).toEqual(true);
        expect(mockInquirerPrompt).not.toHaveBeenCalled();
    });
});
