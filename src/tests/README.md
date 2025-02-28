# Twitch Bot Tests

This directory contains the test suites for the Twitch Bot application. Tests are organized into subdirectories mirroring the structure of the main application code.

## Table of Contents

- [Testing Structure](#testing-structure)
- [Running Tests](#running-tests)
- [Test Framework](#test-framework)
- [Writing Tests](#writing-tests)
- [Mocking](#mocking)
- [Test Suites](#test-suites)
  - [Command Tests](#command-tests)
  - [Service Tests](#service-tests)
  - [Config Tests](#config-tests)

## Testing Structure

The tests are organized to mirror the main application structure:

- `commands/`: Tests for all bot commands
- `services/`: Tests for service functionality
- `config.test.ts`: Tests for configuration settings

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run a specific test file
npm test -- path/to/test-file.test.ts

# Run tests matching a pattern
npm test -- -t "test pattern"
```

## Test Framework

This project uses Jest with TypeScript support through ts-jest. Key features used include:

- Mock functions with `jest.fn()` and `jest.spyOn()`
- Module mocking with `jest.mock()`
- Setup and teardown with `beforeEach()` and `afterEach()`
- Test organization with `describe()` and `it()`
- Assertions with `expect()`

## Writing Tests

When adding new tests, please follow these guidelines:

1. Place tests in the appropriate subdirectory reflecting the code structure
2. Name test files with the `.test.ts` suffix
3. Group related tests with `describe()` blocks
4. Use clear test descriptions in `it()` statements
5. Mock external dependencies (like OpenAI API)
6. Follow AAA pattern: Arrange, Act, Assert
7. Test both success and error scenarios
8. Test edge cases when relevant

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
  BOT_CONFIG: {
    NAME: "MockBot",
    PREFIX: "!",
  },
}));

// Spying on a method
jest
  .spyOn(openAIServiceModule.openAIService, "generateResponse")
  .mockImplementation(() => Promise.resolve("Mocked response"));
```

## Test Suites

### Command Tests

The `commands/` directory contains tests for all bot commands. Each command has its own test file that verifies the command's functionality, including:

- **Command Options**: Tests that the command has the correct name, aliases, description, and permissions
- **Command Execution**: Tests that the command executes correctly with various inputs
- **Error Handling**: Tests that the command handles errors gracefully
- **Permission Checking**: Tests that permission levels are correctly enforced

Key command test files:

- **command-manager.test.ts**: Tests for the CommandManager class which handles command registration, parsing, and execution
- **ask.command.test.ts**, **ask-ttrpg.command.test.ts**, **ask-game.command.test.ts**: Tests for the AI-powered commands
- **roll.command.test.ts**: Tests for the dice rolling command
- **character.command.test.ts**, **campaign.command.test.ts**: Tests for TTRPG information commands
- **game.command.test.ts**, **helldivers.command.test.ts**: Tests for game information commands
- **info.command.test.ts**, **schedule.command.test.ts**: Tests for channel information commands
- **commands.command.test.ts**: Tests for the command that lists available commands

### Service Tests

The `services/` directory contains tests for the bot's service modules:

- **openai.service.test.ts**: Tests for the OpenAI integration service

  - Tests various response generation functions
  - Tests error handling and retry logic
  - Mocks the OpenAI API to avoid actual API calls during testing

- **moderation.service.test.ts**: Tests for the chat moderation service
  - Tests message filtering functionality
  - Tests banned word detection
  - Tests timeout and ban commands

### Config Tests

- **config.test.ts**: Tests that the configuration is loaded correctly and has the expected values
  - Tests environment variable loading
  - Tests default values
  - Tests configuration validation

