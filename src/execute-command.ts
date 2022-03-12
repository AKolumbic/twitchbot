import { Client, Userstate } from 'tmi.js';
import { rollDice, determineCampaign } from "../utilities/index";

export function executeCommand(
  channel: string,
  command: string,
  client: Client,
  target: string,
  userstate: Userstate,
): void {
  if (userstate.subscriber === false && rollDice(100) < 10) {
    client.say(channel, `DROSSBOT: Hey ${target}, don't forget to subscribe!`)
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
}
