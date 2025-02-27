"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeBasicCommands = void 0;
const secrets_1 = require("../../secrets");
const utilities_1 = require("../utilities");
function executeBasicCommands(command, channel, chatbot, chatter) {
    switch (command) {
        case '!info':
            if (chatter === `@${secrets_1.username}`) {
                chatbot.say(channel, `DROSSBOT: Thanks for watching! You can interact with the channel by using commands like !roll, !campaign, or !character sheet. If you'd like to know more, type !commands in chat!`);
            }
            else {
                chatbot.say(channel, `DROSSBOT: Thanks for watching, ${chatter}! Cause of the nature of D&D, I don't interact with chat as much as other streamers, BUT I do have a chatbot if you want to get in on the action. You can interact with the channel by using commands like !roll, !campaign, or !character sheet. If you'd like to know more, type !commands in chat!`);
            }
            break;
        case '!commands':
            chatbot.say(channel, `DROSSBOT: Valid Commands: !info, !roll, !campaign, !character sheet, !socials, !schedule, !donate. Type !<character name> for a link to the other party member's character sheets on DnD Beyond. There's some secret commands too...`);
            break;
        case '!campaign':
            const campaignDescription = (0, utilities_1.getCampaignDescription)();
            chatbot.say(channel, `DROSSBOT: ${campaignDescription}`);
            break;
        case '!character sheet':
            const link = (0, utilities_1.getCharacterSheet)();
            chatbot.say(channel, `DROSSBOT: ${link}`);
            break;
        case '!socials':
            chatbot.say(channel, `DROSSBOT: You can find me at @${secrets_1.username} all over the internet`);
            break;
        case '!lurk':
            console.log(`${chatter} is lurking...`);
            break;
        case '!party':
            const party = (0, utilities_1.getPartyMembers)();
            chatbot.say(channel, `DROSSBOT: ${party}. Type !<character name> in chat to get a link to individual character's DnD Beyond character sheet.`);
            break;
        case '!secrets':
            chatbot.say(channel, `DROSSBOT: Clever, ${chatter}. Try typing 'never gonna give you up' in chat... or !wow `);
        case `!discord`:
            chatbot.say(channel, `DROSSBOT: https://discord.gg/W4VhAuU9rx`);
        case `!tip`:
            chatbot.say(channel, `DROSSBOT: https://streamlabs.com/drosshole/tip`);
        case `!donate`:
            chatbot.say(channel, `DROSSBOT: https://streamlabs.com/drosshole/tip`);
        case `!schedule`:
            chatbot.say(channel, `DROSSBOT: TUESDAYS: CARRY THE KNOWLEDGE 5pm-7:30pm PST | WEDNESDAYS: A CLASH OF TWO FATES 5:30pm-8:30pm PST | SUNDAYS: THE SEA OF SORROWS 5pm-7pm PST`);
        default:
            chatbot.say(channel, `DROSSBOT: Sorry ${chatter}, ${command} is an invalid command`);
    }
}
exports.executeBasicCommands = executeBasicCommands;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1iYXNpYy1jb21tYW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGVjdXRhYmxlQ29tbWFuZHMvZXhlY3V0ZS1iYXNpYy1jb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBeUM7QUFDekMsNENBQTBGO0FBRTFGLFNBQWdCLG9CQUFvQixDQUNsQyxPQUFlLEVBQ2YsT0FBZSxFQUNmLE9BQWUsRUFDZixPQUFlO0lBRWYsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLE9BQU87WUFDVixJQUFJLE9BQU8sS0FBSyxJQUFJLGtCQUFRLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQ2pCLG9MQUFvTCxDQUNyTCxDQUFBO2FBQ0Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQ2pCLGtDQUFrQyxPQUFPLHVTQUF1UyxDQUNqVixDQUFBO2FBQ0Y7WUFDRCxNQUFNO1FBRVIsS0FBSyxXQUFXO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsc09BQXNPLENBQUMsQ0FBQTtZQUM1UCxNQUFNO1FBRVIsS0FBSyxXQUFXO1lBQ2QsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLGtDQUFzQixHQUFFLENBQUM7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDekQsTUFBTTtRQUVSLEtBQUssa0JBQWtCO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUEsNkJBQWlCLEdBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUMsTUFBTTtRQUVSLEtBQUssVUFBVTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGlDQUFpQyxrQkFBUSx3QkFBd0IsQ0FBQyxDQUFBO1lBQ3ZGLE1BQU07UUFFUixLQUFLLE9BQU87WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hDLE1BQU07UUFFUixLQUFLLFFBQVE7WUFDWCxNQUFNLEtBQUssR0FBRyxJQUFBLDJCQUFlLEdBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLEtBQUssc0dBQXNHLENBQUMsQ0FBQztZQUMvSSxNQUFNO1FBRVIsS0FBSyxVQUFVO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLE9BQU8sNERBQTRELENBQUMsQ0FBQztRQUVqSCxLQUFLLFVBQVU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO1FBRWxFLEtBQUssTUFBTTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFFekUsS0FBSyxTQUFTO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0RBQWdELENBQUMsQ0FBQztRQUV6RSxLQUFLLFdBQVc7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx1SkFBdUosQ0FBQyxDQUFDO1FBRWhMO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLE9BQU8sS0FBSyxPQUFPLHdCQUF3QixDQUFDLENBQUM7S0FDeEY7QUFDSCxDQUFDO0FBaEVELG9EQWdFQyJ9