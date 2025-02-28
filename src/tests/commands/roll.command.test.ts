import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { RollCommand } from "../../commands/roll.command.js";
import { CommandContext } from "../../commands/command.interface.js";
import { BOT_CONFIG } from "../../config.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "TestBot",
    PREFIX: "!",
  },
}));

describe("RollCommand", () => {
  let rollCommand: RollCommand;
  let mockClient: any;
  let context: CommandContext;
  let originalMathRandom: () => number;

  // Store the original Math.random function
  beforeAll(() => {
    originalMathRandom = Math.random;
  });

  // Restore the original Math.random after all tests
  afterAll(() => {
    Math.random = originalMathRandom;
  });

  beforeEach(() => {
    // Create a new instance for each test
    rollCommand = new RollCommand();

    // Create a mock client with a say method
    mockClient = {
      say: jest.fn(),
    };

    // Create a basic context
    context = {
      client: mockClient,
      channel: "#testchannel",
      userstate: {
        username: "testuser",
        "user-id": "12345",
        badges: {},
        mod: false,
        subscriber: false,
      },
      message: "!roll",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isVIP: false,
      isSubscriber: false,
    };

    // Reset any mock calls from previous tests
    jest.clearAllMocks();
  });

  it("should have the correct command options", () => {
    expect(rollCommand.options).toEqual({
      name: "roll",
      description: "Roll dice for D&D or other tabletop games",
      usage: "!roll <number>d<sides> [+/-<modifier>]",
      permission: "everyone",
      aliases: ["dice", "r"],
    });
  });

  it("should prompt for dice notation when no arguments provided", () => {
    // No args provided
    context.args = [];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct prompt message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, please specify the dice to roll. Example: !roll 2d20 or !roll 1d20+5`
    );
  });

  it("should return an error for invalid dice format", () => {
    // Set invalid dice notation
    context.args = ["invalid"];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct error message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, invalid dice format. Use format like: 2d6, 1d20+4, 3d8-2`
    );
  });

  it("should validate dice count (too many)", () => {
    // Set dice count too high
    context.args = ["25d6"];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct validation message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, you can roll between 1 and 20 dice at once.`
    );
  });

  it("should validate dice count (too few)", () => {
    // Set dice count too low
    context.args = ["0d6"];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct validation message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, you can roll between 1 and 20 dice at once.`
    );
  });

  it("should validate dice sides (too many)", () => {
    // Set dice sides too high
    context.args = ["1d1500"];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct validation message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, dice must have between 1 and 1000 sides.`
    );
  });

  it("should validate dice sides (too few)", () => {
    // Set dice sides too low
    context.args = ["1d0"];

    // Execute the command
    rollCommand.execute(context);

    // Check for the correct validation message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser, dice must have between 1 and 1000 sides.`
    );
  });

  it("should roll a single die without modifiers", () => {
    // Setting a fixed return value for Math.random
    const mockRandom = function () {
      return 0.5;
    };
    Math.random = mockRandom;

    // Set dice notation
    context.args = ["1d20"];

    // Execute the command
    rollCommand.execute(context);

    // For a d20 with Math.random = 0.5, we get floor(0.5 * 20) + 1 = 11
    const expectedRoll = Math.floor(0.5 * 20) + 1;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 1d20 → ${expectedRoll}`
    );
  });

  it("should roll a single die with positive modifier", () => {
    // Setting a fixed return value for Math.random
    const mockRandom = function () {
      return 0.5;
    };
    Math.random = mockRandom;

    // Set dice notation with modifier
    context.args = ["1d20+5"];

    // Execute the command
    rollCommand.execute(context);

    // For a d20 with Math.random = a roll of 0.5, we get floor(0.5 * 20) + 1 = 11
    const expectedRoll = Math.floor(0.5 * 20) + 1;
    const expectedTotal = expectedRoll + 5;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 1d20+5 → ${expectedRoll} + 5 = ${expectedTotal}`
    );
  });

  it("should roll a single die with negative modifier", () => {
    // Setting a fixed return value for Math.random
    const mockRandom = function () {
      return 0.5;
    };
    Math.random = mockRandom;

    // Set dice notation with negative modifier
    context.args = ["1d20-3"];

    // Execute the command
    rollCommand.execute(context);

    // For a d20 with Math.random = 0.5, we get floor(0.5 * 20) + 1 = 11
    const expectedRoll = Math.floor(0.5 * 20) + 1;
    const expectedTotal = expectedRoll - 3;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 1d20-3 → ${expectedRoll} - 3 = ${expectedTotal}`
    );
  });

  it("should roll multiple dice without modifiers", () => {
    // Create an array of mock return values
    const mockValues = [0.2, 0.5, 0.8];
    let callCount = 0;

    // Mock Math.random to return sequential values
    const mockRandom = function () {
      return mockValues[callCount++];
    };
    Math.random = mockRandom;

    // Set dice notation for multiple dice
    context.args = ["3d10"];

    // Execute the command
    rollCommand.execute(context);

    // Calculate expected results for d10 rolls
    const roll1 = Math.floor(0.2 * 10) + 1; // 3
    const roll2 = Math.floor(0.5 * 10) + 1; // 6
    const roll3 = Math.floor(0.8 * 10) + 1; // 9
    const total = roll1 + roll2 + roll3;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 3d10 → ${roll1} + ${roll2} + ${roll3} = ${total}`
    );
  });

  it("should roll multiple dice with positive modifier", () => {
    // Create an array of mock return values
    const mockValues = [0.2, 0.5, 0.8];
    let callCount = 0;

    // Mock Math.random to return sequential values
    const mockRandom = function () {
      return mockValues[callCount++];
    };
    Math.random = mockRandom;

    // Set dice notation for multiple dice with modifier
    context.args = ["3d10+5"];

    // Execute the command
    rollCommand.execute(context);

    // Calculate expected results for d10 rolls
    const roll1 = Math.floor(0.2 * 10) + 1; // 3
    const roll2 = Math.floor(0.5 * 10) + 1; // 6
    const roll3 = Math.floor(0.8 * 10) + 1; // 9
    const rollTotal = roll1 + roll2 + roll3;
    const finalTotal = rollTotal + 5;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 3d10+5 → (${roll1} + ${roll2} + ${roll3} = ${rollTotal}) + 5 = ${finalTotal}`
    );
  });

  it("should roll multiple dice with negative modifier", () => {
    // Create an array of mock return values
    const mockValues = [0.2, 0.5, 0.8];
    let callCount = 0;

    // Mock Math.random to return sequential values
    const mockRandom = function () {
      return mockValues[callCount++];
    };
    Math.random = mockRandom;

    // Set dice notation for multiple dice with negative modifier
    context.args = ["3d10-7"];

    // Execute the command
    rollCommand.execute(context);

    // Calculate expected results for d10 rolls
    const roll1 = Math.floor(0.2 * 10) + 1; // 3
    const roll2 = Math.floor(0.5 * 10) + 1; // 6
    const roll3 = Math.floor(0.8 * 10) + 1; // 9
    const rollTotal = roll1 + roll2 + roll3;
    const finalTotal = rollTotal - 7;

    // Check for the correct response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 3d10-7 → (${roll1} + ${roll2} + ${roll3} = ${rollTotal}) - 7 = ${finalTotal}`
    );
  });

  it("should parse input case-insensitively", () => {
    // Setting a fixed return value for Math.random
    const mockRandom = function () {
      return 0.5;
    };
    Math.random = mockRandom;

    // Set uppercase dice notation
    context.args = ["1D20+5"];

    // Execute the command
    rollCommand.execute(context);

    // For a d20 with Math.random = 0.5, we get floor(0.5 * 20) + 1 = 11
    const expectedRoll = Math.floor(0.5 * 20) + 1;
    const expectedTotal = expectedRoll + 5;

    // Check that input was parsed correctly
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: @testuser rolled 1d20+5 → ${expectedRoll} + 5 = ${expectedTotal}`
    );
  });
});

