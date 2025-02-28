import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { CommandsCommand } from "../../commands/commands.command.js";
import { CommandManager } from "../../commands/command-manager.js";
import { BOT_CONFIG } from "../../config.js";
import { Command, CommandContext } from "../../commands/command.interface.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "TestBot",
    PREFIX: "!",
  },
}));

describe("CommandsCommand", () => {
  let commandsCommand: CommandsCommand;
  let mockCommandManager: CommandManager;
  let mockClient: any;
  let mockCommands: Command[];

  beforeEach(() => {
    // Create mock commands that will be returned by the command manager
    // Using the simplest possible implementation to avoid type issues
    const mockExecute1 = jest.fn();
    const mockExecute2 = jest.fn();

    mockCommands = [
      {
        options: {
          name: "test1",
          description: "Test command 1",
          permission: "everyone",
        },
        execute: mockExecute1,
      } as Command,
      {
        options: {
          name: "test2",
          description: "Test command 2",
          permission: "everyone",
          aliases: ["t2", "testing2"],
          usage: "!test2 <arg>",
        },
        execute: mockExecute2,
      } as Command,
    ];

    // Create mock command manager
    mockCommandManager = {
      registerCommand: jest.fn(),
      handleMessage: jest.fn(),
      getAllCommands: jest.fn().mockReturnValue(mockCommands),
    } as unknown as CommandManager;

    // Create command instance with mocked command manager
    commandsCommand = new CommandsCommand(mockCommandManager);

    // Create mock client
    mockClient = {
      say: jest.fn(),
    };
  });

  it("should list all available commands when no argument is provided", () => {
    // Create context with no args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: [],
      userstate: { username: "testuser" },
    };

    // Execute the command
    commandsCommand.execute(context as any);

    // Verify that the client.say was called with the list of commands
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Available commands: !test1, !test2")
    );
  });

  it("should show command details when a valid command name is provided", () => {
    // Create context with command name as arg
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["test2"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    commandsCommand.execute(context as any);

    // Verify that the client.say was called with command details
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Test command 2")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Usage: !test2 <arg>")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Aliases: !t2, !testing2")
    );
  });

  it("should show command details when a valid command alias is provided", () => {
    // Create context with command alias as arg
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["t2"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    commandsCommand.execute(context as any);

    // Verify that the client.say was called with command details
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("!test2")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Test command 2")
    );
  });

  it("should show an error message when an invalid command is requested", () => {
    // Create context with invalid command name
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["nonexistent"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    commandsCommand.execute(context as any);

    // Verify that the client.say was called with error message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Command !nonexistent not found")
    );
  });
});

