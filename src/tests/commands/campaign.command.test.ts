import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { CampaignCommand } from "../../commands/campaign.command.js";
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

describe("CampaignCommand", () => {
  let campaignCommand: CampaignCommand;
  let mockClient: any;
  let mockContext: CommandContext;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a new instance of the command for each test
    campaignCommand = new CampaignCommand();

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
      message: "!campaign",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isSubscriber: false,
      isVIP: false,
    };
  });

  it("should have correct command options", () => {
    expect(campaignCommand.options.name).toBe("campaign");
    expect(campaignCommand.options.permission).toBe("everyone");
    expect(campaignCommand.options.aliases).toContain("campaigns");
  });

  it("should list all campaigns when no specific campaign is requested", () => {
    // Execute with empty args
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with a list of all campaigns
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Current campaigns:")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Stolen Fate")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hometown Heroes")
    );
  });

  it("should provide details for Stolen Fate campaign when requested", () => {
    // Set up the args to request the Stolen Fate campaign
    mockContext.args = ["stolen", "fate"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Stolen Fate
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Stolen Fate")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Pathfinder 2e")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Gilbert Goldgrin")
    );
  });

  it("should provide details for Hometown Heroes campaign when requested", () => {
    // Set up the args to request the Hometown Heroes campaign
    mockContext.args = ["hometown", "heroes"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Hometown Heroes
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hometown Heroes")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("D&D")
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Brodi Dankweed")
    );
  });

  it("should match Stolen Fate campaign when 'pathfinder' is mentioned", () => {
    // Set up the args to request by system
    mockContext.args = ["pathfinder"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Stolen Fate
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Stolen Fate")
    );
  });

  it("should match Hometown Heroes campaign when 'dnd' is mentioned", () => {
    // Set up the args to request by system
    mockContext.args = ["dnd"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Hometown Heroes
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hometown Heroes")
    );
  });

  it("should provide details for campaigns when looking up by exact key", () => {
    // Set up the args to request using the exact key
    mockContext.args = ["stolen-fate"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Stolen Fate
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Stolen Fate")
    );

    // Now test with the other campaign key
    mockContext.args = ["hometown-heroes"];
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with details about Hometown Heroes
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Hometown Heroes")
    );
  });

  it("should provide error message when an unknown campaign is requested", () => {
    // Set up the args with an unknown campaign name
    mockContext.args = ["unknown", "campaign"];

    // Execute the command
    campaignCommand.execute(mockContext);

    // Check that the client.say method was called with an error message
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("Campaign not found")
    );
  });
});

