import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { CommandManager } from "../../commands/command-manager.js";
import {
  Command,
  CommandContext,
  CommandOptions,
} from "../../commands/command.interface.js";
import type { Mock, SpyInstance } from "jest-mock";

// Mock all command imports
jest.mock("../../commands/info.command.js", () => ({
  InfoCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "info",
      description: "Show bot info",
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/ask.command.js", () => ({
  AskCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "ask",
      description: "Ask the bot",
      cooldown: 30,
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/roll.command.js", () => ({
  RollCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "roll",
      description: "Roll dice",
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/campaign.command.js", () => ({
  CampaignCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "campaign",
      description: "Get information about current TTRPG campaigns",
      aliases: ["campaigns"],
      permission: "everyone",
      usage: "!campaign [name]",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/character.command.js", () => ({
  CharacterCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "character",
      description: "Get information about Drosshole's current characters",
      aliases: ["char", "characters"],
      permission: "everyone",
      usage: "!character [name]",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/game.command.js", () => ({
  GameCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "game",
      description: "Get information about games Drosshole streams",
      aliases: ["games", "videogame"],
      permission: "everyone",
      usage: "!game [name]",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/schedule.command.js", () => ({
  ScheduleCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "schedule",
      description: "Show schedule",
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/ask-ttrpg.command.js", () => ({
  AskTtrpgCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "ttrpg",
      description: "Ask about Pathfinder 2e or D&D rules, lore, or mechanics",
      usage: "!ttrpg <your question>",
      cooldown: 30,
      permission: "everyone",
      aliases: ["pf2e", "dnd", "pathfinder"],
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/ask-game.command.js", () => ({
  AskGameCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "askgame",
      description: "Ask about games",
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

jest.mock("../../commands/helldivers.command.js", () => ({
  HelldiversCommand: jest.fn().mockImplementation(() => ({
    options: {
      name: "helldivers",
      description: "Get a random Helldivers 2 tip or strategy",
      aliases: ["hd2", "helldivers2", "divers"],
      permission: "everyone",
    },
    execute: jest.fn().mockReturnValue(undefined),
  })),
}));

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "TestBot",
    PREFIX: "!",
  },
  COMMAND_PERMISSIONS: {
    BROADCASTER: "broadcaster",
    MODERATOR: "moderator",
    VIP: "vip",
    SUBSCRIBER: "subscriber",
    EVERYONE: "everyone",
  },
}));

// Create mock commands for testing with proper typing
const createMockCommand = (options: CommandOptions): Command => ({
  options,
  execute: jest.fn((context: CommandContext) =>
    Promise.resolve()
  ) as jest.MockedFunction<(context: CommandContext) => Promise<void>>,
});

describe("CommandManager", () => {
  let commandManager: CommandManager;
  let mockClient: any;
  let mockDate: SpyInstance;
  let mockCommand: Command;
  let broadcasterCommand: Command;
  let modCommand: Command;
  let vipCommand: Command;
  let subCommand: Command;

  // Setup before each test
  beforeEach(() => {
    // Create mock commands
    mockCommand = createMockCommand({
      name: "mockcommand",
      description: "A mock command for testing",
      aliases: ["mock", "test"],
      cooldown: 5,
      permission: "everyone",
    });

    broadcasterCommand = createMockCommand({
      name: "broadcasteronly",
      description: "Broadcaster only command",
      permission: "broadcaster",
    });

    modCommand = createMockCommand({
      name: "modonly",
      description: "Moderator only command",
      permission: "moderator",
    });

    vipCommand = createMockCommand({
      name: "viponly",
      description: "VIP only command",
      permission: "vip",
    });

    subCommand = createMockCommand({
      name: "subonly",
      description: "Subscriber only command",
      permission: "subscriber",
    });

    // Mock Date.now() to return a consistent value for testing cooldowns
    mockDate = jest.spyOn(Date, "now").mockReturnValue(1000);

    // Mock setTimeout to avoid actual timeouts
    jest.useFakeTimers();

    // Create a new CommandManager instance
    commandManager = new CommandManager();

    // Create a mock client
    mockClient = {
      say: jest.fn(),
    };
  });

  // Cleanup after each test
  afterEach(() => {
    mockDate.mockRestore();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should properly register commands during construction", () => {
    // Get all commands to verify registration
    const commands = commandManager.getAllCommands();

    // Check that all commands are registered
    expect(commands.length).toBeGreaterThan(0);

    // Check that some specific commands exist
    const commandNames = commands.map((cmd) => cmd.options.name);
    expect(commandNames).toContain("info");
    expect(commandNames).toContain("ask");
    expect(commandNames).toContain("roll");
    expect(commandNames).toContain("campaign");
    expect(commandNames).toContain("character");
  });

  it("should register a command with aliases", () => {
    // Create a new manager to avoid interference with auto-registered commands
    const testManager = new CommandManager();

    // Clear existing commands (registered in constructor)
    // @ts-ignore - Accessing private property for testing
    testManager.commands.clear();
    // @ts-ignore
    testManager.aliases.clear();
    // @ts-ignore
    testManager.cooldowns.clear();

    // Register our mock command
    testManager.registerCommand(mockCommand);

    // Check that the command is registered
    // @ts-ignore
    expect(testManager.commands.get("mockcommand")).toBe(mockCommand);

    // Check that aliases are registered
    // @ts-ignore
    expect(testManager.aliases.get("mock")).toBe("mockcommand");
    // @ts-ignore
    expect(testManager.aliases.get("test")).toBe("mockcommand");

    // Check that cooldown map is initialized
    // @ts-ignore
    expect(testManager.cooldowns.get("mockcommand")).toBeInstanceOf(Map);
  });

  it("should ignore messages from the bot", () => {
    // Create userstate and message
    const userstate = { username: "testuser", "user-id": "12345" } as any;
    const message = "!info";

    // Call handle message with self=true
    commandManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      true
    );

    // Verify that no client.say was called
    expect(mockClient.say).not.toHaveBeenCalled();
  });

  it("should ignore messages without the command prefix", () => {
    // Create userstate and message without prefix
    const userstate = { username: "testuser", "user-id": "12345" } as any;
    const message = "info";

    // Call handle message
    commandManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      false
    );

    // Verify that no client.say was called
    expect(mockClient.say).not.toHaveBeenCalled();
  });

  it("should handle commands by name", () => {
    // Create a new manager to have controlled test environment
    const testManager = new CommandManager();

    // Clear existing commands and register our mock command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(mockCommand);

    // Setup userstate and message
    const userstate = {
      username: "testuser",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;
    const message = "!mockcommand arg1 arg2";

    // Call handle message
    testManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      false
    );

    // Verify that execute was called with the correct arguments
    expect(mockCommand.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "#channel",
        args: ["arg1", "arg2"],
        message: "!mockcommand arg1 arg2",
      })
    );
  });

  it("should handle commands by alias", () => {
    // Create a new manager to have controlled test environment
    const testManager = new CommandManager();

    // Clear existing commands and register our mock command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(mockCommand);

    // Setup userstate and message using an alias
    const userstate = {
      username: "testuser",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;
    const message = "!mock arg1 arg2";

    // Call handle message
    testManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      false
    );

    // Verify that execute was called
    expect(mockCommand.execute).toHaveBeenCalled();
  });

  it("should do nothing when command doesn't exist", () => {
    // Setup userstate and unknown command
    const userstate = {
      username: "testuser",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;
    const message = "!nonexistentcommand";

    // Call handle message
    commandManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      false
    );

    // Verify that client.say was not called
    expect(mockClient.say).not.toHaveBeenCalled();
  });

  it("should check for broadcaster permission", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(broadcasterCommand);

    // Test with non-broadcaster user
    const nonBroadcasterState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      nonBroadcasterState,
      "!broadcasteronly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(broadcasterCommand.execute).not.toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Test with broadcaster user
    const broadcasterState = {
      username: "broadcaster",
      "user-id": "12345",
      badges: { broadcaster: "1" },
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      broadcasterState,
      "!broadcasteronly",
      false
    );

    // Should execute the command
    expect(broadcasterCommand.execute).toHaveBeenCalled();
  });

  it("should check for moderator permission", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(modCommand);

    // Test with non-mod user
    const nonModState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      nonModState,
      "!modonly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(modCommand.execute).not.toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Test with mod user
    const modState = {
      username: "moderator",
      "user-id": "12345",
      badges: {},
      mod: true,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      modState,
      "!modonly",
      false
    );

    // Should execute the command
    expect(modCommand.execute).toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Broadcaster should also have mod permissions
    const broadcasterState = {
      username: "broadcaster",
      "user-id": "12345",
      badges: { broadcaster: "1" },
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      broadcasterState,
      "!modonly",
      false
    );

    // Should execute the command
    expect(modCommand.execute).toHaveBeenCalled();
  });

  it("should check for VIP permission", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(vipCommand);

    // Test with non-VIP user
    const nonVIPState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      nonVIPState,
      "!viponly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(vipCommand.execute).not.toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Test with VIP user
    const vipState = {
      username: "vip",
      "user-id": "12345",
      badges: { vip: "1" },
      mod: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      vipState,
      "!viponly",
      false
    );

    // Should execute the command
    expect(vipCommand.execute).toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Mods should also have VIP permissions
    const modState = {
      username: "moderator",
      "user-id": "12345",
      badges: {},
      mod: true,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      modState,
      "!viponly",
      false
    );

    // Should execute the command
    expect(vipCommand.execute).toHaveBeenCalled();
  });

  it("should check for subscriber permission", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(subCommand);

    // Test with non-subscriber user
    const nonSubState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
      subscriber: false,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      nonSubState,
      "!subonly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(subCommand.execute).not.toHaveBeenCalled();

    // Reset mock
    jest.clearAllMocks();

    // Test with subscriber user
    const subState = {
      username: "subscriber",
      "user-id": "12345",
      badges: {},
      mod: false,
      subscriber: true,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      subState,
      "!subonly",
      false
    );

    // Should execute the command
    expect(subCommand.execute).toHaveBeenCalled();
  });

  it("should enforce command cooldowns", () => {
    // Create a command with cooldown
    const cooldownCommand = createMockCommand({
      name: "cooldowncmd",
      description: "Command with cooldown",
      cooldown: 5, // 5 second cooldown
      permission: "everyone",
    });

    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore - Accessing private property for testing
    testManager.commands.clear();
    testManager.registerCommand(cooldownCommand);

    // Test user state
    const userState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    // First execution should work
    testManager.handleMessage(
      mockClient,
      "#channel",
      userState,
      "!cooldowncmd",
      false
    );
    expect(cooldownCommand.execute).toHaveBeenCalledTimes(1);

    // Verify cooldown was set
    // @ts-ignore - Accessing private property for testing
    const cooldownMap = testManager.cooldowns.get("cooldowncmd");
    expect(cooldownMap).toBeDefined();
    expect(cooldownMap?.has("12345")).toBeTruthy();

    // Reset mocks for next test
    jest.clearAllMocks();

    // Execute again (should be on cooldown)
    testManager.handleMessage(
      mockClient,
      "#channel",
      userState,
      "!cooldowncmd",
      false
    );

    // Verify command was not executed due to cooldown
    expect(cooldownCommand.execute).not.toHaveBeenCalled();
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("please wait")
    );

    // Now manually clear the cooldown
    // @ts-ignore - Accessing private property for testing
    cooldownMap?.delete("12345");

    // Reset mocks
    jest.clearAllMocks();

    // Execute again (cooldown now cleared)
    testManager.handleMessage(
      mockClient,
      "#channel",
      userState,
      "!cooldowncmd",
      false
    );

    // Verify command was executed now that cooldown is cleared
    expect(cooldownCommand.execute).toHaveBeenCalledTimes(1);
  });

  it("should bypass cooldown for mods and broadcasters", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(mockCommand);

    // Test with mod
    const modState = {
      username: "moderator",
      "user-id": "12345",
      badges: {},
      mod: true,
    } as any;

    // First execution
    testManager.handleMessage(
      mockClient,
      "#channel",
      modState,
      "!mockcommand",
      false
    );
    expect(mockCommand.execute).toHaveBeenCalledTimes(1);

    // Reset execute mock
    jest.clearAllMocks();

    // Second execution should bypass cooldown
    testManager.handleMessage(
      mockClient,
      "#channel",
      modState,
      "!mockcommand",
      false
    );
    expect(mockCommand.execute).toHaveBeenCalledTimes(1);

    // No cooldown message
    expect(mockClient.say).not.toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("please wait")
    );

    // Test with broadcaster
    jest.clearAllMocks();
    const broadcasterState = {
      username: "broadcaster",
      "user-id": "67890",
      badges: { broadcaster: "1" },
      mod: false,
    } as any;

    // First execution
    testManager.handleMessage(
      mockClient,
      "#channel",
      broadcasterState,
      "!mockcommand",
      false
    );
    expect(mockCommand.execute).toHaveBeenCalledTimes(1);

    // Reset execute mock
    jest.clearAllMocks();

    // Second execution should bypass cooldown
    testManager.handleMessage(
      mockClient,
      "#channel",
      broadcasterState,
      "!mockcommand",
      false
    );
    expect(mockCommand.execute).toHaveBeenCalledTimes(1);
  });

  it("should handle command execution errors", () => {
    const errorCommand = createMockCommand({
      name: "errorcommand",
      description: "A command that errors",
      permission: "everyone",
    });

    (errorCommand.execute as jest.Mock).mockImplementation(() => {
      throw new Error("Test error");
    });

    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(errorCommand);

    // Mock console.error to prevent actual logging
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // User state
    const userState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    // Execute command that throws
    testManager.handleMessage(
      mockClient,
      "#channel",
      userState,
      "!errorcommand",
      false
    );

    // Should log the error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error executing command errorcommand"),
      expect.any(Error)
    );

    // Should send error message to channel
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("There was an error executing that command")
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it("should properly create command context", () => {
    // Create a command that will capture its context
    let capturedContext: CommandContext | undefined = undefined;
    const contextCommand = createMockCommand({
      name: "contextcommand",
      description: "A command that captures context",
      permission: "everyone",
    });

    (
      contextCommand.execute as jest.MockedFunction<
        (context: CommandContext) => Promise<void>
      >
    ).mockImplementation((context: CommandContext) => {
      capturedContext = context;
      return Promise.resolve();
    });

    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(contextCommand);

    // Test with various user states
    const broadcasterState = {
      username: "broadcaster",
      "user-id": "12345",
      badges: { broadcaster: "1" },
      mod: false,
      subscriber: true,
    } as any;

    testManager.handleMessage(
      mockClient,
      "#channel",
      broadcasterState,
      "!contextcommand arg1 arg2",
      false
    );

    // Verify context was created correctly
    expect(capturedContext).toBeTruthy();
    if (capturedContext) {
      const context = capturedContext as CommandContext;
      expect(context.client).toBe(mockClient);
      expect(context.channel).toBe("#channel");
      expect(context.userstate).toBe(broadcasterState);
      expect(context.message).toBe("!contextcommand arg1 arg2");
      expect(context.args).toEqual(["arg1", "arg2"]);
      expect(context.isBroadcaster).toBe(true);
      expect(context.isModerator).toBe(true); // Broadcasters have mod privileges
      expect(context.isSubscriber).toBe(true);
      expect(context.isVIP).toBe(true); // Broadcasters have VIP privileges
    }
  });

  it("should get all registered commands", () => {
    // Create a new manager with some known commands
    const testManager = new CommandManager();

    // Clear existing commands and register our commands
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(mockCommand);
    testManager.registerCommand(broadcasterCommand);

    // Get all commands
    const commands = testManager.getAllCommands();

    // Verify results
    expect(commands).toHaveLength(2);
    expect(commands).toContain(mockCommand);
    expect(commands).toContain(broadcasterCommand);
  });

  it("should handle empty command name", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Setup userstate and message with just the prefix
    const userstate = {
      username: "testuser",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;
    const message = "!";

    // Call handle message
    testManager.handleMessage(
      mockClient,
      "#channel",
      userstate,
      message,
      false
    );

    // Verify that no client.say was called since no command was found
    expect(mockClient.say).not.toHaveBeenCalled();
  });

  it("should handle default permission case", () => {
    // Create a command with an invalid permission that will fall to default
    const defaultPermCommand = createMockCommand({
      name: "defaultpermcommand",
      description: "Command with invalid permission",
      permission: "invalidperm", // This should trigger the default case
    });

    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our command
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(defaultPermCommand);

    // Test user state
    const userState = {
      username: "viewer",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as any;

    // Execute command
    testManager.handleMessage(
      mockClient,
      "#channel",
      userState,
      "!defaultpermcommand",
      false
    );

    // Command should execute since default permission is "everyone"
    expect(defaultPermCommand.execute).toHaveBeenCalled();
  });

  it("should handle null badges in permission checks", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our commands
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(broadcasterCommand);
    testManager.registerCommand(vipCommand);

    // Test user state with null badges
    const userStateNullBadges = {
      username: "viewer",
      "user-id": "12345",
      badges: null, // Explicitly null badges
      mod: false,
    } as any;

    // Execute broadcaster command with null badges
    testManager.handleMessage(
      mockClient,
      "#channel",
      userStateNullBadges,
      "!broadcasteronly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(broadcasterCommand.execute).not.toHaveBeenCalled();

    // Reset mocks
    jest.clearAllMocks();

    // Execute VIP command with null badges
    testManager.handleMessage(
      mockClient,
      "#channel",
      userStateNullBadges,
      "!viponly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(vipCommand.execute).not.toHaveBeenCalled();
  });

  it("should handle undefined badges in permission checks", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Clear existing commands and register our commands
    // @ts-ignore
    testManager.commands.clear();
    testManager.registerCommand(broadcasterCommand);

    // Test user state with undefined badges
    const userStateUndefinedBadges = {
      username: "viewer",
      "user-id": "12345",
      // badges is intentionally omitted to test undefined case
      mod: false,
    } as any;

    // Execute broadcaster command with undefined badges
    testManager.handleMessage(
      mockClient,
      "#channel",
      userStateUndefinedBadges,
      "!broadcasteronly",
      false
    );

    // Should get permission denied message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("don't have permission")
    );
    expect(broadcasterCommand.execute).not.toHaveBeenCalled();
  });

  it("should directly test hasPermission method for all cases", () => {
    // Create a new manager
    const testManager = new CommandManager();

    // Test broadcaster permission with various badge states
    const userWithBroadcasterBadge = {
      badges: { broadcaster: "1" },
    } as any;
    const userWithoutBroadcasterBadge = {
      badges: { subscriber: "1" },
    } as any;
    const userWithNullBadges = {
      badges: null,
    } as any;
    const userWithUndefinedBadges = {} as any;

    // Access the private method using type assertion
    expect(
      (testManager as any).hasPermission(
        userWithBroadcasterBadge,
        "broadcaster"
      )
    ).toBe(true);
    expect(
      (testManager as any).hasPermission(
        userWithoutBroadcasterBadge,
        "broadcaster"
      )
    ).toBe(false);
    expect(
      (testManager as any).hasPermission(userWithNullBadges, "broadcaster")
    ).toBe(false);
    expect(
      (testManager as any).hasPermission(userWithUndefinedBadges, "broadcaster")
    ).toBe(false);

    // Test moderator permission
    const modUser = { mod: true, badges: {} } as any;
    const nonModUser = { mod: false, badges: {} } as any;
    expect((testManager as any).hasPermission(modUser, "moderator")).toBe(true);
    expect((testManager as any).hasPermission(nonModUser, "moderator")).toBe(
      false
    );

    // Test VIP permission
    const vipUser = { badges: { vip: "1" }, mod: false } as any;
    const nonVipUser = { badges: {}, mod: false } as any;
    expect((testManager as any).hasPermission(vipUser, "vip")).toBe(true);
    expect((testManager as any).hasPermission(nonVipUser, "vip")).toBe(false);

    // Test subscriber permission
    const subUser = { subscriber: true, badges: {}, mod: false } as any;
    const nonSubUser = { subscriber: false, badges: {}, mod: false } as any;
    expect((testManager as any).hasPermission(subUser, "subscriber")).toBe(
      true
    );
    expect((testManager as any).hasPermission(nonSubUser, "subscriber")).toBe(
      false
    );

    // Test default/everyone permission
    expect((testManager as any).hasPermission(nonSubUser, "everyone")).toBe(
      true
    );
    expect(
      (testManager as any).hasPermission(nonSubUser, "unknown_permission")
    ).toBe(true);
    expect((testManager as any).hasPermission(nonSubUser, undefined)).toBe(
      true
    );
  });
});

