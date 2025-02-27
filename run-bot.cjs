// This is a CommonJS wrapper to run the bot
// It uses the child_process module to execute the ES module
const { spawn } = require("child_process");

console.log("Starting the Twitch bot...");

// Run the ES module with proper flags
const bot = spawn(
  "node",
  ["--experimental-specifier-resolution=node", "dist/main.js"],
  {
    stdio: "inherit",
  }
);

// Handle process events
bot.on("error", (err) => {
  console.error("Failed to start bot process:", err);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("Stopping the bot...");
  bot.kill("SIGINT");
  process.exit(0);
});

