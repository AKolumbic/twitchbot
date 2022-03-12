import { Dice } from "../types";

const dice: Dice[] = [20, 4, 6, 8, 10, 12, 100];

// Function called when the "roll" command is issued
export function rollDice(die?: Dice) {
  if (!die) {
    return Math.floor(Math.random() * dice[0]) + 1;
  }

  return Math.floor(Math.random() * die) + 1;
}

export function rollFormula(
  formula: string
): string {
  console.log({
    formula,
    roll: formula.split(' ')
  })
  return `${Math.floor(Math.random() * 20) + 1}`;
}
