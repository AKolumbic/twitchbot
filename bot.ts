import dotenv from 'dotenv';
import tmi, { Options, Userstate, Client } from 'tmi.js';
import { executeCommand } from './utilities/execute-command';

// Configure Environment Variables
dotenv.config();

// Define configuration options
const opts: Options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.PASSWORD
  },
  channels: [ process.env.CHANNEL || '' ]
};

// Create a client with our options
const client: Client = new tmi.client(opts);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target: string, userstate: Userstate, msg: string, self: boolean) {
  console.log('Message Handler Args: ', { target, userstate, msg, self });
  // Ignore messages from the bot
  if (self) { return; }
  // Remove whitespace from chat message
  const commandName = msg.trim();
  // If the command is known, let's execute it
  executeCommand(client, commandName, target, process.env.CHANNEL || 'drosshole');
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr} on port:${port}`);
}