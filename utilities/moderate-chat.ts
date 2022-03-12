import { Client, Userstate } from "tmi.js";
import { banlist } from "../secrets";

export function moderateChat(message: string, client: Client, channel: string, userstate: Userstate) {
  const messageID = userstate.id as string;
  let shouldSendMessage = false;

  shouldSendMessage = banlist.some(blockedWord => message.includes(blockedWord))

  if (shouldSendMessage) {
    client.deletemessage(channel, messageID);
    client.say(channel, `@${userstate.username} we don't like that kinda talk around here, your message was deleted.`);
  }
}
