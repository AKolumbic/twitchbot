import { Client, Userstate } from 'tmi.js';
import { username } from '../../secrets';
import { getCampaignDescription, getCharacterSheet } from '../utilities';

export function executeBasicCommands(
  command: string,
  channel: string,
  chatbot: Client,
  chatter: string
): void {
  switch (command) {
    case '!info':
      if (chatter === `@${username}`) {
        chatbot.say(channel,
          `DROSSBOT: Thanks for watching! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.
            If you'd like to know more, type !commands in chat!`
        )
      } else {
        chatbot.say(channel,
          `DROSSBOT: Thanks for watching, ${chatter}! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.
            If you'd like to know more, type !commands in chat!`
        )
      }
      break;

    case '!commands':
      chatbot.say(channel, `DROSSBOT: Valid Commands: !info, !roll, !campaign, !character sheet, !socials. There's some secret ones too...`)
      break;

    case '!campaign':
      const campaignDescription = getCampaignDescription();
      chatbot.say(channel, `DROSSBOT: ${campaignDescription}`);
      break;

    case '!character sheet':
      const link = getCharacterSheet();
      chatbot.say(channel, `DROSSBOT: ${link}`);
      break;

    case '!socials':
      chatbot.say(channel, `DROSSBOT: You can find me at @${username} all over the internet`)
      break;

    case '!lurk':
      console.log(`${chatter} is lurking...`);
      break;

    case '!secrets':
      chatbot.say(channel, `Clever, ${chatter}. Try typing 'never gonna give you up' in chat `);

    default:
      chatbot.say(channel, `DROSSBOT: Sorry ${chatter}, ${command} is an invalid command`);
  }
}
