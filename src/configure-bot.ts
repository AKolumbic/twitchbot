import { Client } from "tmi.js";
import _ from "lodash";

import { TWITCH_CLIENT_OPTIONS, BOT_CONFIG } from "./config.js";
import { CommandManager } from "./commands/command-manager.js";
import { CommandsCommand } from "./commands/commands.command.js";
import { moderationService } from "./services/moderation.service.js";

export function configureBot(): Client {
  // Create the Twitch client with our options
  const chatbot = new Client(TWITCH_CLIENT_OPTIONS);

  // Set up command manager
  const commandManager = new CommandManager();

  // Register commands that require the commandManager
  commandManager.registerCommand(new CommandsCommand(commandManager));

  // Connect to Twitch
  chatbot
    .connect()
    .catch((err) => console.error("Error connecting to Twitch:", err));

  // EVENT HANDLERS
  chatbot.on("connected", (address: string, port: number) => {
    console.log(
      `** [${new Date(_.now())}]: Connected to ${address} on Port:${port} **`
    );
    chatbot.say(
      BOT_CONFIG.CHANNELS[0],
      `${BOT_CONFIG.NAME} ACTIVATED: type !info in chat to learn more.`
    );
  });

  chatbot.on("disconnected", (reason: string) => {
    console.log(`[${new Date(_.now())}]: Disconnected: ${reason}`);
  });

  chatbot.on("reconnect", () => {
    console.log(`[${new Date(_.now())}]: Reconnecting...`);
  });

  chatbot.on("message", (target, userstate, message, self) => {
    try {
      // Moderate the message
      const wasModerated = moderationService.moderateMessage(
        message,
        chatbot,
        target,
        userstate,
        userstate.id
      );

      // If the message was moderated, don't process it as a command
      if (wasModerated) {
        return;
      }

      // Handle commands
      commandManager.handleMessage(chatbot, target, userstate, message, self);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  return chatbot;
}
