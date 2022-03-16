import { Client, Userstate } from 'tmi.js';
import { banlist } from '../../secrets';

export function moderateChat(
  message: string,
  chatbot: Client,
  channel: string,
  userstate: Userstate,
  messageID: string
): void {
  if (banlist.some(blockedWord => message.includes(blockedWord))) {
    chatbot.deletemessage(channel, messageID);
    chatbot.say(channel, `@${userstate.username} we don't like that kinda talk around here, your message was deleted.`);
  }
}
