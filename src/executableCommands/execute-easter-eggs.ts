import { Client } from 'tmi.js';
import { easterEggTriggers, easterEggUser } from '../../secrets';
import { simulateBattle, rickRoll } from '../utilities';

export function executeEasterEggs(
  target: string,
  chatbot: Client,
  command: string,
  channel: string,
  messageID: string
): boolean {
  let easterEggExecuted = false;

  if (target.toLowerCase() === easterEggTriggers[0] && command.includes('hi')) {
    easterEggExecuted = true;
    chatbot.say(channel, `HI ${easterEggUser.toUpperCase()}!!!`);
  }

  if (command === '!simulate battleground' || command === '!wow') {
    easterEggExecuted = true;
    chatbot.say(channel, `DROSSBOT: ${simulateBattle()}`)
  }

  if (rickRoll(command, chatbot, channel, messageID)) { easterEggExecuted = true };

  return easterEggExecuted;
}
