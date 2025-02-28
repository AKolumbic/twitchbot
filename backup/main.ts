import { configureBot } from "./src/configure-bot";

// Configure and start the Twitch bot client
const bot = configureBot();

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("Disconnecting from Twitch...");
  bot.disconnect();
  process.exit(0);
});

console.log("Bot is starting up...");
