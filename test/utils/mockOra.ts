export const mockOraSucceed = jest.fn();
export const mockOraWarn = jest.fn();
export const mockOraFail = jest.fn();
export const mockOraStop = jest.fn();
export const mockOraStart = jest.fn(() => ({
    succeed: mockOraSucceed,
    warn: mockOraWarn,
    fail: mockOraFail,
    stop: mockOraStop
}));
export const mockOra = jest.fn(() => ({
    start: mockOraStart
}));

jest.mock('ora', () => mockOra);
