type Dice = 4 | 6 | 8 | 10 | 12 | 20 | 100;
const dice: Dice[] = [20, 4, 6, 8, 10, 12, 100];

// Function called when the "roll" command is issued
export function rollDice(die?: Dice) {
  if (!die) {
    return Math.floor(Math.random() * dice[0]) + 1;
  }
}

function diceRoll(
  die?: Dice,
  numberOfRolls?: number,
  modifier?: number
): string {
  return `${Math.floor(Math.random() * die) + 1}`;
}