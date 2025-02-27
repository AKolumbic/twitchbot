"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderationService = exports.ModerationService = void 0;
const config_1 = require("../config");
class ModerationService {
    constructor() {
        this.bannedWords = config_1.MODERATION_CONFIG.BANNED_WORDS;
        this.timeoutDuration = config_1.MODERATION_CONFIG.AUTO_TIMEOUT_DURATION;
    }
    /**
     * Check a message for banned words and moderate if needed
     * @param message The message to check
     * @param client The TMI client
     * @param channel The channel where the message was sent
     * @param userstate The userstate of the sender
     * @param messageID The ID of the message
     * @returns Whether the message contained banned content
     */
    moderateMessage(message, client, channel, userstate, messageID) {
        // Skip moderation for broadcaster and mods
        if (userstate.badges?.broadcaster === "1" || userstate.mod) {
            return false;
        }
        const lowerMessage = message.toLowerCase();
        // Check for banned words
        for (const word of this.bannedWords) {
            if (lowerMessage.includes(word.toLowerCase())) {
                this.takeModAction(client, channel, userstate, messageID);
                return true;
            }
        }
        return false;
    }
    /**
     * Take moderation action against a user
     * @param client The TMI client
     * @param channel The channel where the action should be taken
     * @param userstate The userstate of the user
     * @param messageID The ID of the message to delete
     */
    takeModAction(client, channel, userstate, messageID) {
        const username = userstate.username;
        // Delete the message if we have the ID
        if (messageID) {
            client
                .deletemessage(channel, messageID)
                .catch((err) => console.error("Error deleting message:", err));
        }
        // Timeout the user
        client
            .timeout(channel, username, this.timeoutDuration, "Using banned words")
            .catch((err) => console.error("Error timing out user:", err));
        // Send a message explaining the action
        client.say(channel, `@${username}, your message was removed for containing inappropriate content. Please review the channel rules.`);
        // Log the action
        console.log(`[MODERATION] Timed out ${username} for ${this.timeoutDuration} seconds - using banned words`);
    }
    /**
     * Add a word to the banned words list
     * @param word The word to ban
     */
    addBannedWord(word) {
        if (!this.bannedWords.includes(word.toLowerCase())) {
            this.bannedWords.push(word.toLowerCase());
        }
    }
    /**
     * Remove a word from the banned words list
     * @param word The word to unban
     * @returns Whether the word was removed
     */
    removeBannedWord(word) {
        const index = this.bannedWords.indexOf(word.toLowerCase());
        if (index !== -1) {
            this.bannedWords.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * Get the list of banned words
     * @returns The list of banned words
     */
    getBannedWords() {
        return [...this.bannedWords];
    }
}
exports.ModerationService = ModerationService;
exports.moderationService = new ModerationService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL21vZGVyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBOEM7QUFFOUMsTUFBYSxpQkFBaUI7SUFJNUI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLDBCQUFpQixDQUFDLFlBQVksQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLDBCQUFpQixDQUFDLHFCQUFxQixDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLGVBQWUsQ0FDcEIsT0FBZSxFQUNmLE1BQWMsRUFDZCxPQUFlLEVBQ2YsU0FBb0IsRUFDcEIsU0FBa0I7UUFFbEIsMkNBQTJDO1FBQzNDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUzQyx5QkFBeUI7UUFDekIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25DLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssYUFBYSxDQUNuQixNQUFjLEVBQ2QsT0FBZSxFQUNmLFNBQW9CLEVBQ3BCLFNBQWtCO1FBRWxCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFFcEMsdUNBQXVDO1FBQ3ZDLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTTtpQkFDSCxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztpQkFDakMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxtQkFBbUI7UUFDbkIsTUFBTTthQUNILE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUM7YUFDdEUsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFaEUsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLElBQUksUUFBUSxtR0FBbUcsQ0FDaEgsQ0FBQztRQUVGLGlCQUFpQjtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUNULDBCQUEwQixRQUFRLFFBQVEsSUFBSSxDQUFDLGVBQWUsK0JBQStCLENBQzlGLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBYSxDQUFDLElBQVk7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTNELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksY0FBYztRQUNuQixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBbkhELDhDQW1IQztBQUVZLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=