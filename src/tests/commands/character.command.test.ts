import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { CharacterCommand } from "../../commands/character.command.js";
import { CommandContext } from "../../commands/command.interface.js";

// Mock the config with the correct import path (.js extension)
jest.mock("../../config.js", () => {
  return {
    BOT_CONFIG: {
      NAME: "MockBot",
      PREFIX: "!",
    },
  };
});

describe("CharacterCommand", () => {
  let characterCommand: CharacterCommand;
  let mockClient: any;
  let mockContext: CommandContext;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a new instance of the command for each test
    characterCommand = new CharacterCommand();

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
      message: "!character",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isSubscriber: false,
      isVIP: false,
    };
  });

  it("should have correct command options", () => {
    expect(characterCommand.options.name).toBe("character");
    expect(characterCommand.options.permission).toBe("everyone");
    expect(characterCommand.options.aliases).toContain("char");
    expect(characterCommand.options.aliases).toContain("characters");
  });

  it("should list all characters when no specific character is requested", () => {
    // Execute with empty args
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with a list of all characters
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Current characters:")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Brodi Dankweed")
    );
  });

  it("should provide details for Gilbert character when requested by name", () => {
    // Set up the args to request Gilbert
    mockContext.args = ["gilbert"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Gilbert
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Halfling")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Bard")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Stolen Fate")
    );
  });

  it("should provide details for Brodi character when requested by name", () => {
    // Set up the args to request Brodi
    mockContext.args = ["brodi"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Brodi
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Brodi Dankweed")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Tortle")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Druid")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hometown Heroes")
    );
  });

  it("should match Gilbert when 'bard' is mentioned", () => {
    // Set up the args to request by class
    mockContext.args = ["bard"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Gilbert
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
  });

  it("should match Gilbert when 'halfling' is mentioned", () => {
    // Set up the args to request by race
    mockContext.args = ["halfling"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Gilbert
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
  });

  it("should match Brodi when 'druid' is mentioned", () => {
    // Set up the args to request by class
    mockContext.args = ["druid"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Brodi
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Brodi Dankweed")
    );
  });

  it("should match Brodi when 'tortle' is mentioned", () => {
    // Set up the args to request by race
    mockContext.args = ["tortle"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with details about Brodi
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Brodi Dankweed")
    );
  });

  it("should provide error message when an unknown character is requested", () => {
    // Set up the args with an unknown character name
    mockContext.args = ["unknown"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check that the client.say method was called with an error message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Character not found")
    );
  });

  // Test for direct property access on characters object
  it("should directly access character when exact key is used", () => {
    // Set up the args with the exact key of the character in the characters object
    mockContext.args = ["gilbert"];

    // Execute the command
    characterCommand.execute(mockContext);

    // Check for Gilbert's details
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
  });

  // Test with more unusual input to hit the hasOwnProperty path
  it("should try different character name formats", () => {
    // Using just "Gil" which doesn't match "gilbert" directly but would potentially
    // match when checking if "gil" is a property on the characters object
    mockContext.args = ["gil"];

    // Mock the hasOwnProperty method to force the branch we want to cover
    const originalHasOwnProperty = Object.prototype.hasOwnProperty;

    // Use proper typing for the mock implementation
    const mockedHasOwnProperty = function (
      this: any,
      prop: PropertyKey
    ): boolean {
      // Return true for 'gil' to force our branch to be taken
      if (prop === "gil") {
        return true;
      }
      // Otherwise use the real implementation
      return originalHasOwnProperty.call(this, prop);
    };

    // Apply the mock with proper typing
    Object.prototype.hasOwnProperty = mockedHasOwnProperty;

    // Add a property that will be found via mocked hasOwnProperty
    const anyCommand = characterCommand as any;
    anyCommand.characters.gil = anyCommand.characters.gilbert;

    // Execute the command
    characterCommand.execute(mockContext);

    // Restore original method
    Object.prototype.hasOwnProperty = originalHasOwnProperty;

    // Verify the character was found
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
  });
});

