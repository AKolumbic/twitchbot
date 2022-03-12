import tmi from 'tmi.js';
import { executeCommand } from '../utilities/execute-command';

export function configureClient() {
  // Define configuration options
  const opts: tmi.Options = {
    identity: {
      username: process.env.BOT_USERNAME,
      password: process.env.PASSWORD
    },
    //@ts-ignore
    channels: [ process.env.CHANNEL ]
  };

  // Create a client with our options
  const client: tmi.Client = new tmi.client(opts);
  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  // Connect to Twitch:
  client.connect();

  // Called every time a message comes in
  function onMessageHandler(target: string, userstate: tmi.Userstate, msg: string, self: boolean) {
    // Ignore messages from the bot
    if (self) { return; }
    // Remove whitespace from chat message
    const commandName = msg.trim();
    //@ts-ignore
    // If the command is known, let's execute it
    executeCommand(client, commandName, target, process.env.CHANNEL);
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler(addr: string, port: number) {
    console.log(`* Connected to ${addr} on Port:${port}`);
  }
}
