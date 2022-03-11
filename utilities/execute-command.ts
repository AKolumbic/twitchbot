import { rollDice, determineCampaign } from "./index";

export function executeCommand(
  client: any,
  commandName: string,
  target: string
): void {
  switch (commandName) {
    case '!roll':
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
    case '!campaign':
      const campaignText = determineCampaign();
      client.say(campaignText);
    case '!lurk':
      console.log(`${target} is lurking...`);
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}