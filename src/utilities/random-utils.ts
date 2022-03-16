/**
 * returns a random number between minimum and maximum range
 * @param min - minimum allowed value
 * @param max - maximum allowed value
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}


/**
 * randomly selects a number to be used as an index position to make
 * a random selection from the array parameter
 * @param inputArr - array that requires a random element selected from it
 */
export const getRandom = (inputArr: any[]) => {
  const max = inputArr.length - 1
  const rng = random(0, max)
  return inputArr[rng]
}
