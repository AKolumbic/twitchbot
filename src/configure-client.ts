import { Options, Client, Userstate } from 'tmi.js';
import _ from 'lodash';

import { executeCommand } from '../utilities/execute-command';

export function configureClient() {
  // Define configuration options
  const options: Options = {
    options: {
      debug: true
    },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: process.env.BOT_USERNAME,
      password: process.env.PASSWORD
    },
    //@ts-ignore
    channels: [process.env.CHANNEL]
  };

  // Create a client with our options
  const client: Client = new Client(options);

  // Connect to Twitch:
  client.connect();

  // Register our event handlers (defined below)
  // Called every time the bot connects to Twitch chat
  client.on('connected', (address: string, port: number) => {
    console.log(
      `** Twitchbot Connected to ${address} on Port:${port} at ${new Date(_.now())} **`
    );
  });

  // Called every time a message comes in
  client.on('message', (
    target: string,
    userstate: Userstate,
    message: string,
    self: boolean
  ) => {
    // Ignore messages from the bot
    if (self) { return; }

    // Normalize the message
    const command = message.trim().toLowerCase();

    // Exit early if not a command
    if (command.charAt(0) !== '!') { return }

    // Since the message is a command, it gets executed
    executeCommand(
      //@ts-ignore
      process.env.CHANNEL,
      command,
      client,
      target,
      userstate,
    );
  });
}
