import { Client, Userstate } from 'tmi.js';
import { rollFormula } from '../utilities/dice-roll';
import { rollDice, determineCampaign, executeEasterEgg } from "../utilities/index";
import { easterEggTrigger, dynamicDiceRegEx, easterEggUser } from '../secrets';

export function executeCommand(
  channel: string,
  client: Client,
  message: string,
  target: string,
  userstate: Userstate,
): void {
  // Have some fun
  if (userstate.username.toLowerCase() === easterEggTrigger) {
    executeEasterEgg(easterEggUser, message);
  }

  // Normalize the message
  const command = message.trim().toLowerCase();

  // Exit early if not a command
  if (command.charAt(0) !== '!') { return }

  // Dynamic Rolls need to be handled separately.
  const dynamicRoll = command.match(dynamicDiceRegEx);
  if (dynamicRoll) {
    const roll = rollFormula(dynamicRoll[0].split(' ')[1]);
    client.say(channel, `DROSSBOT: ${userstate.username} rolled a ${roll}`);
    return;
  }

  switch (command) {
    case '!info':
      if (channel === target) {
        client.say(channel,
          `DROSSBOT: Thanks for watching! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.\n
          If you'd like to know more, type !commands in chat!`
        )
      } else {
        client.say(channel,
          `DROSSBOT: Thanks for watching, ${userstate.username}! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.\n
          If you'd like to know more, type !commands in chat!`
        )
      }
      break;

    case '!commands':
      client.say(channel, 'DROSSBOT: Valid Commands: !info, !roll, !campaign, !characterSheet, !socials')
      break;

    case '!roll':
      const roll = rollDice();
      client.say(channel, `DROSSBOT: ${userstate.username} rolled a ${roll}`);
      break;

    case '!campaign':
      const campaignText = determineCampaign();
      client.say(channel, `DROSSBOT: ${campaignText}`);
      break;

    case '!lurk':
      console.log(`${target} is lurking...`);
      break;

    case '!socials':
      client.say(channel, `DROSSBOT: You can find me at @drosshole all over the internet`)
      break;

    default:
      client.say(channel, `DROSSBOT: Sorry ${userstate.username}, ${command} is an invalid command`);
  }

  if (userstate.subscriber === false && rollDice(100) < 10) {
    client.say(channel, `DROSSBOT: Hey ${target}, don't forget to subscribe!`)
  }
}
