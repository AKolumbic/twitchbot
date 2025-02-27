import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";

export class InfoCommand implements Command {
  options: CommandOptions = {
    name: "info",
    description: "Provides information about the channel and bot",
    aliases: ["about"],
    permission: "everyone",
  };

  execute(context: CommandContext): void {
    const { client, channel, userstate } = context;
    const chatter = `@${userstate.username}`;

    // Different message if streamer uses the command
    if (context.isBroadcaster) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Thanks for watching! I stream both tabletop RPGs (Pathfinder 2e and D&D) and video games like Helldivers 2, Hearthstone, and more. Type !commands to see what you can do here!`
      );
    } else {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Hey ${chatter}! Welcome to the channel! I'm Drosshole and I stream tabletop RPGs (Pathfinder 2e on Thursdays and D&D on Saturdays) plus video games throughout the week. Check out !schedule, !game, !character, and !campaign for more details!`
      );
    }
  }
}

