import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { ScheduleCommand } from "../../commands/schedule.command.js";
import { CommandContext } from "../../commands/command.interface.js";
import { BOT_CONFIG } from "../../config.js";

// Mock the config
jest.mock("../../config.js", () => ({
  BOT_CONFIG: {
    NAME: "DROSSBOT",
    PREFIX: "!",
  },
}));

describe("ScheduleCommand", () => {
  let scheduleCommand: ScheduleCommand;
  let mockClient: any;
  let context: CommandContext;
  let originalDateToLocaleDateString: any;

  beforeEach(() => {
    // Create a new instance for each test
    scheduleCommand = new ScheduleCommand();

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
      message: "!schedule",
      args: [],
      isBroadcaster: false,
      isModerator: false,
      isVIP: false,
      isSubscriber: false,
    };

    // Store original Date.prototype.toLocaleDateString
    originalDateToLocaleDateString = Date.prototype.toLocaleDateString;

    // Reset any mock calls from previous tests
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original Date.prototype.toLocaleDateString
    Date.prototype.toLocaleDateString = originalDateToLocaleDateString;
  });

  it("should have the correct command options", () => {
    expect(scheduleCommand.options).toEqual({
      name: "schedule",
      description: "Get information about Drosshole's streaming schedule",
      aliases: ["when", "streams"],
      permission: "everyone",
    });
  });

  it("should display the full schedule", () => {
    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called with the correct full schedule
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining(
        "Stream Schedule: Thursday @ 6:00 PM PST: Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin) | Saturday @ 6:00 PM PST: D&D - Hometown Heroes campaign (Brodi Dankweed) | Various weeknights @ 6:00 PM PST: Video Games"
      )
    );
  });

  it("should highlight today's stream if it's Thursday", () => {
    // Mock Date.prototype.toLocaleDateString to return Thursday
    Date.prototype.toLocaleDateString = jest.fn(() => "Thursday");

    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called with the correct schedule and today's highlight
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining(
        "TODAY: Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin) @ 6:00 PM PST"
      )
    );
  });

  it("should highlight today's stream if it's Saturday", () => {
    // Mock Date.prototype.toLocaleDateString to return Saturday
    Date.prototype.toLocaleDateString = jest.fn(() => "Saturday");

    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called with the correct schedule and today's highlight
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining(
        "TODAY: D&D - Hometown Heroes campaign (Brodi Dankweed) @ 6:00 PM PST"
      )
    );
  });

  it("should not highlight today's stream if there isn't one scheduled", () => {
    // Mock Date.prototype.toLocaleDateString to return a day with no stream
    Date.prototype.toLocaleDateString = jest.fn(() => "Sunday");

    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called but without today's highlight
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: Stream Schedule: Thursday @ 6:00 PM PST: Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin) | Saturday @ 6:00 PM PST: D&D - Hometown Heroes campaign (Brodi Dankweed) | Various weeknights @ 6:00 PM PST: Video Games`
    );
    expect(mockClient.say).not.toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("TODAY:")
    );
  });

  it("should handle the case for 'Various weeknights'", () => {
    // Mock Date.prototype.toLocaleDateString to match "Various weeknights" by using a weekday that isn't Thursday or Saturday
    Date.prototype.toLocaleDateString = jest.fn(() => "Monday");

    // Since "Various weeknights" doesn't exactly match a day of the week, it won't be highlighted as today's stream
    // But we still need to ensure the schedule is shown correctly

    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called with the correct schedule
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      `${BOT_CONFIG.NAME}: Stream Schedule: Thursday @ 6:00 PM PST: Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin) | Saturday @ 6:00 PM PST: D&D - Hometown Heroes campaign (Brodi Dankweed) | Various weeknights @ 6:00 PM PST: Video Games`
    );
    // It shouldn't mention today's stream for "Various weeknights" since it doesn't match a specific day
    expect(mockClient.say).not.toHaveBeenCalledWith(
      "#testchannel",
      expect.stringContaining("TODAY:")
    );
  });

  it("should correctly format the schedule message", () => {
    // Execute the command
    scheduleCommand.execute(context);

    // Check that client.say was called with the correct format
    expect(mockClient.say).toHaveBeenCalledWith(
      "#testchannel",
      expect.stringMatching(/^DROSSBOT: Stream Schedule: .+$/)
    );
  });
});

