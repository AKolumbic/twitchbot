# Twitch Bot Tests

This directory contains the test suites for the Twitch Bot application. Tests are organized into subdirectories mirroring the structure of the main application code.

## Testing Structure

- `services/`: Tests for service functionality
  - `moderation.service.test.ts`: Tests for chat moderation service
  - `openai.service.test.ts`: Tests for OpenAI integration service
- `index.test.ts`: The main test entry point that imports all test suites

## Running Tests

You can run tests using the following npm scripts:

```
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Framework

This project uses Jest with TypeScript support through ts-jest.

## Writing Tests

When adding new tests, please follow these guidelines:

1. Place tests in the appropriate subdirectory reflecting the code structure
2. Name test files with the `.test.ts` suffix
3. Import new test files in `index.test.ts`
4. Group related tests with `describe()` blocks
5. Use clear test descriptions in `it()` statements
6. Mock external dependencies (like OpenAI API)
7. Follow AAA pattern: Arrange, Act, Assert

## Mocking

Examples of mocking patterns used in the tests:

```typescript
// Mocking an external library
jest.mock("openai", () => {
  return class MockOpenAI {
    chat = {
      completions: {
        create: jest.fn(),
      },
    };
  };
});

// Mocking a configuration
jest.mock("../../config.js", () => ({
  OPENAI_CONFIG: {
    // mock config values
  },
}));
```

