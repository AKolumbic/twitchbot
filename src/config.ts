import dotenv from "dotenv";
import { Options } from "tmi.js";

// Load environment variables
dotenv.config();

// Bot configuration
export const BOT_CONFIG = {
  PREFIX: process.env.BOT_PREFIX || "!",
  NAME: process.env.BOT_NAME || "DROSSBOT",
  CHANNELS: (process.env.TWITCH_CHANNELS || "").split(","),
  USERNAME: process.env.TWITCH_USERNAME,
  OAUTH_TOKEN: process.env.TWITCH_OAUTH_TOKEN,
};

// OpenAI Configuration
export const OPENAI_CONFIG = {
  API_KEY: process.env.OPENAI_API_KEY,
  MODEL: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
  MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || "150", 10),
  TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
};

// Twitch client options
export const TWITCH_CLIENT_OPTIONS: Options = {
  options: {
    debug: process.env.NODE_ENV !== "production",
  },
  connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
  },
  identity: {
    username: BOT_CONFIG.USERNAME,
    password: BOT_CONFIG.OAUTH_TOKEN,
  },
  channels: BOT_CONFIG.CHANNELS,
};

// Command permissions
export const COMMAND_PERMISSIONS = {
  BROADCASTER: "broadcaster",
  MODERATOR: "mod",
  VIP: "vip",
  SUBSCRIBER: "subscriber",
  EVERYONE: "everyone",
};

// D&D related configuration
export const DND_CONFIG = {
  CHARACTER_SHEET_BASE_URL:
    "https://www.dndbeyond.com/profile/drosshole/characters/",
};

// Chat moderation
export const MODERATION_CONFIG = {
  BANNED_WORDS: process.env.BANNED_WORDS
    ? process.env.BANNED_WORDS.split(",")
    : [],
  AUTO_TIMEOUT_DURATION: parseInt(
    process.env.AUTO_TIMEOUT_DURATION || "600",
    10
  ), // 10 minutes
};
