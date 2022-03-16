import { Client } from 'tmi.js';
import { easterEggTrigger, easterEggUser } from '../../secrets';
import { simulateBattle } from '../utilities/simulate-battleground';

export function executeEasterEggs(
  chatter: string,
  chatbot: Client,
  command: string,
  channel: string
): void {
  if (chatter.toLowerCase() === easterEggTrigger && command.includes('hi')) {
    chatbot.say(channel, `HI ${easterEggUser.toUpperCase()}!!!`);
  }

  if (command === '!simulate battleground' || command === '!wow') {
    chatbot.say(channel, `DROSSBOT: ${simulateBattle()}`)
  }
}
