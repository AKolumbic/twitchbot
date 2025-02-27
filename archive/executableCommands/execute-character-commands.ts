import { Client } from 'tmi.js';

export function executeCharacterCommands(characterName: string, channel: string, chatbot: Client) {
  switch (characterName) {
    // The Sea of Sorrows
    case `!crawford`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/65884788`);
      break;

    case `!donny`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/65577690`);
      break;

    case `!silverhook`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/65462545`);
      break;

    case `!ren`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/57175143`);
      break;

    case `!tamasq`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/65460572`);
      break;

    // Carry The Knowledge
    case `!rhopraxus`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/63459699`);
      break;

    case `!saint`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/64752234`);
      break;

    case `!kaylin`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/13989809`);
      break;

    case `!morgan`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/71002279`);
      break;

    case `!zereks`:
      chatbot.say(channel, `Zereks is a dragonborn samurai, but not the fighter subclass, a custom class from Final Fantasy, learn more here: https://www.finalfantasyd20.com/classes/hybrid-classes/samurai/`);
      break;

    case `!sil'lith`:
      chatbot.say(channel, ``);
      break;

    // A Clash Of Two Fates
    case `!marek`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/55956716`);
      break;

    case `!spraxus`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/55853414`);
      break;

    case `!edryn`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/57776502`);
      break;

    case `!belavor`:
      chatbot.say(channel, `https://www.dndbeyond.com/characters/56441113`);
      break;

    default:
      break;
  }
}
