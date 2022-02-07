require('dotenv').config()
const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.PASSWORD
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};
// Create a client with our options
const client = new tmi.client(opts);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  // Ignore messages from the bot
  if (self) { return; }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  switch (commandName) {
    case '!dice':
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}