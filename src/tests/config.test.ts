import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";

// Store the original environment variables
const originalEnv = { ...process.env };

// Mock the dotenv module
jest.mock("dotenv", () => ({
  config: jest.fn(() => ({ parsed: {} })),
}));

describe("Config", () => {
  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    jest.resetModules();
  });

  afterEach(() => {
    // Restore environment variables
    process.env = { ...originalEnv };
  });

  it("should use default values when environment variables are not set", async () => {
    // Clear relevant environment variables
    delete process.env.BOT_PREFIX;
    delete process.env.BOT_NAME;
    delete process.env.TWITCH_CHANNELS;
    delete process.env.OPENAI_MODEL;
    delete process.env.OPENAI_MAX_TOKENS;
    delete process.env.OPENAI_TEMPERATURE;
    delete process.env.BANNED_WORDS;
    delete process.env.AUTO_TIMEOUT_DURATION;

    // Import config after modifying environment variables
    const config = await import("../config.js");
    const { BOT_CONFIG, OPENAI_CONFIG, MODERATION_CONFIG } = config;

    // Test default values
    expect(BOT_CONFIG.PREFIX).toBe("!");
    expect(BOT_CONFIG.NAME).toBe("DROSSBOT");
    expect(BOT_CONFIG.CHANNELS).toEqual([""]);
    expect(OPENAI_CONFIG.MODEL).toBe("gpt-3.5-turbo");
    expect(OPENAI_CONFIG.MAX_TOKENS).toBe(150);
    expect(OPENAI_CONFIG.TEMPERATURE).toBe(0.7);
    expect(MODERATION_CONFIG.BANNED_WORDS).toEqual([]);
    expect(MODERATION_CONFIG.AUTO_TIMEOUT_DURATION).toBe(600);
  });

  it("should use environment variables when set", async () => {
    // Set environment variables
    process.env.BOT_PREFIX = "$";
    process.env.BOT_NAME = "TESTBOT";
    process.env.TWITCH_CHANNELS = "channel1,channel2";
    process.env.OPENAI_MODEL = "gpt-4";
    process.env.OPENAI_MAX_TOKENS = "200";
    process.env.OPENAI_TEMPERATURE = "0.8";
    process.env.BANNED_WORDS = "bad,worse,worst";
    process.env.AUTO_TIMEOUT_DURATION = "300";

    // Import config after modifying environment variables
    const config = await import("../config.js");
    const {
      BOT_CONFIG,
      OPENAI_CONFIG,
      MODERATION_CONFIG,
      TWITCH_CLIENT_OPTIONS,
    } = config;

    // Test values from environment variables
    expect(BOT_CONFIG.PREFIX).toBe("$");
    expect(BOT_CONFIG.NAME).toBe("TESTBOT");
    expect(BOT_CONFIG.CHANNELS).toEqual(["channel1", "channel2"]);
    expect(OPENAI_CONFIG.MODEL).toBe("gpt-4");
    expect(OPENAI_CONFIG.MAX_TOKENS).toBe(200);
    expect(OPENAI_CONFIG.TEMPERATURE).toBe(0.8);
    expect(MODERATION_CONFIG.BANNED_WORDS).toEqual(["bad", "worse", "worst"]);
    expect(MODERATION_CONFIG.AUTO_TIMEOUT_DURATION).toBe(300);

    // Test TWITCH_CLIENT_OPTIONS uses the BOT_CONFIG values
    expect(TWITCH_CLIENT_OPTIONS?.identity?.username).toBe(BOT_CONFIG.USERNAME);
    expect(TWITCH_CLIENT_OPTIONS?.channels).toEqual(BOT_CONFIG.CHANNELS);
  });

  it("should handle production vs development environments", async () => {
    // Test production environment
    process.env.NODE_ENV = "production";
    let config = await import("../config.js");
    let { TWITCH_CLIENT_OPTIONS } = config;

    // Use optional chaining to handle possibly undefined properties
    expect(TWITCH_CLIENT_OPTIONS?.options?.debug).toBe(false);

    // Reset modules to reload config
    jest.resetModules();

    // Test development environment
    process.env.NODE_ENV = "development";
    config = await import("../config.js");
    ({ TWITCH_CLIENT_OPTIONS } = config);
    expect(TWITCH_CLIENT_OPTIONS?.options?.debug).toBe(true);
  });
});

