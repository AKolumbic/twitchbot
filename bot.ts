require('dotenv').config()
const tmi = require('tmi.js');
import { executeCommand } from './utilities/execute-command';

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
  // Log context
  console.log('onMessageHandler context: ', context);
  // Ignore messages from the bot
  if (self) { return; }
  // Remove whitespace from chat message
  const commandName = msg.trim();
  // If the command is known, let's execute it
  executeCommand(client, commandName, target);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}