import { Client } from 'tmi.js';
import { rollDice, rollFormula } from '../utilities/';
import { channels } from '../../secrets';


export function executeRollCommands(
  command: string,
  chatter: string,
  chatbot: Client
): void {
  const channel = channels[0];
  const dynamicRoll = command.match(/^!roll\s\dd[4|6|8|10|12|20|100]/gm) as RegExpExecArray;
  const roll = rollDice(20);
  const secondRoll = rollDice(20);

  switch (command) {
    case '!roll':
      if (roll === 20) {
        chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll} - CRITICAL ROLL!`);
        break;
      } else if (roll === 1) {
        chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll} - CRITICAL FAIL!`);
        break;
      } else {
        chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll}`);
        break;
      }

    case `${dynamicRoll}`:
      chatbot.say(channel, `DROSSBOT: ${chatter} rolled ${rollFormula(dynamicRoll[0].split(' ')[1])}`);
      break;

    case '!roll advantage':
      const highRoll = roll >= secondRoll ? roll : secondRoll;

      if (highRoll === 20) {
        chatbot.say(channel, `DROSSBOT: CRITICAL ROLL! With advantage, ${chatter} got a ${highRoll}!. Roll Results: (${roll}, ${secondRoll})`);
        break;
      } else if (highRoll === 1) {
        chatbot.say(channel, `DROSSBOT: CRITICAL FAIL! A TRULY MONUMENTAL DISAPPOINTMENT! SERIOUSLY, HOW IS THAT EVEN MATHEMATICALLY POSSIBLE??! With ADVANTAGE, ${chatter} got ${highRoll}! TWICE!`);
        break;
      } else {
        chatbot.say(channel, `DROSSBOT: With advantage, ${chatter} got ${highRoll}. Roll Results: (${roll}, ${secondRoll})`);
        break;
      }

    case '!roll disadvantage':
      const lowroll = roll <= secondRoll ? roll : secondRoll;

      if (lowroll === 20) {
        chatbot.say(channel, `DROSSBOT: CRITICAL ROLL! A TRULY MONUMENTAL ACHIEVMENT! SERIOUSLY, HOW IS THAT EVEN MATHEMATICALLY POSSIBLE??! With DISADVANTAGE, ${chatter} got ${lowroll}! TWICE!`);
        break;
      } else if (lowroll === 1) {
        chatbot.say(channel, `DROSSBOT: CRITICAL FAIL! RNG does NOT like you. With disadvantage, ${chatter} got a ${lowroll}!. Roll Results: (${roll}, ${secondRoll})`);
        break;
      } else {
        chatbot.say(channel, `DROSSBOT: With disadvantage, ${chatter} got ${lowroll}. Roll Results: (${roll}, ${secondRoll})`);
        break;
      }


  }
}
