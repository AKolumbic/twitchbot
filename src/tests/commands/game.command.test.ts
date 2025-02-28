import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { GameCommand } from "../../commands/game.command.js";
import { BOT_CONFIG } from "../../config.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "TestBot",
    PREFIX: "!",
  },
}));

describe("GameCommand", () => {
  let gameCommand: GameCommand;
  let mockClient: any;

  beforeEach(() => {
    // Create command instance
    gameCommand = new GameCommand();

    // Create mock client
    mockClient = {
      say: jest.fn(),
    };
  });

  it("should list all games when no argument is provided", () => {
    // Create context with no args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: [],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify that the client.say was called with the list of games
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining(
        "Games I stream: Helldivers 2, Hearthstone, Baldur's Gate 3, Cyberpunk 2077"
      )
    );
  });

  it("should show Helldivers 2 information when requested with exact name", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["helldivers"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Helldivers 2 (2023)")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Third-person shooter")
    );
  });

  it("should show Helldivers 2 information when requested with alias", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["hd2"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Helldivers 2")
    );
  });

  it("should show Hearthstone information when requested", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["hearthstone"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hearthstone (2014)")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Digital card game")
    );
  });

  it("should show Hearthstone information when requested with alias", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["hs"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hearthstone")
    );
  });

  it("should show Baldur's Gate 3 information when requested", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["baldurs", "gate"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Baldur's Gate 3 (2023)")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("CRPG")
    );
  });

  it("should show Baldur's Gate 3 information when requested with alias", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["bg3"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Baldur's Gate 3")
    );
  });

  it("should show Cyberpunk 2077 information when requested", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["cyberpunk"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Cyberpunk 2077 (2020)")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Action RPG")
    );
  });

  it("should show Cyberpunk 2077 information when requested with alias", () => {
    // Create context with args
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["cp77"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify response
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Cyberpunk 2077")
    );
  });

  it("should show an error message when game is not found", () => {
    // Create context with non-existent game
    const context = {
      client: mockClient,
      channel: "#testchannel",
      args: ["minecraft"],
      userstate: { username: "testuser" },
    };

    // Execute the command
    gameCommand.execute(context as any);

    // Verify error message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Game not found")
    );
  });
});

