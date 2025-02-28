import {
  Command,
  CommandContext,
  CommandOptions,
} from "./command.interface.js";
import { BOT_CONFIG } from "../config.js";
import { openAIService } from "../services/openai.service.js";

export class AskGameCommand implements Command {
  options: CommandOptions = {
    name: "askgame",
    description:
      "Ask about Helldivers 2, Hearthstone, Baldur's Gate 3, or Cyberpunk 2077",
    usage: "!askgame <your question>",
    cooldown: 30, // 30 seconds cooldown to prevent abuse
    permission: "subscriber",
    aliases: ["gamequestion", "videogame"],
  };

  async execute(context: CommandContext): Promise<void> {
    const { client, channel, args } = context;

    // If no question is provided
    if (args.length === 0) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Please provide a question after the !askgame command. Example: !askgame what's the best strategy in Helldivers 2?`
      );
      return;
    }

    // Get the question from args
    const question = args.join(" ");

    // Let the user know we're processing
    client.say(
      channel,
      `${BOT_CONFIG.NAME}: Thinking about "${question.substring(0, 50)}${
        question.length > 50 ? "..." : ""
      }"...`
    );

    try {
      // Get response from OpenAI
      const response = await openAIService.getGameResponse(question);

      // Send the response to the channel
      client.say(channel, `${BOT_CONFIG.NAME}: ${response}`);
    } catch (error) {
      console.error("Error in askgame command:", error);
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Sorry, I couldn't answer that gaming question right now. Please try again later.`
      );
    }
  }
}

