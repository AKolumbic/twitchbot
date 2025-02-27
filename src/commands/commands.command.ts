import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";
import { CommandManager } from "./command-manager";

export class CommandsCommand implements Command {
  options: CommandOptions = {
    name: "commands",
    description: "List all available commands",
    aliases: ["help", "cmds"],
    permission: "everyone",
  };

  private commandManager: CommandManager;

  constructor(commandManager: CommandManager) {
    this.commandManager = commandManager;
  }

  execute(context: CommandContext): void {
    const { client, channel, args } = context;

    // If no argument is provided, list all commands
    if (args.length === 0) {
      const commands = this.commandManager.getAllCommands();
      const commandNames = commands
        .map((cmd) => `!${cmd.options.name}`)
        .join(", ");

      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Available commands: ${commandNames}. Type !commands <command name> for more info about a specific command.`
      );
      return;
    }

    // If a specific command is requested, show its details
    const commandName = args[0].toLowerCase();
    const commands = this.commandManager.getAllCommands();
    const command = commands.find(
      (cmd) =>
        cmd.options.name === commandName ||
        cmd.options.aliases?.includes(commandName)
    );

    if (!command) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Command !${commandName} not found. Type !commands to see all available commands.`
      );
      return;
    }

    // Format command details
    const { name, description, usage, aliases } = command.options;
    let response = `${BOT_CONFIG.NAME}: !${name} - ${description}`;

    if (usage) {
      response += ` | Usage: ${usage}`;
    }

    if (aliases && aliases.length > 0) {
      response += ` | Aliases: ${aliases.map((a) => `!${a}`).join(", ")}`;
    }

    client.say(channel, response);
  }
}

