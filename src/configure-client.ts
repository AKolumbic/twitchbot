import { Options, Client, Userstate } from 'tmi.js';
import _ from 'lodash';

import { executeCommand } from './execute-command';
import { username, password, channels } from '../secrets';

export function configureClient() {
  const client = new Client({
    options: {
      debug: true
    },
    connection: {
      reconnect: true,
      secure: true,
      timeout: 180000,
      reconnectDecay: 1.4,
      reconnectInterval: 1000,
    },
    identity: {
      username,
      password
    },
    channels
  } as Options);

  // Connect to Twitch:
  client.connect();

  // Called every time the bot connects to Twitch chat
  client.on('connected', (address: string, port: number) => {
    console.log(
      `** Connected to ${address} on Port:${port} at ${new Date(_.now())} **`
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

    executeCommand(
      client,
      message,
      target,
      userstate,
    );
  });

  client.on('disconnected', (reason: string) => {
    console.log(`Disconnected: ${reason}`)
  })

  client.on('reconnect', () => {
    console.log(`[${new Date(_.now())}]: Reconnecting...`);
  })
}
