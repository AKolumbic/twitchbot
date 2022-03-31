import { Client } from "tmi.js";

export function rickRoll(
  command: string,
  chatbot: Client,
  channel: string,
  messageID: string
): boolean {
  let wasRickRolled = false;

  if (command === '!rickRoll') {
    chatbot.deletemessage(channel, messageID);
    wasRickRolled = true;
    setTimeout(() => {
      chatbot.say(channel, `DROSSBOT: https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
    }, 60000);
  }

  if (command === 'never gonna give you up') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: Never gonna let you down`);
  }

  if (command === 'never gonna run around') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: and desert you`);
  }

  if (command === 'never gonna run around and desert you') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: Never gonna make you cry`);
  }

  if (command === 'never gonna make you cry') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: Never gonna say goodbye`);
  }

  if (command === 'never gonna say goodbye') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: Never gonna tell a lie and hurt you`);
  }

  if (command === 'never gonna tell a lie') {
    wasRickRolled = true;
    chatbot.say(channel, `DROSSBOT: And hurt you`);
  }

  return wasRickRolled;
}
