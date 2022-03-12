import { Options, Client, Userstate } from 'tmi.js';
import _ from 'lodash';

import { executeCommand } from './execute-command';

export function configureClient() {
  const client: Client = new Client({
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
  } as Options);

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

    // Since the message is a command, it gets executed
    executeCommand(
      //@ts-ignore
      process.env.CHANNEL,
      client,
      message,
      target,
      userstate,
    );
  });
}
