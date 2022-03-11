// require('dotenv').config();
import dotenv from 'dotenv';
import tmi, { Options } from 'tmi.js';
import { executeCommand } from './utilities/execute-command';

// Configure Environment Variables
dotenv.config();

// Define configuration options
const opts: Options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.PASSWORD
  },
  channels: [
    'drosshole'
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
function onMessageHandler(target: string, context: any, msg: string, self: any) {
  console.log('Message Handler Args: ', { target, context, msg, self });
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
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}