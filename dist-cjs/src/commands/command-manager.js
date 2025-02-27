"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const config_1 = require("../config");
// Import commands
const info_command_1 = require("./info.command");
const ask_command_1 = require("./ask.command");
const roll_command_1 = require("./roll.command");
const campaign_command_1 = require("./campaign.command");
const character_command_1 = require("./character.command");
const game_command_1 = require("./game.command");
const schedule_command_1 = require("./schedule.command");
const ask_ttrpg_command_1 = require("./ask-ttrpg.command");
const ask_game_command_1 = require("./ask-game.command");
const helldivers_command_1 = require("./helldivers.command");
class CommandManager {
    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
        this.cooldowns = new Map();
        // Register all commands
        this.registerCommand(new info_command_1.InfoCommand());
        this.registerCommand(new ask_command_1.AskCommand());
        this.registerCommand(new roll_command_1.RollCommand());
        // Register new commands
        this.registerCommand(new campaign_command_1.CampaignCommand());
        this.registerCommand(new character_command_1.CharacterCommand());
        this.registerCommand(new game_command_1.GameCommand());
        this.registerCommand(new schedule_command_1.ScheduleCommand());
        this.registerCommand(new ask_ttrpg_command_1.AskTtrpgCommand());
        this.registerCommand(new ask_game_command_1.AskGameCommand());
        this.registerCommand(new helldivers_command_1.HelldiversCommand());
        // Add more commands here
    }
    /**
     * Register a command with the command manager
     * @param command The command to register
     */
    registerCommand(command) {
        const { name, aliases } = command.options;
        // Register the command
        this.commands.set(name, command);
        // Register aliases
        if (aliases) {
            aliases.forEach((alias) => {
                this.aliases.set(alias, name);
            });
        }
        // Initialize cooldown collection
        this.cooldowns.set(name, new Map());
    }
    /**
     * Handle a message and execute a command if it matches
     * @param client The TMI client instance
     * @param channel The channel the message was sent in
     * @param userstate The userstate of the sender
     * @param message The message content
     * @param self Whether the message was sent by the bot
     */
    handleMessage(client, channel, userstate, message, self) {
        // Ignore messages from the bot
        if (self)
            return;
        // Check if the message starts with the command prefix
        if (!message.startsWith(config_1.BOT_CONFIG.PREFIX))
            return;
        // Parse the command and arguments
        const args = message.slice(config_1.BOT_CONFIG.PREFIX.length).trim().split(/\s+/);
        const commandName = args.shift()?.toLowerCase() || "";
        // Get the command from the name or alias
        const name = this.aliases.get(commandName) || commandName;
        const command = this.commands.get(name);
        // If the command doesn't exist, do nothing
        if (!command)
            return;
        // Check permissions
        if (!this.hasPermission(userstate, command.options.permission)) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Sorry, you don't have permission to use this command.`);
            return;
        }
        // Check cooldown
        if (!this.checkCooldown(userstate, command, channel, client)) {
            return;
        }
        // Create command context
        const context = {
            client,
            channel,
            userstate,
            message,
            args,
            isBroadcaster: userstate.badges?.broadcaster === "1",
            isModerator: userstate.mod || userstate.badges?.broadcaster === "1",
            isSubscriber: userstate.subscriber || false,
            isVIP: userstate.badges?.vip === "1" ||
                userstate.badges?.broadcaster === "1" ||
                userstate.mod ||
                false,
        };
        // Execute the command
        try {
            command.execute(context);
        }
        catch (error) {
            console.error(`Error executing command ${commandName}:`, error);
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: There was an error executing that command.`);
        }
    }
    /**
     * Check if a user has permission to use a command
     * @param userstate The userstate of the user
     * @param permission The required permission level
     * @returns Whether the user has permission
     */
    hasPermission(userstate, permission) {
        // If no permission is required, allow everyone
        if (!permission)
            return true;
        // Check specific permissions
        switch (permission) {
            case config_1.COMMAND_PERMISSIONS.BROADCASTER:
                return userstate.badges?.broadcaster === "1";
            case config_1.COMMAND_PERMISSIONS.MODERATOR:
                return userstate.mod || userstate.badges?.broadcaster === "1";
            case config_1.COMMAND_PERMISSIONS.VIP:
                return (userstate.badges?.vip === "1" ||
                    userstate.mod ||
                    userstate.badges?.broadcaster === "1");
            case config_1.COMMAND_PERMISSIONS.SUBSCRIBER:
                return (userstate.subscriber ||
                    userstate.mod ||
                    userstate.badges?.broadcaster === "1");
            case config_1.COMMAND_PERMISSIONS.EVERYONE:
            default:
                return true;
        }
    }
    /**
     * Check if a command is on cooldown for a user
     * @param userstate The userstate of the user
     * @param command The command to check
     * @param channel The channel to respond in
     * @param client The TMI client
     * @returns Whether the command is not on cooldown
     */
    checkCooldown(userstate, command, channel, client) {
        // Skip cooldown for broadcaster and mods
        if (userstate.badges?.broadcaster === "1" || userstate.mod)
            return true;
        // If no cooldown is set, allow the command
        if (!command.options.cooldown)
            return true;
        const { name } = command.options;
        const now = Date.now();
        const cooldownAmount = command.options.cooldown * 1000;
        const timestamps = this.cooldowns.get(name);
        const userId = userstate["user-id"];
        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                client.say(channel, `${config_1.BOT_CONFIG.NAME}: @${userstate.username}, please wait ${timeLeft.toFixed(1)} more second(s) before using the ${name} command.`);
                return false;
            }
        }
        // Set the timestamp for this user
        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);
        return true;
    }
    /**
     * Get all registered commands
     * @returns An array of all commands
     */
    getAllCommands() {
        return Array.from(this.commands.values());
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2NvbW1hbmQtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzQ0FBNEQ7QUFFNUQsa0JBQWtCO0FBQ2xCLGlEQUE2QztBQUM3QywrQ0FBMkM7QUFDM0MsaURBQTZDO0FBQzdDLHlEQUFxRDtBQUNyRCwyREFBdUQ7QUFDdkQsaURBQTZDO0FBQzdDLHlEQUFxRDtBQUNyRCwyREFBc0Q7QUFDdEQseURBQW9EO0FBQ3BELDZEQUF5RDtBQUV6RCxNQUFhLGNBQWM7SUFLekI7UUFKUSxhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0MsWUFBTyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBcUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUc5RCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLDBCQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSx3QkFBVSxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksMEJBQVcsRUFBRSxDQUFDLENBQUM7UUFFeEMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxrQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksb0NBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSwwQkFBVyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksa0NBQWUsRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLG1DQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxp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