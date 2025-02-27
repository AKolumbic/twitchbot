// Simple Twitch bot with basic functionality
// Run with: node simple-bot.cjs

require("dotenv").config();
const tmi = require("tmi.js");

// Configuration
const BOT_USERNAME = process.env.TWITCH_USERNAME;
const OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN;
const CHANNEL = process.env.TWITCH_CHANNELS.split(",")[0];
const BOT_NAME = process.env.BOT_NAME || "DROSSBOT";
const PREFIX = process.env.BOT_PREFIX || "!";

// Simulation mode - set to true to run without connecting to Twitch
const SIMULATION_MODE = true;

// Debug output for configuration
console.log("--- Bot Configuration ---");
console.log(`Username: ${BOT_USERNAME}`);
console.log(`Channel: ${CHANNEL}`);
console.log(`Bot Name: ${BOT_NAME}`);
console.log(`Token Length: ${OAUTH_TOKEN?.length || "Not set"}`);
console.log(`Simulation Mode: ${SIMULATION_MODE ? "Yes" : "No"}`);
console.log("------------------------");

// Ensure token is formatted correctly
let formattedToken = OAUTH_TOKEN;
if (formattedToken && !formattedToken.startsWith("oauth:")) {
  formattedToken = `oauth:${formattedToken}`;
  console.log('Added "oauth:" prefix to token');
}

// Create a client
let client;

if (!SIMULATION_MODE) {
  // Real Twitch client
  client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: BOT_USERNAME,
      password: formattedToken,
    },
    channels: [CHANNEL],
  });

  // Connect to Twitch
  client
    .connect()
    .then(() => {
      console.log("Connected to Twitch!");
    })
    .catch((err) => {
      console.error("Error connecting to Twitch:", err);
    });

  // Handle connected event
  client.on("connected", (address, port) => {
    console.log(`Connected to ${address}:${port}`);
    client.say(
      CHANNEL,
      `${BOT_NAME} ACTIVATED: Type !info in chat to learn more.`
    );
  });
} else {
  // Simulated client
  console.log("🛈 Running in simulation mode - not connecting to Twitch");

  // Create a simulated client with just the say method
  client = {
    say: (channel, message) => {
      console.log(`[CHAT/${channel}] ${message}`);
    },
    on: (event, handler) => {
      console.log(`Registered handler for ${event} event`);
    },
  };

  // Simulate connected event
  console.log("Simulated connection to Twitch");
  console.log(
    `[CHAT/${CHANNEL}] ${BOT_NAME} ACTIVATED: Type !info in chat to learn more.`
  );

  // Set up a simple REPL for testing commands
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Enter a command: ",
  });

  console.log("\n🛈 Enter commands to test (e.g., !info, !roll 2d6)\n");
  rl.prompt();

  rl.on("line", (line) => {
    // Simulate a chat message
    const message = line.trim();

    if (message.startsWith(PREFIX)) {
      // Parse the command name and arguments
      const args = message.slice(PREFIX.length).trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();

      // Execute command if it exists
      if (commands[commandName]) {
        console.log(`Executing command: ${commandName}`);
        commands[commandName](`#${CHANNEL}`, { username: BOT_USERNAME }, args);
      } else {
        console.log(`Unknown command: ${commandName}`);
      }
    } else {
      console.log(`Not a command. Commands start with ${PREFIX}`);
    }

    rl.prompt();
  }).on("close", () => {
    console.log("Exiting simulation mode");
    process.exit(0);
  });
}

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

  game: (channel) => {
    client.say(
      channel,
      `${BOT_NAME}: Currently playing games like Helldivers 2, Hearthstone, and occasionally other titles. Type !helldivers for Helldivers 2 tips!`
    );
  },

  helldivers: (channel) => {
    const tips = [
      "Remember to call in ammo drops regularly - running out in the middle of a fight is a quick way to get killed.",
      "The Helldivers' greatest enemy is friendly fire. Keep your distance from teammates and be aware of your firing line.",
      "Democracy is non-negotiable. Bugs, robots and squid alike will fall before liberty.",
      "Coordinated stratagems can turn the tide of battle. Communicate with your team about what you're bringing.",
      "Don't forget your missions! Super Earth demands results, not just dead aliens.",
      "The Reinforce stratagem can bring back dead teammates. Always keep one in your loadout.",
      "Aim for weakpoints: Chargers are vulnerable in their mouth, Bile Titans in their sacs, and Hulks in their back.",
      "Freedom is always worth fighting for. For Super Earth!",
      "When in doubt, call in orbital strikes. Democracy from above!",
      "Teamwork makes the dream work - coordinate with your fellow Helldivers for maximum efficiency.",
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    client.say(channel, `${BOT_NAME}: Helldivers 2 Tip: ${randomTip}`);
  },
};

// Handle messages (only in non-simulation mode)
if (!SIMULATION_MODE) {
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
}

console.log("Simple Twitch bot starting...");

