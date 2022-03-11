import { rollDice, determineCampaign, sayMyName } from "./index";

export function executeCommand(
  client: any,
  commandName: string,
  target: string
): void {
  sayMyName('Heisenberg');
  switch (commandName.toLocaleLowerCase()) {
    case '!help':
      client.say()
    case '!roll':
      const roll = rollDice();
      client.say(`${target} rolled a ${roll}`);
    case '!campaign':
      const campaignText = determineCampaign();
      client.say(campaignText);
    case '!lurk':
      console.log(`${target} is lurking...`);
    case '!twitter' || '!youtube' || '!instagram' || '!discord':
      client.say(`Hit me up @drosshole on ${commandName.substring(1)}`)
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}