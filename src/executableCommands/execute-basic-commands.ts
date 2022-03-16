import { Client } from 'tmi.js';
import { getCampaignDescription, getCharacterSheet } from '../utilities';

export function executeBasicCommands(
  command: string,
  channel: string,
  chatbot: Client,
  chatter: string
): void {
  switch (command) {
    case '!info':
      chatbot.say(channel,
        `DROSSBOT: Thanks for watching, ${chatter}! You can interact with the channel by using commands like !roll, !campaign, or !characterSheet.\n
          If you'd like to know more, type !commands in chat!`
      )
      break;

    case '!commands':
      chatbot.say(channel, 'DROSSBOT: Valid Commands: !info, !roll, !campaign, !characterSheet, !socials')
      break;

    case '!campaign':
      const campaignDescription = getCampaignDescription();
      chatbot.say(channel, `DROSSBOT: ${campaignDescription}`);
      break;

    case '!character sheet':
      const link = getCharacterSheet();
      chatbot.say(channel, `DROSSBOT: ${link}`);

    case '!socials':
      chatbot.say(channel, `DROSSBOT: You can find me at @drosshole all over the internet`)
      break;

    case '!lurk':
      console.log(`${chatter} is lurking...`);
      break;

    default:
      chatbot.say(channel, `DROSSBOT: Sorry ${chatter}, ${command} is an invalid command`);
  }
}
