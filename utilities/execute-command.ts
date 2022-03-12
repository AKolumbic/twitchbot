import { Client, Userstate } from 'tmi.js';
import { rollDice, determineCampaign } from "./index";

export function executeCommand(
  channel: string,
  command: string,
  client: Client,
  target: string,
  userstate: Userstate,
): void {
  if (userstate.subscriber === false && rollDice(100) > 10) {
    client.say(channel, `Hey, ${target}`)
  }

  switch (command) {
    case '!help':
      client.say(channel, '')
      break;
    case '!roll':
      const roll = rollDice();
      client.say(channel, `${userstate.username} rolled a ${roll}`);
      break;
    case '!campaign':
      const campaignText = determineCampaign();
      client.say(channel, campaignText);
      break;
    case '!lurk':
      console.log(`${target} is lurking...`);
      break;
    case '!twitter' || '!youtube' || '!instagram' || '!discord':
      client.say(channel, `Hit me up @drosshole on ${command.substring(1)}`)
      break;
    default:
      console.log(`* Unknown command ${command}`);
  }
}
