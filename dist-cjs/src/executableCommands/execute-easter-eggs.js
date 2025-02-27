"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeEasterEggs = void 0;
const secrets_1 = require("../../secrets");
const utilities_1 = require("../utilities");
function executeEasterEggs(target, chatbot, command, channel, messageID) {
    let easterEggExecuted = false;
    if (target.toLowerCase() === secrets_1.easterEggTriggers[0] && command.includes('hi')) {
        easterEggExecuted = true;
        chatbot.say(channel, `HI ${secrets_1.easterEggUser.toUpperCase()}!!!`);
    }
    if (command === '!simulate battleground' || command === '!wow') {
        easterEggExecuted = true;
        chatbot.say(channel, `DROSSBOT: ${(0, utilities_1.simulateBattle)()}`);
    }
    if ((0, utilities_1.rickRoll)(command, chatbot, channel, messageID)) {
        easterEggExecuted = true;
    }
    ;
    return easterEggExecuted;
}
exports.executeEasterEggs = executeEasterEggs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1lYXN0ZXItZWdncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGVjdXRhYmxlQ29tbWFuZHMvZXhlY3V0ZS1lYXN0ZXItZWdncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBaUU7QUFDakUsNENBQXdEO0FBRXhELFNBQWdCLGlCQUFpQixDQUMvQixNQUFjLEVBQ2QsT0FBZSxFQUNmLE9BQWUsRUFDZixPQUFlLEVBQ2YsU0FBaUI7SUFFakIsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFOUIsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssMkJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMzRSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM5RDtJQUVELElBQUksT0FBTyxLQUFLLHdCQUF3QixJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7UUFDOUQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQWEsSUFBQSwwQkFBYyxHQUFFLEVBQUUsQ0FBQyxDQUFBO0tBQ3REO0lBRUQsSUFBSSxJQUFBLG9CQUFRLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFBRSxpQkFBaUIsR0FBRyxJQUFJLENBQUE7S0FBRTtJQUFBLENBQUM7SUFFakYsT0FBTyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDO0FBdEJELDhDQXNCQyJ9