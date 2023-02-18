export const mockInquirerPrompt = jest.fn();
jest.mock('inquirer', () => ({
    prompt: mockInquirerPrompt
}));
