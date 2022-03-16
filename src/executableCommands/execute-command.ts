import { Client, Userstate } from 'tmi.js';
import { rollDice, moderateChat } from '../utilities/index';
import { username } from '../../secrets';
import {
  executeBasicCommands,
  executeRollCommands,
  executeEasterEggs
} from '.';

export function executeCommand(
  channel: string,
  chatbot: Client,
  message: string,
  target: string,
  userstate: Userstate,
): void {
  const chatter = `@${userstate.username}`;
  const command = message.trim().toLowerCase();

  // Check message for banned words and inform the chatter that their language is unacceptable.
  moderateChat(command, chatbot, channel, userstate);

  // Have some fun.
  executeEasterEggs(chatter, chatbot, command, channel);

  // Exit early if not a command.
  if (command.charAt(0) !== '!') { return }

  // Roll commands.
  if (command.split(' ')[0] === '!roll') {
    executeRollCommands(command, chatter, chatbot);
    return;
  }

  // Single-word commands.
  executeBasicCommands(command, channel, chatbot, chatter);
}
