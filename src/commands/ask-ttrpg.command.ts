import { Command, CommandContext, CommandOptions } from "./command.interface.js";
import { BOT_CONFIG } from "../config.js";
import { openAIService } from "../services/openai.service.js";

export class AskTtrpgCommand implements Command {
  options: CommandOptions = {
    name: "ttrpg",
    description: "Ask about Pathfinder 2e or D&D rules, lore, or mechanics",
    usage: "!ttrpg <your question>",
    cooldown: 30, // 30 seconds cooldown to prevent abuse
    permission: "everyone",
    aliases: ["pf2e", "dnd", "pathfinder"],
  };

  async execute(context: CommandContext): Promise<void> {
    const { client, channel, args } = context;

    // If no question is provided
    if (args.length === 0) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Please provide a question after the !ttrpg command. Example: !ttrpg how does flanking work in Pathfinder 2e?`
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
      const response = await openAIService.getTtrpgResponse(question);

      // Send the response to the channel
      client.say(channel, `${BOT_CONFIG.NAME}: ${response}`);
    } catch (error) {
      console.error("Error in ttrpg command:", error);
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Sorry, I couldn't answer that question right now. Please try again later.`
      );
    }
  }
}

