export function getPartyMembers(): string {
  const day = new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(new Date());

  switch (day) {
    case 'Tuesday':
      return `Tonight's Party: Rhopraxus, ruby dragonborn cleric; Saint, human wizard; Kaylin, human druid; Morgan, human sorcerer; & Zereks, brass dragonborn samurai;`;
    case 'Wednesday':
      return `Tonight's Party: Marek, half elf monster-slaying assassin ranger(5)/rogue(5)/artificer(1) ; Spraxus, reborn half elf spore druid(10)/cleric(1) (and creepy as fuck); Edryn, scourge assimar paladin(2)/sorcerer(9) who worships himself....literally; & Belavor, an arcane trickster rogue(11) and all around trouble maker.`;
    case 'Sunday':
      return `Tonight's Party: Ren, reborn barbarian/paladin/sorcerer; Tamasq, bladesinger wizard; Silverhook, drake warden ranger; Crawford, swashbuckling rogue; & Donny....he's special`;
    default:
      return `Uhoh, I'm not playing D&D right now.`;
  }
}
