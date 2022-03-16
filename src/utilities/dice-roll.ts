type Dice = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export function rollDice(dice: Dice) {
  return Math.floor(Math.random() * dice) + 1;
};

export function rollFormula(
  formula: string
): string {
  const numberOfRolls: number = Number(formula.split(' ')[0].split('d')[0]);
  const dice: Dice = Number(formula.split(' ')[0].split('d')[1]) as Dice;

  const results = Array(numberOfRolls).fill(null).map(() => {
    return rollDice(dice)
  });

  const total = results.reduce((x, y) => {
    return x + y;
  }, 0);

  return `${results.join(', ')} for a total of ${total}`;
};
