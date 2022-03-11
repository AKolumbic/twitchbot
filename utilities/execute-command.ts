import { rollDice } from "./dice-roll";

export function executeCommand(
  client: any,
  commandName: string,
  target: string
): void {
  switch (commandName) {
    case '!roll':
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}