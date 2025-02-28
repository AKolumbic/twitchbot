import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ModerationService } from "../../services/moderation.service.js";
import { Client, Userstate } from "tmi.js";
import { MODERATION_CONFIG } from "../../config.js";

// We'll use the actual config instead of mocking it
const ACTUAL_BANNED_WORDS = MODERATION_CONFIG.BANNED_WORDS;

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
});

