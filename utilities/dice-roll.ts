const dice: AppTypes.Dice[] = [20, 4, 6, 8, 10, 12, 100];

// Function called when the "roll" command is issued
export function rollDice() {
    return Math.floor(Math.random() * dice[0]) + 1;
}