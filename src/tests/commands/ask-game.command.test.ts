import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { AskGameCommand } from "../../commands/ask-game.command.js";
import { CommandContext } from "../../commands/command.interface.js";
import * as openAIServiceModule from "../../services/openai.service.js";
import { CommandManager } from "../../commands/command-manager.js";

// Mock environment variables
process.env.BOT_NAME = "MockBot";

// Mock the services
jest.mock("../../services/openai.service.js");

// Mock the config with the correct import path (.js extension)
jest.mock("../../config.js", () => {
  return {
    BOT_CONFIG: {
      NAME: "MockBot",
      PREFIX: "!",
    },
  };
});

describe("AskGameCommand", () => {
  let askGameCommand: AskGameCommand;
  let mockClient: any;
  let mockContext: CommandContext;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a new instance of the command for each test
    askGameCommand = new AskGameCommand();

    // Create a mock client
    mockClient = {
      say: jest.fn(),
    };

    // Create a mock context
    mockContext = {
      client: mockClient,
      channel: "#testchannel",
      userstate: {
        username: "testuser",
        "user-id": "12345",
        badges: {},
        mod: false,
      },
      message: "!askgame",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isSubscriber: false,
      isVIP: false,
    };
  });

  it("should have correct command options", () => {
    expect(askGameCommand.options.name).toBe("askgame");
    expect(askGameCommand.options.permission).toBe("subscriber");
    expect(askGameCommand.options.cooldown).toBe(30);
    expect(askGameCommand.options.aliases).toContain("gamequestion");
    expect(askGameCommand.options.aliases).toContain("videogame");
  });

  it("should prompt for a question when none is provided", async () => {
    // Execute with empty args
    await askGameCommand.execute(mockContext);

    // Check that the client.say method was called with a prompt for a question
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Please provide a question")
    );
  });

  it("should respond with an AI response for a valid question", async () => {
    // Set up the args and mock the AI response
    mockContext.args = [
      "What",
      "is",
      "the",
      "best",
      "build",
      "in",
      "Baldurs",
      "Gate",
      "3?",
    ];
    const mockQuestion = "What is the best build in Baldurs Gate 3?";
    const mockResponse =
      "Paladin/Sorcerer multiclass is very powerful due to Divine Smite + Sorcery Points.";

    // Mock the AI service response
    jest
      .spyOn(openAIServiceModule.openAIService, "getGameResponse")
      .mockImplementation(() => Promise.resolve(mockResponse));

    // Execute the command
    await askGameCommand.execute(mockContext);

    // Check that the thinking message was sent
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Thinking about")
    );

    // Check that the AI service was called with the correct question
    expect(
      openAIServiceModule.openAIService.getGameResponse
    ).toHaveBeenCalledWith(mockQuestion);

    // Check that the final response was sent to the channel and includes the AI response
    expect(mockClient.say).toHaveBeenLastCalledWith(
      "#testchannel",
      expect.stringContaining(mockResponse)
    );
  });

  it("should handle errors when the AI service fails", async () => {
    // Set up the args
    mockContext.args = ["What", "is", "Helldivers", "2?"];

    // Mock the AI service to throw an error
    jest
      .spyOn(openAIServiceModule.openAIService, "getGameResponse")
      .mockImplementation(() => Promise.reject(new Error("API Error")));

    // Execute the command
    await askGameCommand.execute(mockContext);

    // Check that an error message was sent to the channel
    expect(mockClient.say).toHaveBeenLastCalledWith(
      "#testchannel",
      expect.stringContaining(
        "Sorry, I couldn't answer that gaming question right now"
      )
    );
  });

  it("should truncate long questions in the thinking message", async () => {
    // Set up a very long question
    const longQuestion = "a".repeat(100);
    mockContext.args = [longQuestion];

    // Mock the AI service response
    jest
      .spyOn(openAIServiceModule.openAIService, "getGameResponse")
      .mockImplementation(() => Promise.resolve("Response to long question"));

    // Execute the command
    await askGameCommand.execute(mockContext);

    // Check that the thinking message contains truncated question with ellipsis
    // First message should be the thinking message
    expect(mockClient.say.mock.calls[0][0]).toBe("#testchannel");
    expect(mockClient.say.mock.calls[0][1]).toContain("a".repeat(50));
    expect(mockClient.say.mock.calls[0][1]).toContain("...");

    // Second message should be the response
    expect(mockClient.say.mock.calls[1][0]).toBe("#testchannel");
    expect(mockClient.say.mock.calls[1][1]).toContain(
      "Response to long question"
    );
  });

  it("should handle error gracefully", async () => {
    // ... existing test code ...
  });

  it("should allow subscribers, moderators, and broadcaster to use the command", async () => {
    // Create a proper mock Client
    const mockClient = {
      say: jest.fn(),
      // Add missing required properties
      getChannels: jest.fn(),
      getOptions: jest.fn(),
      getUsername: jest.fn(),
      isMod: jest.fn(),
      readyState: jest.fn(),
      removeAllListeners: jest.fn(),
      setMaxListeners: jest.fn(),
      emits: jest.fn(),
      listenerCount: jest.fn(),
    } as any;

    const mockChannel = "#testchannel";

    // Create a command manager to handle permission checks
    const commandManager = new CommandManager();

    // Test 1: Non-subscriber, non-moderator user (should be denied)
    const regularUserState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
      subscriber: false,
    } as any;

    commandManager.handleMessage(
      mockClient,
      mockChannel,
      regularUserState,
      "!askgame What's the best weapon in Helldivers 2?",
      false
    );

    // Verify permission denied message was sent
    expect(mockClient.say).toHaveBeenCalledWith(
      mockChannel,
      expect.stringContaining("don't have permission")
    );

    // Test 2: Subscriber (should be allowed)
    jest.clearAllMocks();
    const subscriberState = {
      username: "subscriber",
      "user-id": "54321",
      badges: {},
      mod: false,
      subscriber: true,
    } as any;

    commandManager.handleMessage(
      mockClient,
      mockChannel,
      subscriberState,
      "!askgame What's the best weapon in Helldivers 2?",
      false
    );

    // For subscribers, it should not show the permission denied message
    expect(mockClient.say).not.toHaveBeenCalledWith(
      mockChannel,
      expect.stringContaining("don't have permission")
    );

    // Test 3: Moderator (should be allowed)
    jest.clearAllMocks();
    const moderatorState = {
      username: "moderator",
      "user-id": "98765",
      badges: {},
      mod: true,
      subscriber: false,
    } as any;

    commandManager.handleMessage(
      mockClient,
      mockChannel,
      moderatorState,
      "!askgame What's the best weapon in Helldivers 2?",
      false
    );

    // For moderators, it should not show the permission denied message
    expect(mockClient.say).not.toHaveBeenCalledWith(
      mockChannel,
      expect.stringContaining("don't have permission")
    );

    // Test 4: Broadcaster (should be allowed)
    jest.clearAllMocks();
    const broadcasterState = {
      username: "broadcaster",
      "user-id": "55555",
      badges: { broadcaster: "1" },
      mod: false,
      subscriber: false,
    } as any;

    commandManager.handleMessage(
      mockClient,
      mockChannel,
      broadcasterState,
      "!askgame What's the best weapon in Helldivers 2?",
      false
    );

    // For broadcaster, it should not show the permission denied message
    expect(mockClient.say).not.toHaveBeenCalledWith(
      mockChannel,
      expect.stringContaining("don't have permission")
    );
  });
});

