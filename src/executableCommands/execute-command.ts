import { Client, Userstate } from 'tmi.js';
import { moderateChat } from '../utilities/index';
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
  const easterEggExecuted = executeEasterEggs(target, chatbot, command, channel);

  // Exit early if not a command or an easter egg was executed.
  if (command.charAt(0) !== '!' || easterEggExecuted) { return }

  // Roll commands.
  if (command.split(' ')[0] === '!roll') {
    executeRollCommands(command, chatter, chatbot);
    return;
  }

  // Simple commands.
  executeBasicCommands(command, channel, chatbot, chatter);
}
