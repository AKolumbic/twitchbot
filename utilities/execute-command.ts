import { Client, Userstate } from 'tmi.js';
import { rollDice, determineCampaign } from "./index";

export function executeCommand(
  client: Client,
  commandName: string,
  target: string,
  channel: string,
  userstate: Userstate
): void {
  switch (commandName.toLocaleLowerCase()) {
    case '!help':
      client.say(channel, '')
      break;
    case '!roll':
      const roll = rollDice();
      client.say(channel, `${target} rolled a ${roll}`);
      break;
    case '!campaign':
      const campaignText = determineCampaign();
      client.say(channel, campaignText);
      break;
    case '!lurk':
      console.log(`${target} is lurking...`);
      break;
    case '!twitter' || '!youtube' || '!instagram' || '!discord':
      client.say(channel, `Hit me up @drosshole on ${commandName.substring(1)}`)
      break;
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}
