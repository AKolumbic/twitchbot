"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskTtrpgCommand = void 0;
const config_1 = require("../config");
const openai_service_1 = require("../services/openai.service");
class AskTtrpgCommand {
    constructor() {
        this.options = {
            name: "ttrpg",
            description: "Ask about Pathfinder 2e or D&D rules, lore, or mechanics",
            usage: "!ttrpg <your question>",
            cooldown: 30,
            permission: "everyone",
            aliases: ["pf2e", "dnd", "pathfinder"],
        };
    }
    async execute(context) {
        const { client, channel, args } = context;
        // If no question is provided
        if (args.length === 0) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Please provide a question after the !ttrpg command. Example: !ttrpg how does flanking work in Pathfinder 2e?`);
            return;
        }
        // Get the question from args
        const question = args.join(" ");
        // Let the user know we're processing
        client.say(channel, `${config_1.BOT_CONFIG.NAME}: Thinking about "${question.substring(0, 50)}${question.length > 50 ? "..." : ""}"...`);
        try {
            // Get response from OpenAI
            const response = await openai_service_1.openAIService.getTtrpgResponse(question);
            // Send the response to the channel
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${response}`);
        }
        catch (error) {
            console.error("Error in ttrpg command:", error);
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Sorry, I couldn't answer that question right now. Please try again later.`);
        }
    }
}
exports.AskTtrpgCommand = AskTtrpgCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLXR0cnBnLmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvYXNrLXR0cnBnLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQXVDO0FBQ3ZDLCtEQUEyRDtBQUUzRCxNQUFhLGVBQWU7SUFBNUI7UUFDRSxZQUFPLEdBQW1CO1lBQ3hCLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLDBEQUEwRDtZQUN2RSxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLFVBQVU7WUFDdEIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUM7U0FDdkMsQ0FBQztJQXVDSixDQUFDO0lBckNDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBdUI7UUFDbkMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTFDLDZCQUE2QjtRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLGdIQUFnSCxDQUNuSSxDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHFCQUFxQixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FDOUQsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDakMsTUFBTSxDQUNQLENBQUM7UUFFRixJQUFJO1lBQ0YsMkJBQTJCO1lBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sOEJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRSxtQ0FBbUM7WUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxtQkFBVSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLDZFQUE2RSxDQUNoRyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUEvQ0QsMENBK0NDIn0=