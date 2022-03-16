export type WoWClass =
  'Druid' |
  'Mage' |
  'Paladin' |
  'Rogue' |
  'Hunter' |
  'Warrior' |
  'Warlock' |
  'Priest' |
  'Shaman' |
  'Death Knight'

export type HordeRace =
  'Orc' |
  'Troll' |
  'Tauren' |
  'Undead' |
  'Blood Elf'

export type AllianceRace =
  'Human' |
  'Dwarf' |
  'Gnome' |
  'Night Elf' |
  'Daenai'

export type PlayableRace = HordeRace | AllianceRace

export type Bracket =
[15, 16, 17, 18, 19, 20] |
[21, 22, 23, 24, 25, 26, 27, 28, 29, 30] |
[31, 32, 33, 34, 35, 36, 37, 38, 39, 40] |
[41, 42, 43, 44, 45, 46, 47, 48, 49, 50] |
[51, 52, 53, 54, 55, 56, 57, 58, 59, 60] |
[61, 62, 63, 64, 65, 66, 67, 68, 69, 70] |
[71, 72, 73, 74, 75, 76, 77, 78, 79] |
[80]

export interface Battleground {
  name: string;
  size: number;
  lvlBracket: any;
}

export interface Battledata {
  Battleground: string;
  Winner: string;
  VictoryText: string;
  Bracket: string;
  Teams: {
      "Horde Score": number;
      "Horde Team": string[];
      "Alliance Score": number;
      "Alliance Team": string[];
  };
}
