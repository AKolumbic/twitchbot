import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { InfoCommand } from "../../commands/info.command.js";
import { CommandContext } from "../../commands/command.interface.js";
import { BOT_CONFIG } from "../../config.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "TestBot",
    PREFIX: "!",
  },
}));

describe("InfoCommand", () => {
  let infoCommand: InfoCommand;
  let mockClient: any;
  let context: CommandContext;

  beforeEach(() => {
    // Create a new instance for each test
    infoCommand = new InfoCommand();

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
      message: "!info",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isVIP: false,
      isSubscriber: false,
    };
  });

  it("should have the correct command options", () => {
    expect(infoCommand.options).toEqual({
      name: "info",
      description: "Provides information about the channel and bot",
      aliases: ["about"],
      permission: "everyone",
    });
  });

  it("should send a welcome message to regular users", () => {
    // Execute the command with a regular user context
    infoCommand.execute(context);

    // Check that client.say was called with the correct arguments
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: Hey @testuser! Welcome to the channel! I'm Drosshole and I stream tabletop RPGs (Pathfinder 2e on Thursdays and D&D on Saturdays) plus video games throughout the week. Check out !schedule, !game, !character, and !campaign for more details!`
    );
  });

  it("should send a different message to the broadcaster", () => {
    // Modify context to be from the broadcaster
    context.isBroadcaster = true;
    context.userstate.badges = { broadcaster: "1" };

    // Execute the command with the broadcaster context
    infoCommand.execute(context);

    // Check that client.say was called with the correct broadcaster-specific message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: Thanks for watching! I stream both tabletop RPGs (Pathfinder 2e and D&D) and video games like Helldivers 2, Hearthstone, and more. Type !commands to see what you can do here!`
    );
  });
});

