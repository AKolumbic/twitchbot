"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommand = void 0;
const config_1 = require("../config");
class InfoCommand {
    constructor() {
        this.options = {
            name: "info",
            description: "Provides information about the channel and bot",
            aliases: ["about"],
            permission: "everyone",
        };
    }
    execute(context) {
        const { client, channel, userstate } = context;
        const chatter = `@${userstate.username}`;
        // Different message if streamer uses the command
        if (context.isBroadcaster) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Thanks for watching! I stream both tabletop RPGs (Pathfinder 2e and D&D) and video games like Helldivers 2, Hearthstone, and more. Type !commands to see what you can do here!`);
        }
        else {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Hey ${chatter}! Welcome to the channel! I'm Drosshole and I stream tabletop RPGs (Pathfinder 2e on Thursdays and D&D on Saturdays) plus video games throughout the week. Check out !schedule, !game, !character, and !campaign for more details!`);
        }
    }
}
exports.InfoCommand = InfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2luZm8uY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBdUM7QUFFdkMsTUFBYSxXQUFXO0lBQXhCO1FBQ0UsWUFBTyxHQUFtQjtZQUN4QixJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCLENBQUM7SUFtQkosQ0FBQztJQWpCQyxPQUFPLENBQUMsT0FBdUI7UUFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXpDLGlEQUFpRDtRQUNqRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUksa0xBQWtMLENBQ3JNLENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUksU0FBUyxPQUFPLG9PQUFvTyxDQUN2USxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUF6QkQsa0NBeUJDIn0=