import { Client } from 'tmi.js';
import { easterEggTrigger, easterEggUser } from '../../secrets';

export function executeEasterEggs(
  chatter: string,
  chatbot: Client,
  command: string,
  channel: string
): void {
  if (chatter.toLowerCase() === easterEggTrigger && command.includes('hi')) {
    chatbot.say(channel, `HI ${easterEggUser.toUpperCase()}!!!`);
  }
}
