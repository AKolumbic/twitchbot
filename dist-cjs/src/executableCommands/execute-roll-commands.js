"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRollCommands = void 0;
const utilities_1 = require("../utilities/");
const secrets_1 = require("../../secrets");
function executeRollCommands(command, chatter, chatbot) {
    const channel = secrets_1.channels[0];
    const dynamicRoll = command.match(secrets_1.dynamicDiceRegEx);
    const roll = (0, utilities_1.rollDice)(20);
    const secondRoll = (0, utilities_1.rollDice)(20);
    switch (command) {
        case '!roll':
            if (roll === 20) {
                chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll} - CRITICAL ROLL!`);
                break;
            }
            else if (roll === 1) {
                chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll} - CRITICAL FAIL!`);
                break;
            }
            else {
                chatbot.say(channel, `DROSSBOT: ${chatter} rolled a ${roll}`);
                break;
            }
        case `${dynamicRoll}`:
            chatbot.say(channel, `DROSSBOT: ${chatter} rolled ${(0, utilities_1.rollFormula)(dynamicRoll[0].split(' ')[1])}`);
            break;
        case '!roll advantage':
            const highRoll = roll >= secondRoll ? roll : secondRoll;
            if (highRoll === 20) {
                chatbot.say(channel, `DROSSBOT: CRITICAL ROLL! With advantage, ${chatter} got a ${highRoll}!. Roll Results: (${roll}, ${secondRoll})`);
                break;
            }
            else if (highRoll === 1) {
                chatbot.say(channel, `DROSSBOT: CRITICAL FAIL! A TRULY MONUMENTAL DISAPPOINTMENT! SERIOUSLY, HOW IS THAT EVEN MATHEMATICALLY POSSIBLE??! With ADVANTAGE, ${chatter} got ${highRoll}! TWICE!`);
                break;
            }
            else {
                chatbot.say(channel, `DROSSBOT: With advantage, ${chatter} got ${highRoll}. Roll Results: (${roll}, ${secondRoll})`);
                break;
            }
        case '!roll disadvantage':
            const lowroll = roll <= secondRoll ? roll : secondRoll;
            if (lowroll === 20) {
                chatbot.say(channel, `DROSSBOT: CRITICAL ROLL! A TRULY MONUMENTAL ACHIEVMENT! SERIOUSLY, HOW IS THAT EVEN MATHEMATICALLY POSSIBLE??! With DISADVANTAGE, ${chatter} got ${lowroll}! TWICE!`);
                break;
            }
            else if (lowroll === 1) {
                chatbot.say(channel, `DROSSBOT: CRITICAL FAIL! RNG does NOT like you. With disadvantage, ${chatter} got a ${lowroll}!. Roll Results: (${roll}, ${secondRoll})`);
                break;
            }
            else {
                chatbot.say(channel, `DROSSBOT: With disadvantage, ${chatter} got ${lowroll}. Roll Results: (${roll}, ${secondRoll})`);
                break;
            }
    }
}
exports.executeRollCommands = executeRollCommands;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1yb2xsLWNvbW1hbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWN1dGFibGVDb21tYW5kcy9leGVjdXRlLXJvbGwtY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQXNEO0FBQ3RELDJDQUEyRDtBQUczRCxTQUFnQixtQkFBbUIsQ0FDakMsT0FBZSxFQUNmLE9BQWUsRUFDZixPQUFlO0lBRWYsTUFBTSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUFnQixDQUFvQixDQUFDO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFBLG9CQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFFaEMsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLE9BQU87WUFDVixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxPQUFPLGFBQWEsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO2FBQ1A7aUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLE9BQU8sYUFBYSxJQUFJLG1CQUFtQixDQUFDLENBQUM7Z0JBQy9FLE1BQU07YUFDUDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLE9BQU8sYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNO2FBQ1A7UUFFSCxLQUFLLEdBQUcsV0FBVyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQWEsT0FBTyxXQUFXLElBQUEsdUJBQVcsRUFBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLE1BQU07UUFFUixLQUFLLGlCQUFpQjtZQUNwQixNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUV4RCxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDRDQUE0QyxPQUFPLFVBQVUsUUFBUSxxQkFBcUIsSUFBSSxLQUFLLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZJLE1BQU07YUFDUDtpQkFBTSxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHNJQUFzSSxPQUFPLFFBQVEsUUFBUSxVQUFVLENBQUMsQ0FBQztnQkFDOUwsTUFBTTthQUNQO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDZCQUE2QixPQUFPLFFBQVEsUUFBUSxvQkFBb0IsSUFBSSxLQUFLLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JILE1BQU07YUFDUDtRQUVILEtBQUssb0JBQW9CO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBRXZELElBQUksT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUscUlBQXFJLE9BQU8sUUFBUSxPQUFPLFVBQVUsQ0FBQyxDQUFDO2dCQUM1TCxNQUFNO2FBQ1A7aUJBQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxzRUFBc0UsT0FBTyxVQUFVLE9BQU8scUJBQXFCLElBQUksS0FBSyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNoSyxNQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLE9BQU8sUUFBUSxPQUFPLG9CQUFvQixJQUFJLEtBQUssVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDdkgsTUFBTTthQUNQO0tBR0o7QUFDSCxDQUFDO0FBekRELGtEQXlEQyJ9