import { Command, CommandContext, CommandOptions } from "./command.interface.js";
import { BOT_CONFIG } from "../config.js";
import { openAIService } from "../services/openai.service.js";

export class AskCommand implements Command {
  options: CommandOptions = {
    name: "ask",
    description: "Ask the AI a question about D&D or anything else",
    usage: "!ask <your question>",
    cooldown: 30, // 30 seconds cooldown to prevent abuse
    permission: "everyone",
  };

  async execute(context: CommandContext): Promise<void> {
    const { client, channel, args } = context;

    // If no question is provided
    if (args.length === 0) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Please provide a question after the !ask command. Example: !ask what is the best class in D&D?`
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
      const response = await openAIService.generateResponse(question);

      // Send the response to the channel
      client.say(channel, `${BOT_CONFIG.NAME}: ${response}`);
    } catch (error) {
      console.error("Error in ask command:", error);
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Sorry, I couldn't answer that question right now. Please try again later.`
      );
    }
  }
}

