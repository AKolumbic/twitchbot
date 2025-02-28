import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ModerationService } from "../../services/moderation.service.js";
import { Client, Userstate } from "tmi.js";
import { MODERATION_CONFIG } from "../../config.js";

// We'll use the actual config instead of mocking it
const ACTUAL_BANNED_WORDS = MODERATION_CONFIG.BANNED_WORDS;

// Mock console.log and console.error to prevent test output pollution
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("ModerationService", () => {
  let moderationService: ModerationService;
  let mockClient: Client;
  let mockUserstate: Userstate;
  let mockBroadcasterUserstate: Userstate;
  let mockModUserstate: Userstate;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a new instance for each test
    moderationService = new ModerationService();

    // Setup mock client
    mockClient = {
      timeout: jest.fn().mockResolvedValue([] as never),
      deletemessage: jest.fn().mockResolvedValue([] as never),
      say: jest.fn().mockResolvedValue([] as never),
    } as unknown as Client;

    // Setup user states
    mockUserstate = {
      username: "testuser",
      "user-id": "12345",
      badges: {},
      mod: false,
    } as Userstate;

    mockBroadcasterUserstate = {
      username: "broadcaster",
      "user-id": "67890",
      badges: { broadcaster: "1" },
      mod: false,
    } as Userstate;

    mockModUserstate = {
      username: "moduser",
      "user-id": "54321",
      badges: {},
      mod: true,
    } as Userstate;
  });

  it("should have banned words from config", () => {
    const bannedWords = moderationService.getBannedWords();
    // Check that we have the same number of banned words
    expect(bannedWords.length).toBe(ACTUAL_BANNED_WORDS.length);
    // Check that all actual banned words are in the service's list
    ACTUAL_BANNED_WORDS.forEach((word) => {
      expect(bannedWords).toContain(word);
    });
  });

  it("should add new banned words", () => {
    const newWord = "testbadword";
    moderationService.addBannedWord(newWord);
    const words = moderationService.getBannedWords();
    expect(words).toContain(newWord);
  });

  it("should not add duplicate banned words", () => {
    const word = "duplicatebadword";
    moderationService.addBannedWord(word);
    const initialCount = moderationService.getBannedWords().length;

    // Try to add the same word again
    moderationService.addBannedWord(word);
    const finalCount = moderationService.getBannedWords().length;

    // Count should remain the same
    expect(finalCount).toBe(initialCount);

    // And the word should be in the list exactly once
    const instances = moderationService
      .getBannedWords()
      .filter((w) => w === word).length;
    expect(instances).toBe(1);
  });

  it("should add banned words case-insensitively", () => {
    const word = "MixedCaseWord";
    moderationService.addBannedWord(word);
    const words = moderationService.getBannedWords();
    // Should store lowercase
    expect(words).toContain(word.toLowerCase());
    // Should not contain the original mixed case
    expect(words).not.toContain(word);
  });

  it("should remove banned words", () => {
    // Use the first actual banned word
    const wordToRemove = ACTUAL_BANNED_WORDS[0];
    const result = moderationService.removeBannedWord(wordToRemove);
    expect(result).toBe(true);

    const words = moderationService.getBannedWords();
    expect(words).not.toContain(wordToRemove);
  });

  it("should not remove non-existent banned words", () => {
    const result = moderationService.removeBannedWord(
      "nonexistent-word-that-is-not-banned"
    );
    expect(result).toBe(false);
  });

  it("should handle case-insensitive word removal", () => {
    // Add a word in lowercase
    const word = "casesensitiveword";
    moderationService.addBannedWord(word);

    // Remove it using mixed case
    const result = moderationService.removeBannedWord("CaseSensitiveWord");
    expect(result).toBe(true);

    // Word should be gone
    expect(moderationService.getBannedWords()).not.toContain(word);
  });

  it("should moderate messages with banned words", () => {
    // Mock the private takeModAction method to avoid actual calls
    const takeModActionSpy = jest
      .spyOn(moderationService as any, "takeModAction")
      .mockImplementation(() => {});

    // Use the first actual banned word
    const bannedWord = ACTUAL_BANNED_WORDS[0];
    const result = moderationService.moderateMessage(
      `This message contains ${bannedWord} which is bad`,
      mockClient,
      "#channel",
      mockUserstate
    );

    expect(takeModActionSpy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should moderate messages with banned words regardless of case", () => {
    // Mock the private takeModAction method to avoid actual calls
    const takeModActionSpy = jest
      .spyOn(moderationService as any, "takeModAction")
      .mockImplementation(() => {});

    // Use the first actual banned word with mixed case
    const bannedWord = ACTUAL_BANNED_WORDS[0].toUpperCase();
    const result = moderationService.moderateMessage(
      `This message contains ${bannedWord} which is bad`,
      mockClient,
      "#channel",
      mockUserstate
    );

    expect(takeModActionSpy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should not moderate broadcaster messages", () => {
    // Use the first actual banned word
    const bannedWord = ACTUAL_BANNED_WORDS[0];
    const result = moderationService.moderateMessage(
      `This message contains ${bannedWord}`,
      mockClient,
      "#channel",
      mockBroadcasterUserstate
    );

    expect(result).toBe(false);
    expect(mockClient.deletemessage).not.toHaveBeenCalled();
    expect(mockClient.timeout).not.toHaveBeenCalled();
  });

  it("should not moderate moderator messages", () => {
    // Use the first actual banned word
    const bannedWord = ACTUAL_BANNED_WORDS[0];
    const result = moderationService.moderateMessage(
      `This message contains ${bannedWord}`,
      mockClient,
      "#channel",
      mockModUserstate
    );

    expect(result).toBe(false);
    expect(mockClient.deletemessage).not.toHaveBeenCalled();
    expect(mockClient.timeout).not.toHaveBeenCalled();
  });

  it("should not moderate clean messages", () => {
    const result = moderationService.moderateMessage(
      "This is a clean message",
      mockClient,
      "#channel",
      mockUserstate
    );

    expect(result).toBe(false);
    expect(mockClient.deletemessage).not.toHaveBeenCalled();
    expect(mockClient.timeout).not.toHaveBeenCalled();
  });

  // Test the private takeModAction method directly
  it("should take moderation actions when banned words are detected", () => {
    // Access and call the private method directly
    const takeModAction = (moderationService as any).takeModAction.bind(
      moderationService
    );

    // Call with a message ID
    takeModAction(mockClient, "#channel", mockUserstate, "message-123");

    // Verify all actions were taken
    expect(mockClient.deletemessage).toHaveBeenCalledWith(
      "#channel",
      "message-123"
    );
    expect(mockClient.timeout).toHaveBeenCalledWith(
      "#channel",
      "testuser",
      MODERATION_CONFIG.AUTO_TIMEOUT_DURATION,
      "Using banned words"
    );
    expect(mockClient.say).toHaveBeenCalledWith(
      "#channel",
      expect.stringContaining("@testuser")
    );
  });

  it("should take moderation actions without message ID", () => {
    // Access and call the private method directly
    const takeModAction = (moderationService as any).takeModAction.bind(
      moderationService
    );

    // Call without a message ID
    takeModAction(mockClient, "#channel", mockUserstate);

    // Verify the appropriate actions were taken
    expect(mockClient.deletemessage).not.toHaveBeenCalled();
    expect(mockClient.timeout).toHaveBeenCalled();
    expect(mockClient.say).toHaveBeenCalled();
  });

  it("should handle errors when timing out users", async () => {
    // Mock client.timeout to throw an error
    (
      mockClient.timeout as jest.MockedFunction<() => Promise<unknown>>
    ).mockRejectedValueOnce(new Error("Timeout error"));

    // Access and call the private method directly
    const takeModAction = (moderationService as any).takeModAction.bind(
      moderationService
    );

    // Call the method
    await takeModAction(mockClient, "#channel", mockUserstate);

    // Wait for promises to resolve
    await new Promise(process.nextTick);

    // Verify console.error was called
    expect(console.error).toHaveBeenCalledWith(
      "Error timing out user:",
      expect.any(Object)
    );
  });

  it("should handle errors when deleting messages", async () => {
    // Mock client.deletemessage to throw an error
    (
      mockClient.deletemessage as jest.MockedFunction<() => Promise<unknown>>
    ).mockRejectedValueOnce(new Error("Delete error"));

    // Access and call the private method directly
    const takeModAction = (moderationService as any).takeModAction.bind(
      moderationService
    );

    // Call the method with a message ID
    await takeModAction(mockClient, "#channel", mockUserstate, "message-123");

    // Wait for promises to resolve
    await new Promise(process.nextTick);

    // Verify console.error was called
    expect(console.error).toHaveBeenCalledWith(
      "Error deleting message:",
      expect.any(Object)
    );
  });
});

