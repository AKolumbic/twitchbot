import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { AskTtrpgCommand } from "../../commands/ask-ttrpg.command.js";
import { CommandContext } from "../../commands/command.interface.js";
import * as openAIServiceModule from "../../services/openai.service.js";

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

describe("AskTtrpgCommand", () => {
  let askTtrpgCommand: AskTtrpgCommand;
  let mockClient: any;
  let mockContext: CommandContext;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a new instance of the command for each test
    askTtrpgCommand = new AskTtrpgCommand();

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
      message: "!ttrpg",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isSubscriber: false,
      isVIP: false,
    };
  });

  it("should have correct command options", () => {
    expect(askTtrpgCommand.options.name).toBe("ttrpg");
    expect(askTtrpgCommand.options.permission).toBe("everyone");
    expect(askTtrpgCommand.options.cooldown).toBe(30);
    expect(askTtrpgCommand.options.aliases).toContain("pf2e");
    expect(askTtrpgCommand.options.aliases).toContain("dnd");
    expect(askTtrpgCommand.options.aliases).toContain("pathfinder");
  });

  it("should prompt for a question when none is provided", async () => {
    // Execute with empty args
    await askTtrpgCommand.execute(mockContext);

    // Check that the client.say method was called with a prompt for a question
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Please provide a question")
    );
  });

  it("should respond with an AI response for a valid question", async () => {
    // Set up the args and mock the AI response
    mockContext.args = [
      "How",
      "does",
      "flanking",
      "work",
      "in",
      "Pathfinder",
      "2e?",
    ];
    const mockQuestion = "How does flanking work in Pathfinder 2e?";
    const mockResponse =
      "In Pathfinder 2e, flanking occurs when you and an ally are on opposite sides of a creature. When flanking, both you and your ally gain circumstance bonus to attack rolls against the flanked creature.";

    // Mock the AI service response
    jest
      .spyOn(openAIServiceModule.openAIService, "getTtrpgResponse")
      .mockImplementation(() => Promise.resolve(mockResponse));

    // Execute the command
    await askTtrpgCommand.execute(mockContext);

    // Check that the thinking message was sent
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Thinking about")
    );

    // Check that the AI service was called with the correct question
    expect(
      openAIServiceModule.openAIService.getTtrpgResponse
    ).toHaveBeenCalledWith(mockQuestion);

    // Check that the final response was sent to the channel and includes the AI response
    expect(mockClient.say).toHaveBeenLastCalledWith(
      "#testchannel",
      expect.stringContaining(mockResponse)
    );
  });

  it("should handle errors when the AI service fails", async () => {
    // Set up the args
    mockContext.args = [
      "What",
      "is",
      "the",
      "grapple",
      "rule",
      "in",
      "DnD",
      "5e?",
    ];

    // Mock the AI service to throw an error
    jest
      .spyOn(openAIServiceModule.openAIService, "getTtrpgResponse")
      .mockImplementation(() => Promise.reject(new Error("API Error")));

    // Execute the command
    await askTtrpgCommand.execute(mockContext);

    // Check that an error message was sent to the channel
    expect(mockClient.say).toHaveBeenLastCalledWith(
      "#testchannel",
      expect.stringContaining(
        "Sorry, I couldn't answer that question right now"
      )
    );
  });

  it("should truncate long questions in the thinking message", async () => {
    // Set up a very long question
    const longQuestion = "a".repeat(100);
    mockContext.args = [longQuestion];

    // Mock the AI service response
    jest
      .spyOn(openAIServiceModule.openAIService, "getTtrpgResponse")
      .mockImplementation(() => Promise.resolve("Response to long question"));

    // Execute the command
    await askTtrpgCommand.execute(mockContext);

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
});

