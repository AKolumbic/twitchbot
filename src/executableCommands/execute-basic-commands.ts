import { Client, Userstate } from 'tmi.js';
import { username } from '../../secrets';
import { getCampaignDescription, getCharacterSheet, getPartyMembers } from '../utilities';

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
          `DROSSBOT: Thanks for watching! You can interact with the channel by using commands like !roll, !campaign, or !character sheet.
            If you'd like to know more, type !commands in chat!`
        )
      } else {
        chatbot.say(channel,
          `DROSSBOT: Thanks for watching, ${chatter}! You can interact with the channel by using commands like !roll, !campaign, or !character sheet.
            If you'd like to know more, type !commands in chat!`
        )
      }
      break;

    case '!commands':
      chatbot.say(channel, `DROSSBOT: Valid Commands: !info, !roll, !campaign, !character sheet, !socials, !schedule, !donate. Type !<character name> for a link to the other party member's character sheets on DnD Beyond. There's some secret commands too...`)
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

    case '!party':
      const party = getPartyMembers();
      chatbot.say(channel, `${party}. Type !<character name> in chat to get a link to individual character's DnD Beyond character sheet.`);
      break;

    case '!secrets':
      chatbot.say(channel, `Clever, ${chatter}. Try typing 'never gonna give you up' in chat... or !wow `);

    case `!discord`:
      chatbot.say(channel, `https://discord.gg/W4VhAuU9rx`);

    case `!tip`:
      chatbot.say(channel, `https://streamlabs.com/drosshole/tip`);

    case `!donate`:
      chatbot.say(channel, `https://streamlabs.com/drosshole/tip`);

    case `!schedule`:
      chatbot.say(channel, `TUESDAYS: CARRY THE KNOWLEDGE 5pm-7:30pm PST | WEDNESDAYS: A CLASH OF TWO FATES 5:30pm-8:30pm PST | SUNDAYS: THE SEA OF SORROWS 5pm-7pm PST`);

    default:
      chatbot.say(channel, `DROSSBOT: Sorry ${chatter}, ${command} is an invalid command`);
  }
}
