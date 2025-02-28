import { Client, Userstate } from "tmi.js";
import { MODERATION_CONFIG } from "../config.js";

export class ModerationService {
  private bannedWords: string[];
  private timeoutDuration: number;

  constructor() {
    this.bannedWords = MODERATION_CONFIG.BANNED_WORDS;
    this.timeoutDuration = MODERATION_CONFIG.AUTO_TIMEOUT_DURATION;
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
  public moderateMessage(
    message: string,
    client: Client,
    channel: string,
    userstate: Userstate,
    messageID?: string
  ): boolean {
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
  private takeModAction(
    client: Client,
    channel: string,
    userstate: Userstate,
    messageID?: string
  ): void {
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
    client.say(
      channel,
      `@${username}, your message was removed for containing inappropriate content. Please review the channel rules.`
    );

    // Log the action
    console.log(
      `[MODERATION] Timed out ${username} for ${this.timeoutDuration} seconds - using banned words`
    );
  }

  /**
   * Add a word to the banned words list
   * @param word The word to ban
   */
  public addBannedWord(word: string): void {
    if (!this.bannedWords.includes(word.toLowerCase())) {
      this.bannedWords.push(word.toLowerCase());
    }
  }

  /**
   * Remove a word from the banned words list
   * @param word The word to unban
   * @returns Whether the word was removed
   */
  public removeBannedWord(word: string): boolean {
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
  public getBannedWords(): string[] {
    return [...this.bannedWords];
  }
}

export const moderationService = new ModerationService();

