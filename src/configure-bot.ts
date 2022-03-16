import { Options, Client, Userstate } from 'tmi.js';
import _ from 'lodash';

import { executeCommand } from './executableCommands/execute-command';
import { username, password, channels } from '../secrets';

export function configureBot() {
  const channel = channels[0];
  const chatbot = new Client({
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
  chatbot.connect();

  // EVENT HANDLERS
  chatbot.on('connected', (address: string, port: number) => {
    console.log(`** [${new Date(_.now())}]: Connected to ${address} on Port:${port} **`);
    chatbot.say(channel, `DROSSBOT ACTIVATED: type !info in chat to learn more.`);
  });

  chatbot.on('disconnected', (reason: string) => {
    console.log(`[${new Date(_.now())}]: Disconnected: ${reason}`)
  });

  chatbot.on('reconnect', () => {
    console.log(`[${new Date(_.now())}]: Reconnecting...`);
  });

  chatbot.on('message', (
    target: string,
    userstate: Userstate,
    message: string,
    self: boolean
  ) => {
    // Ignore messages from the chatbot
    if (self) { return; }

    executeCommand(
      channel,
      chatbot,
      message,
      target,
      userstate,
    );
  });
}
