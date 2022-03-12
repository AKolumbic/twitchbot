import { Client, Userstate } from 'tmi.js';
import { rollFormula } from '../utilities/dice-roll';
import { rollDice, determineCampaign, executeEasterEgg, moderateChat, getCharacterSheet } from "../utilities/index";
import { easterEggTrigger, dynamicDiceRegEx, easterEggUser, channels } from '../secrets';

export function executeCommand(
  client: Client,
  message: string,
  target: string,
  userstate: Userstate,
): void {
  const channel = channels[0];
  const chatter = `@${userstate.username}`;
  const command = message.trim().toLowerCase();

  // Earliest Exit Point
  if (channel === chatter && command === '!info') {
    client.say(channel,
      `DROSSBOT: Thanks for watching! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.\n
      If you'd like to know more, type !commands in chat!`
    )
    return;
  } else if (channel === chatter) { return; }

  // Check for banned words
  moderateChat(command, client, channel, userstate);

  // Have some fun
  if (chatter.toLowerCase() === easterEggTrigger) {
    executeEasterEgg(easterEggUser, message);
  }

  // Exit early if not a command
  if (command.charAt(0) !== '!') { return }

  // Dynamic Rolls need to be handled separately.
  const dynamicRoll = command.match(dynamicDiceRegEx);
  if (dynamicRoll) {
    const roll = rollFormula(dynamicRoll[0].split(' ')[1]);
    client.say(channel, `DROSSBOT: ${chatter} rolled a ${roll}`);
    return;
  }

  switch (command) {
    case '!info':
      client.say(channel,
        `DROSSBOT: Thanks for watching, ${chatter}! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.\n
          If you'd like to know more, type !commands in chat!`
      )
      break;

    case '!commands':
      client.say(channel, 'DROSSBOT: Valid Commands: !info, !roll, !campaign, !characterSheet, !socials')
      break;

    case '!roll':
      const roll = rollDice();
      client.say(channel, `DROSSBOT: ${chatter} rolled a ${roll}`);
      break;

    case '!campaign':
      const campaignText = determineCampaign();
      client.say(channel, `DROSSBOT: ${campaignText}`);
      break;

    case '!characterSheet':
      const link = getCharacterSheet();
      client.say(channel, `${link}`);

    case '!socials':
      client.say(channel, `DROSSBOT: You can find me at @drosshole all over the internet`)
      break;

    case '!lurk':
      console.log(`${target} is lurking...`);
      break;

    default:
      client.say(channel, `DROSSBOT: Sorry ${chatter}, ${command} is an invalid command`);
  }

  if (userstate.subscriber === false && rollDice(100) < 10) {
    client.say(channel, `DROSSBOT: Hey ${target}, don't forget to subscribe!`)
  }
}
