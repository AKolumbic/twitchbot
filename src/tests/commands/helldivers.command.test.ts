import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { HelldiversCommand } from "../../commands/helldivers.command.js";
import { BOT_CONFIG } from "../../config.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "DROSSBOT",
    PREFIX: "!",
  },
}));

describe("HelldiversCommand", () => {
  let helldiversCommand: HelldiversCommand;
  let mockClient: any;

  beforeEach(() => {
    // Create command instance
    helldiversCommand = new HelldiversCommand();

    // Create mock client
    mockClient = {
      say: jest.fn(),
    };
  });

  it("should provide a tip when executed", () => {
    // Create context
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: [],
      userstate: { username: "testuser" },
    };

    // Execute the command
    helldiversCommand.execute(context as any);

    // Verify that the client.say was called with a tip
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("HELLDIVERS 2 TIP:")
    );
  });

  it("should randomly select tips from the available list", () => {
    // Spy on Math.random instead of mocking it directly
    const randomSpy = jest.spyOn(Math, "random");

    try {
      // Create context
      const context = {
        client: mockClient,
        channel: "#testchannel",
        args: [],
        userstate: { username: "testuser" },
      };

      // First tip
      randomSpy.mockReturnValueOnce(0);
      helldiversCommand.execute(context as any);

      // Last tip
      randomSpy.mockReturnValueOnce(0.99);
      helldiversCommand.execute(context as any);

      // We should have two different calls with different tips
      expect(mockClient.say).toHaveBeenCalledTimes(2);

      const firstCall = mockClient.say.mock.calls[0][1];
      const secondCall = mockClient.say.mock.calls[1][1];

      // Verify we got different tips
      expect(firstCall).not.toEqual(secondCall);
    } finally {
      // Restore the original Math.random implementation
      randomSpy.mockRestore();
    }
  });

  it("should include bot name in the response", () => {
    // Create context
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: [],
      userstate: { username: "testuser" },
    };

    // Execute the command
    helldiversCommand.execute(context as any);

    // Verify that the response includes the bot name
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("DROSSBOT: HELLDIVERS 2 TIP:")
    );
  });

  it("should have correct command options", () => {
    // Verify command name
    expect(helldiversCommand.options.name).toBe("helldivers");

    // Verify command description
    expect(helldiversCommand.options.description).toBe(
      "Get a random Helldivers 2 tip or strategy"
    );

    // Verify command aliases
    expect(helldiversCommand.options.aliases).toContain("hd2");
    expect(helldiversCommand.options.aliases).toContain("helldivers2");
    expect(helldiversCommand.options.aliases).toContain("divers");

    // Verify permission level
    expect(helldiversCommand.options.permission).toBe("everyone");
  });
});

