"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.random = void 0;
/**
 * returns a random number between minimum and maximum range
 * @param min - minimum allowed value
 * @param max - maximum allowed value
 */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.random = random;
/**
 * randomly selects a number to be used as an index position to make
 * a random selection from the array parameter
 * @param inputArr - array that requires a random element selected from it
 */
const getRandom = (inputArr) => {
    const max = inputArr.length - 1;
    const rng = (0, exports.random)(0, max);
    return inputArr[rng];
};
exports.getRandom = getRandom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy9yYW5kb20tdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7R0FJRztBQUNJLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7QUFDdEQsQ0FBQyxDQUFBO0FBRlksUUFBQSxNQUFNLFVBRWxCO0FBR0Q7Ozs7R0FJRztBQUNJLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBZSxFQUFFLEVBQUU7SUFDM0MsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxjQUFNLEVBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzFCLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQUpZLFFBQUEsU0FBUyxhQUlyQiJ9