// Simple Twitch bot with basic functionality
// Run with: node simple-bot.js

import "dotenv/config";
import tmi from "tmi.js";

// Configuration
const BOT_USERNAME = process.env.TWITCH_USERNAME;
const OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN;
const CHANNEL = process.env.TWITCH_CHANNELS.split(",")[0];
const BOT_NAME = process.env.BOT_NAME || "DROSSBOT";
const PREFIX = process.env.BOT_PREFIX || "!";

// Create a client with our options
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN,
  },
  channels: [CHANNEL],
});

// Basic commands
const commands = {
  info: (channel, tags) => {
    client.say(
      channel,
      `${BOT_NAME}: Welcome to the channel ${tags.username}! I stream both tabletop RPGs (Pathfinder 2e and D&D) and video games like Helldivers 2 and Hearthstone. Type !commands to see all commands.`
    );
  },

  commands: (channel) => {
    client.say(
      channel,
      `${BOT_NAME}: Available commands: !info, !campaign, !character, !roll, !schedule, !game`
    );
  },

  campaign: (channel) => {
    client.say(
      channel,
      `${BOT_NAME}: Current campaigns: Stolen Fate (Pathfinder 2e) - Thursdays | Hometown Heroes (D&D) - Saturdays. Use !campaign <name> for details.`
    );
  },

  character: (channel) => {
    client.say(
      channel,
      `${BOT_NAME}: Current characters: Gilbert Goldgrin (celebrity polymath bard halfling) in Stolen Fate | Brodi Dankweed (teenage tortle druid) in Hometown Heroes`
    );
  },

  roll: (channel, tags, args) => {
    // Simple dice roll - format: !roll 2d6
    if (args.length < 1) {
      client.say(
        channel,
        `${BOT_NAME}: Please specify dice to roll (e.g., !roll 2d6)`
      );
      return;
    }

    const dicePattern = /^(\d+)d(\d+)$/i;
    const match = args[0].match(dicePattern);

    if (!match) {
      client.say(
        channel,
        `${BOT_NAME}: Invalid dice format. Use format like "2d6" for two six-sided dice.`
      );
      return;
    }

    const numDice = parseInt(match[1]);
    const sides = parseInt(match[2]);

    if (numDice > 20) {
      client.say(channel, `${BOT_NAME}: Sorry, maximum 20 dice allowed.`);
      return;
    }

    let results = [];
    let total = 0;

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      results.push(roll);
      total += roll;
    }

    client.say(
      channel,
      `${BOT_NAME}: @${tags.username} rolled ${args[0]}: [${results.join(
        ", "
      )}] = ${total}`
    );
  },

  schedule: (channel) => {
    client.say(
      channel,
      `${BOT_NAME}: Stream Schedule: ▶ Tue & Thu 7PM ET: Pathfinder 2e "Stolen Fate" campaign ▶ Sat 2PM ET: D&D "Hometown Heroes" campaign ▶ Wed & Sun: Video game streams (Helldivers 2, Hearthstone, etc.)`
    );
  },
};

// Connect to Twitch
client
  .connect()
  .then(() => {
    console.log("Connected to Twitch!");
  })
  .catch((err) => {
    console.error("Error connecting to Twitch:", err);
  });

// Handle messages
client.on("message", (channel, tags, message, self) => {
  // Ignore messages from the bot itself
  if (self) return;

  // Check if message is a command (starts with prefix)
  if (!message.startsWith(PREFIX)) return;

  // Parse the command name and arguments
  const args = message.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  // Execute command if it exists
  if (commands[commandName]) {
    console.log(`Executing command: ${commandName}`);
    commands[commandName](channel, tags, args);
  }
});

// Handle connected event
client.on("connected", (address, port) => {
  console.log(`Connected to ${address}:${port}`);
  client.say(
    CHANNEL,
    `${BOT_NAME} ACTIVATED: Type !info in chat to learn more.`
  );
});

console.log("Simple Twitch bot starting...");

