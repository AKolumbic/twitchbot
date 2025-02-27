"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = void 0;
const index_1 = require("../utilities/index");
const _1 = require(".");
function executeCommand(channel, chatbot, message, target, userstate) {
    const chatter = `@${userstate.username}`;
    const command = message.trim().toLowerCase();
    const messageID = userstate.id;
    // Check message for banned words and inform the chatter that their language is unacceptable.
    (0, index_1.moderateChat)(command, chatbot, channel, userstate, messageID);
    // Have some fun.
    const easterEggExecuted = (0, _1.executeEasterEggs)(target, chatbot, command, channel, messageID);
    // Exit early if not a command or an easter egg was executed.
    if (command.charAt(0) !== '!' || easterEggExecuted) {
        return;
    }
    // Roll commands.
    if (command.split(' ')[0] === '!roll') {
        (0, _1.executeRollCommands)(command, chatter, chatbot);
        return;
    }
    // Character Sheets
    (0, _1.executeCharacterCommands)(command, channel, chatbot);
    // Simple commands.
    (0, _1.executeBasicCommands)(command, channel, chatbot, chatter);
}
exports.executeCommand = executeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4ZWN1dGFibGVDb21tYW5kcy9leGVjdXRlLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQWtEO0FBQ2xELHdCQUtXO0FBRVgsU0FBZ0IsY0FBYyxDQUM1QixPQUFlLEVBQ2YsT0FBZSxFQUNmLE9BQWUsRUFDZixNQUFjLEVBQ2QsU0FBb0I7SUFFcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxFQUFZLENBQUM7SUFFekMsNkZBQTZGO0lBQzdGLElBQUEsb0JBQVksRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFOUQsaUJBQWlCO0lBQ2pCLE1BQU0saUJBQWlCLEdBQUcsSUFBQSxvQkFBaUIsRUFDekMsTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsQ0FDVixDQUFDO0lBRUYsNkRBQTZEO0lBQzdELElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQWlCLEVBQUU7UUFBRSxPQUFNO0tBQUU7SUFFOUQsaUJBQWlCO0lBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7UUFDckMsSUFBQSxzQkFBbUIsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE9BQU87S0FDUjtJQUVELG1CQUFtQjtJQUNuQixJQUFBLDJCQUF3QixFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFcEQsbUJBQW1CO0lBQ25CLElBQUEsdUJBQW9CLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQXJDRCx3Q0FxQ0MifQ==