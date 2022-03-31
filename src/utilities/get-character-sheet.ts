import _ from 'lodash';
import { characterSheets } from '../../secrets';

export function getCharacterSheet(): string {
  const day = new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(new Date());

  switch (day) {
    case 'Tuesday':
      return `Here's the character sheet for Rhopraxus Rhogthroknaar: https://www.dndbeyond.com/profile/drosshole/characters/63459699`;
    case 'Wednesday':
      return `Here's the character sheet for Marek d'Toussaint: https://www.dndbeyond.com/profile/drosshole/characters/55956716`;
    case 'Sunday':
      return `Today, I'm DMing! Here's a random character of mine from over on DnD Beyond: ${_.sample(characterSheets)}`;
    default:
      return `Check out a random character of mine on DnD Beyond: ${_.sample(characterSheets)}`;
  }
}
