"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsCommand = void 0;
const config_1 = require("../config");
class CommandsCommand {
    constructor(commandManager) {
        this.options = {
            name: "commands",
            description: "List all available commands",
            aliases: ["help", "cmds"],
            permission: "everyone",
        };
        this.commandManager = commandManager;
    }
    execute(context) {
        const { client, channel, args } = context;
        // If no argument is provided, list all commands
        if (args.length === 0) {
            const commands = this.commandManager.getAllCommands();
            const commandNames = commands
                .map((cmd) => `!${cmd.options.name}`)
                .join(", ");
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Available commands: ${commandNames}. Type !commands <command name> for more info about a specific command.`);
            return;
        }
        // If a specific command is requested, show its details
        const commandName = args[0].toLowerCase();
        const commands = this.commandManager.getAllCommands();
        const command = commands.find((cmd) => cmd.options.name === commandName ||
            cmd.options.aliases?.includes(commandName));
        if (!command) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Command !${commandName} not found. Type !commands to see all available commands.`);
            return;
        }
        // Format command details
        const { name, description, usage, aliases } = command.options;
        let response = `${config_1.BOT_CONFIG.NAME}: !${name} - ${description}`;
        if (usage) {
            response += ` | Usage: ${usage}`;
        }
        if (aliases && aliases.length > 0) {
            response += ` | Aliases: ${aliases.map((a) => `!${a}`).join(", ")}`;
        }
        client.say(channel, response);
    }
}
exports.CommandsCommand = CommandsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9jb21tYW5kcy5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNDQUF1QztBQUd2QyxNQUFhLGVBQWU7SUFVMUIsWUFBWSxjQUE4QjtRQVQxQyxZQUFPLEdBQW1CO1lBQ3hCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN6QixVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUFDO1FBS0EsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUF1QjtRQUM3QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFMUMsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0RCxNQUFNLFlBQVksR0FBRyxRQUFRO2lCQUMxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWQsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUkseUJBQXlCLFlBQVkseUVBQXlFLENBQ2pJLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCx1REFBdUQ7UUFDdkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FDM0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNOLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFdBQVc7WUFDaEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUM3QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLGNBQWMsV0FBVywyREFBMkQsQ0FDdkcsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELHlCQUF5QjtRQUN6QixNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5RCxJQUFJLFFBQVEsR0FBRyxHQUFHLG1CQUFVLENBQUMsSUFBSSxNQUFNLElBQUksTUFBTSxXQUFXLEVBQUUsQ0FBQztRQUUvRCxJQUFJLEtBQUssRUFBRTtZQUNULFFBQVEsSUFBSSxhQUFhLEtBQUssRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakMsUUFBUSxJQUFJLGVBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ3JFO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBOURELDBDQThEQyJ9