export const mockOraStart = jest.fn(() => {});
export const mockOra = jest.fn(() => ({
    start: mockOraStart
}));

jest.mock('ora', () => mockOra);
