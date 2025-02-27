import { Client, Userstate } from "tmi.js";
import { Command, CommandContext } from "./command.interface";
import { BOT_CONFIG, COMMAND_PERMISSIONS } from "../config";

// Import commands
import { InfoCommand } from "./info.command";
import { AskCommand } from "./ask.command";
import { RollCommand } from "./roll.command";
import { CampaignCommand } from "./campaign.command";
import { CharacterCommand } from "./character.command";
import { GameCommand } from "./game.command";
import { ScheduleCommand } from "./schedule.command";
import { AskTtrpgCommand } from "./ask-ttrpg.command";
import { AskGameCommand } from "./ask-game.command";
import { HelldiversCommand } from "./helldivers.command";

export class CommandManager {
  private commands: Map<string, Command> = new Map();
  private aliases: Map<string, string> = new Map();
  private cooldowns: Map<string, Map<string, number>> = new Map();

  constructor() {
    // Register all commands
    this.registerCommand(new InfoCommand());
    this.registerCommand(new AskCommand());
    this.registerCommand(new RollCommand());

    // Register new commands
    this.registerCommand(new CampaignCommand());
    this.registerCommand(new CharacterCommand());
    this.registerCommand(new GameCommand());
    this.registerCommand(new ScheduleCommand());
    this.registerCommand(new AskTtrpgCommand());
    this.registerCommand(new AskGameCommand());
    this.registerCommand(new HelldiversCommand());

    // Add more commands here
  }

  /**
   * Register a command with the command manager
   * @param command The command to register
   */
  registerCommand(command: Command): void {
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
  handleMessage(
    client: Client,
    channel: string,
    userstate: Userstate,
    message: string,
    self: boolean
  ): void {
    // Ignore messages from the bot
    if (self) return;

    // Check if the message starts with the command prefix
    if (!message.startsWith(BOT_CONFIG.PREFIX)) return;

    // Parse the command and arguments
    const args = message.slice(BOT_CONFIG.PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase() || "";

    // Get the command from the name or alias
    const name = this.aliases.get(commandName) || commandName;
    const command = this.commands.get(name);

    // If the command doesn't exist, do nothing
    if (!command) return;

    // Check permissions
    if (!this.hasPermission(userstate, command.options.permission)) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Sorry, you don't have permission to use this command.`
      );
      return;
    }

    // Check cooldown
    if (!this.checkCooldown(userstate, command, channel, client)) {
      return;
    }

    // Create command context
    const context: CommandContext = {
      client,
      channel,
      userstate,
      message,
      args,
      isBroadcaster: userstate.badges?.broadcaster === "1",
      isModerator: userstate.mod || userstate.badges?.broadcaster === "1",
      isSubscriber: userstate.subscriber || false,
      isVIP:
        userstate.badges?.vip === "1" ||
        userstate.badges?.broadcaster === "1" ||
        userstate.mod ||
        false,
    };

    // Execute the command
    try {
      command.execute(context);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: There was an error executing that command.`
      );
    }
  }

  /**
   * Check if a user has permission to use a command
   * @param userstate The userstate of the user
   * @param permission The required permission level
   * @returns Whether the user has permission
   */
  private hasPermission(userstate: Userstate, permission?: string): boolean {
    // If no permission is required, allow everyone
    if (!permission) return true;

    // Check specific permissions
    switch (permission) {
      case COMMAND_PERMISSIONS.BROADCASTER:
        return userstate.badges?.broadcaster === "1";

      case COMMAND_PERMISSIONS.MODERATOR:
        return userstate.mod || userstate.badges?.broadcaster === "1";

      case COMMAND_PERMISSIONS.VIP:
        return (
          userstate.badges?.vip === "1" ||
          userstate.mod ||
          userstate.badges?.broadcaster === "1"
        );

      case COMMAND_PERMISSIONS.SUBSCRIBER:
        return (
          userstate.subscriber ||
          userstate.mod ||
          userstate.badges?.broadcaster === "1"
        );

      case COMMAND_PERMISSIONS.EVERYONE:
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
  private checkCooldown(
    userstate: Userstate,
    command: Command,
    channel: string,
    client: Client
  ): boolean {
    // Skip cooldown for broadcaster and mods
    if (userstate.badges?.broadcaster === "1" || userstate.mod) return true;

    // If no cooldown is set, allow the command
    if (!command.options.cooldown) return true;

    const { name } = command.options;
    const now = Date.now();
    const cooldownAmount = command.options.cooldown * 1000;
    const timestamps = this.cooldowns.get(name)!;
    const userId = userstate["user-id"]!;

    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;

        client.say(
          channel,
          `${BOT_CONFIG.NAME}: @${
            userstate.username
          }, please wait ${timeLeft.toFixed(
            1
          )} more second(s) before using the ${name} command.`
        );

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
  getAllCommands(): Command[] {
    return Array.from(this.commands.values());
  }
}

