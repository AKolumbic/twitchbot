"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAIService = void 0;
const openai_1 = __importDefault(require("openai"));
const config_1 = require("../config");
class OpenAIService {
    constructor() {
        this.client = new openai_1.default({
            apiKey: config_1.OPENAI_CONFIG.API_KEY,
        });
        // Create context about the streamer's content
        this.streamerContext = `
Streamer context:
- Name: drosshole, a Twitch streamer who plays both tabletop RPGs and video games.
- Current Pathfinder 2e character: Gilbert Goldgrin, a celebrity polymath bard halfling in the Stolen Fate campaign (Thursdays).
- Current D&D character: Brodi Dankweed, a teenage tortle druid in the Hometown Heroes campaign (Saturdays).
- Also plays video games: Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077.
`.trim();
    }
    /**
     * Generate a response using the OpenAI API
     * @param prompt The prompt to send to the OpenAI API
     * @returns The generated response
     */
    async generateResponse(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: config_1.OPENAI_CONFIG.MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful assistant for a Twitch channel. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: config_1.OPENAI_CONFIG.MAX_TOKENS,
                temperature: config_1.OPENAI_CONFIG.TEMPERATURE,
            });
            return (response.choices[0]?.message?.content ||
                "Sorry, I couldn't generate a response at this time.");
        }
        catch (error) {
            console.error("Error generating OpenAI response:", error);
            return "There was an error generating a response. Please try again later.";
        }
    }
    /**
     * Generate a TTRPG-focused response
     * @param prompt The TTRPG-related question or prompt
     * @returns The generated response
     */
    async getTtrpgResponse(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: config_1.OPENAI_CONFIG.MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are a knowledgeable tabletop RPG expert familiar with both D&D and Pathfinder 2e. Provide helpful and accurate information about rules, lore, and gameplay. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: config_1.OPENAI_CONFIG.MAX_TOKENS,
                temperature: config_1.OPENAI_CONFIG.TEMPERATURE,
            });
            return (response.choices[0]?.message?.content ||
                "Sorry, I couldn't generate a TTRPG response at this time.");
        }
        catch (error) {
            console.error("Error generating TTRPG response:", error);
            return "There was an error generating a TTRPG response. Please try again later.";
        }
    }
    /**
     * Generate a video game focused response
     * @param prompt The video game related question or prompt
     * @returns The generated response
     */
    async getGameResponse(prompt) {
        try {
            const response = await this.client.chat.completions.create({
                model: config_1.OPENAI_CONFIG.MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are a video game expert familiar with Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077. Provide helpful gaming tips, strategies, or lore. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: config_1.OPENAI_CONFIG.MAX_TOKENS,
                temperature: config_1.OPENAI_CONFIG.TEMPERATURE,
            });
            return (response.choices[0]?.message?.content ||
                "Sorry, I couldn't generate a gaming response at this time.");
        }
        catch (error) {
            console.error("Error generating game response:", error);
            return "There was an error generating a gaming response. Please try again later.";
        }
    }
}
exports.openAIService = new OpenAIService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmFpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvb3BlbmFpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHNDQUEwQztBQUUxQyxNQUFNLGFBQWE7SUFJakI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsc0JBQWEsQ0FBQyxPQUFPO1NBQzlCLENBQUMsQ0FBQztRQUVILDhDQUE4QztRQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHOzs7Ozs7Q0FNMUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQWM7UUFDbkMsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDekQsS0FBSyxFQUFFLHNCQUFhLENBQUMsS0FBSztnQkFDMUIsUUFBUSxFQUFFO29CQUNSO3dCQUNFLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxxSEFBcUgsSUFBSSxDQUFDLGVBQWUsRUFBRTtxQkFDcko7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLE1BQU07cUJBQ2hCO2lCQUNGO2dCQUNELFVBQVUsRUFBRSxzQkFBYSxDQUFDLFVBQVU7Z0JBQ3BDLFdBQVcsRUFBRSxzQkFBYSxDQUFDLFdBQVc7YUFDdkMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU87Z0JBQ3JDLHFEQUFxRCxDQUN0RCxDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsT0FBTyxtRUFBbUUsQ0FBQztTQUM1RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQWM7UUFDbkMsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDekQsS0FBSyxFQUFFLHNCQUFhLENBQUMsS0FBSztnQkFDMUIsUUFBUSxFQUFFO29CQUNSO3dCQUNFLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxtT0FBbU8sSUFBSSxDQUFDLGVBQWUsRUFBRTtxQkFDblE7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLE1BQU07cUJBQ2hCO2lCQUNGO2dCQUNELFVBQVUsRUFBRSxzQkFBYSxDQUFDLFVBQVU7Z0JBQ3BDLFdBQVcsRUFBRSxzQkFBYSxDQUFDLFdBQVc7YUFDdkMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU87Z0JBQ3JDLDJEQUEyRCxDQUM1RCxDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekQsT0FBTyx5RUFBeUUsQ0FBQztTQUNsRjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFjO1FBQ2xDLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3pELEtBQUssRUFBRSxzQkFBYSxDQUFDLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsK05BQStOLElBQUksQ0FBQyxlQUFlLEVBQUU7cUJBQy9QO29CQUNEO3dCQUNFLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxNQUFNO3FCQUNoQjtpQkFDRjtnQkFDRCxVQUFVLEVBQUUsc0JBQWEsQ0FBQyxVQUFVO2dCQUNwQyxXQUFXLEVBQUUsc0JBQWEsQ0FBQyxXQUFXO2FBQ3ZDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FDTCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPO2dCQUNyQyw0REFBNEQsQ0FDN0QsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sMEVBQTBFLENBQUM7U0FDbkY7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=