import { Dice } from "../types";

const dice: Dice[] = [20, 4, 6, 8, 10, 12, 100];

// Function called when the "roll" command is issued
export function rollDice(die?: Dice) {
  if (!die) {
    return Math.floor(Math.random() * dice[0]) + 1;
  }

  return Math.floor(Math.random() * die) + 1;
};

export function rollFormula(
  formula: string
): string {
  const numberOfRolls: number = Number(formula.split(' ')[0].split('d')[0]);
  const die: Dice = Number(formula.split(' ')[0].split('d')[0]) as Dice;

  const results = Array(numberOfRolls).fill(null).map(() => {
    return Math.floor(Math.random() * die) + 1
  });

  const stringifiedResults = results.join(", ")

  const total = results.reduce((x, y) => {
    return x + y;
  }, 0);

  return `${stringifiedResults} for a total of ${total}`;
};
