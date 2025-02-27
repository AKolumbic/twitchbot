"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskGameCommand = void 0;
const config_1 = require("../config");
const openai_service_1 = require("../services/openai.service");
class AskGameCommand {
    constructor() {
        this.options = {
            name: "askgame",
            description: "Ask about Helldivers 2, Hearthstone, Baldur's Gate 3, or Cyberpunk 2077",
            usage: "!askgame <your question>",
            cooldown: 30,
            permission: "everyone",
            aliases: ["gamequestion", "videogame"],
        };
    }
    async execute(context) {
        const { client, channel, args } = context;
        // If no question is provided
        if (args.length === 0) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Please provide a question after the !askgame command. Example: !askgame what's the best strategy in Helldivers 2?`);
            return;
        }
        // Get the question from args
        const question = args.join(" ");
        // Let the user know we're processing
        client.say(channel, `${config_1.BOT_CONFIG.NAME}: Thinking about "${question.substring(0, 50)}${question.length > 50 ? "..." : ""}"...`);
        try {
            // Get response from OpenAI
            const response = await openai_service_1.openAIService.getGameResponse(question);
            // Send the response to the channel
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${response}`);
        }
        catch (error) {
            console.error("Error in askgame command:", error);
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Sorry, I couldn't answer that gaming question right now. Please try again later.`);
        }
    }
}
exports.AskGameCommand = AskGameCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLWdhbWUuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9hc2stZ2FtZS5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNDQUF1QztBQUN2QywrREFBMkQ7QUFFM0QsTUFBYSxjQUFjO0lBQTNCO1FBQ0UsWUFBTyxHQUFtQjtZQUN4QixJQUFJLEVBQUUsU0FBUztZQUNmLFdBQVcsRUFDVCx5RUFBeUU7WUFDM0UsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7U0FDdkMsQ0FBQztJQXVDSixDQUFDO0lBckNDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBdUI7UUFDbkMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTFDLDZCQUE2QjtRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHFIQUFxSCxDQUN4SSxDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHFCQUFxQixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FDOUQsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDakMsTUFBTSxDQUNQLENBQUM7UUFFRixJQUFJO1lBQ0YsMkJBQTJCO1lBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sOEJBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFL0QsbUNBQW1DO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsR0FBRyxDQUNSLE9BQU8sRUFDUCxHQUFHLG1CQUFVLENBQUMsSUFBSSxvRkFBb0YsQ0FDdkcsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGO0FBaERELHdDQWdEQyJ9