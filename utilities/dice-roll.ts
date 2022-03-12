import { Dice } from "../types";

// Function called when the "roll" command is issued
export function rollDice(dice: Dice) {
  return Math.floor(Math.random() * dice) + 1;
};

export function rollFormula(
  formula: string
): string {
  const numberOfRolls: number = Number(formula.split(' ')[0].split('d')[0]);
  const dice: Dice = Number(formula.split(' ')[0].split('d')[0]) as Dice;

  const results = Array(numberOfRolls).fill(null).map(() => {
    return rollDice(dice)
  });

  const stringifiedResults = results.join(", ")

  const total = results.reduce((x, y) => {
    return x + y;
  }, 0);

  return `${stringifiedResults} for a total of ${total}`;
};
