"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureBot = void 0;
const tmi_js_1 = require("tmi.js");
const lodash_1 = __importDefault(require("lodash"));
const config_1 = require("./config");
const command_manager_1 = require("./commands/command-manager");
const commands_command_1 = require("./commands/commands.command");
const moderation_service_1 = require("./services/moderation.service");
function configureBot() {
    // Create the Twitch client with our options
    const chatbot = new tmi_js_1.Client(config_1.TWITCH_CLIENT_OPTIONS);
    // Set up command manager
    const commandManager = new command_manager_1.CommandManager();
    // Register commands that require the commandManager
    commandManager.registerCommand(new commands_command_1.CommandsCommand(commandManager));
    // Connect to Twitch
    chatbot
        .connect()
        .catch((err) => console.error("Error connecting to Twitch:", err));
    // EVENT HANDLERS
    chatbot.on("connected", (address, port) => {
        console.log(`** [${new Date(lodash_1.default.now())}]: Connected to ${address} on Port:${port} **`);
        chatbot.say(config_1.BOT_CONFIG.CHANNELS[0], `${config_1.BOT_CONFIG.NAME} ACTIVATED: type !info in chat to learn more.`);
    });
    chatbot.on("disconnected", (reason) => {
        console.log(`[${new Date(lodash_1.default.now())}]: Disconnected: ${reason}`);
    });
    chatbot.on("reconnect", () => {
        console.log(`[${new Date(lodash_1.default.now())}]: Reconnecting...`);
    });
    chatbot.on("message", (target, userstate, message, self) => {
        try {
            // Moderate the message
            const wasModerated = moderation_service_1.moderationService.moderateMessage(message, chatbot, target, userstate, userstate.id);
            // If the message was moderated, don't process it as a command
            if (wasModerated) {
                return;
            }
            // Handle commands
            commandManager.handleMessage(chatbot, target, userstate, message, self);
        }
        catch (error) {
            console.error("Error processing message:", error);
        }
    });
    return chatbot;
}
exports.configureBot = configureBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmUtYm90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFnQztBQUNoQyxvREFBdUI7QUFFdkIscUNBQTZEO0FBQzdELGdFQUE0RDtBQUM1RCxrRUFBOEQ7QUFDOUQsc0VBQWtFO0FBRWxFLFNBQWdCLFlBQVk7SUFDMUIsNENBQTRDO0lBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksZUFBTSxDQUFDLDhCQUFxQixDQUFDLENBQUM7SUFFbEQseUJBQXlCO0lBQ3pCLE1BQU0sY0FBYyxHQUFHLElBQUksZ0NBQWMsRUFBRSxDQUFDO0lBRTVDLG9EQUFvRDtJQUNwRCxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksa0NBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRXBFLG9CQUFvQjtJQUNwQixPQUFPO1NBQ0osT0FBTyxFQUFFO1NBQ1QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFckUsaUJBQWlCO0lBQ2pCLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBZSxFQUFFLElBQVksRUFBRSxFQUFFO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQ1QsT0FBTyxJQUFJLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixPQUFPLFlBQVksSUFBSSxLQUFLLENBQ3hFLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUN0QixHQUFHLG1CQUFVLENBQUMsSUFBSSwrQ0FBK0MsQ0FDbEUsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6RCxJQUFJO1lBQ0YsdUJBQXVCO1lBQ3ZCLE1BQU0sWUFBWSxHQUFHLHNDQUFpQixDQUFDLGVBQWUsQ0FDcEQsT0FBTyxFQUNQLE9BQU8sRUFDUCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsQ0FBQyxFQUFFLENBQ2IsQ0FBQztZQUVGLDhEQUE4RDtZQUM5RCxJQUFJLFlBQVksRUFBRTtnQkFDaEIsT0FBTzthQUNSO1lBRUQsa0JBQWtCO1lBQ2xCLGNBQWMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBMURELG9DQTBEQyJ9