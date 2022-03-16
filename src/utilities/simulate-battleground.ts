import { getRandom, random } from '.';
import {
  WoWClass,
  PlayableRace,
  Bracket,
  HordeRace,
  AllianceRace,
  Battleground,
  Battledata
} from './battleground.types';

/**
 * builds a character and adds them to the roster as many times as the team size
 * @param factionRaces - an array of the faction's races
 * @param teamSize - the amount of characters on a team, determined by battleground
 * @param bracket - the bracket that determines character level
 */
function teamBuilder(
  factionRaces: PlayableRace[],
  teamSize: number,
  bracket: number[]
): {
  teamScore: number;
  roster: string[];
} {
  let teamScore = 0
  const roster: string[] = []
  const classes = [
    'Druid',
    'Mage',
    'Paladin',
    'Rogue',
    'Hunter',
    'Warrior',
    'Warlock',
    'Priest',
    'Shaman',
    'Death Knight'
  ] as WoWClass[]

  for (let index = 0; index < teamSize; index++) {
    const lvl: number = getRandom(bracket)
    const race: PlayableRace = getRandom(factionRaces)
    const characterClass: WoWClass = getRandom(classes)
    const teamMember = `Level ${lvl} ${race} ${characterClass}`

    teamScore = teamScore + lvl
    roster.push(teamMember)
  }

  return { teamScore, roster }
}

/**
 * 50/50 decider between horde and alliance if they have same score
 */
function tieBreaker(): 'HORDE' | 'ALLIANCE' {
  const rng = random(1, 100)
  const even = rng % 2 === 0
  return even ? 'HORDE' : 'ALLIANCE'
}

/**
 * accepts faction team scores to determine the winner of battle.
 * Note that order matters for the params.
 * @param hordeScore - all horde team character levels added together
 * @param allianceScore - all alliance team character levels added together
 */
function getWinner(hordeScore: number, allianceScore: number): {
  winner: string;
  victoryText: string;
} {
  const tie = hordeScore === allianceScore
  let hordeVictory = hordeScore > allianceScore
  let allianceVictory = allianceScore > hordeScore
  let winner = ''
  let victoryText = ''

  if (tie) {
    const coinFlip = tieBreaker()

    if (coinFlip === 'HORDE') {
      hordeVictory = true
    } else if (coinFlip === 'ALLIANCE') {
      allianceVictory = true
    }
  }

  if (hordeVictory) {
    winner = 'HORDE'
    victoryText = 'FOR THE HORDE! LOKTAR OGAR!'
  } else if (allianceVictory) {
    winner = 'ALLIANCE'
    victoryText = 'FOR THE ALLIANCE!'
  }

  return { winner, victoryText }
}

/**
 * Determines battleground, and level bracket
 */
function chooseBattleground(): Battleground {
  const bgLvlBracket = [
    [15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80]
  ] as Bracket[];
  const maxLvlBracket = bgLvlBracket[bgLvlBracket.length - 1] // [80]

  const battlegrounds = [
    {
      name: 'Warsong Gulch',
      size: 10,
      lvlBracket: getRandom([bgLvlBracket[0], maxLvlBracket])
    },
    {
      name: 'Arathi Basin',
      size: 12,
      lvlBracket: getRandom([bgLvlBracket[1], maxLvlBracket])
    },
    {
      name: 'Alterac Valley',
      size: 40,
      lvlBracket: getRandom([bgLvlBracket[2], maxLvlBracket])
    },
    {
      name: 'The Eye of the Storm',
      size: 15,
      lvlBracket: getRandom([bgLvlBracket[5], maxLvlBracket])
    },
    {
      name: 'The Strand of the Ancients',
      size: 15,
      lvlBracket: getRandom([bgLvlBracket[6], maxLvlBracket])
    }
  ] as Battleground[]
  return getRandom(battlegrounds)
}

/**
 * picks battlefield, assembles armies, and declares a winner before
 * putting the data together and returning it
 */
function battle(): Battledata {
  const battleground = chooseBattleground()
  const teamSize: number = battleground.size
  const bracket: Bracket = battleground.lvlBracket


  const hordeRaces = [
    'Orc',
    'Troll',
    'Tauren',
    'Undead',
    'Blood Elf'
  ] as HordeRace[]
  const horde = teamBuilder(hordeRaces, teamSize, bracket)

  const allianceRaces = [
    'Human',
    'Dwarf',
    'Gnome',
    'Night Elf',
    'Daenai'
  ] as AllianceRace[]
  const alliance = teamBuilder(allianceRaces, teamSize, bracket)


  const winner = getWinner(horde.teamScore, alliance.teamScore)

  const battleData = {
    Battleground: battleground.name,
    Winner: winner.winner,
    VictoryText: winner.victoryText,
    Bracket: `${bracket[0]} - ${bracket[bracket.length - 1]}`,
    Teams: {
      ['Horde Score']: horde.teamScore,
      ['Horde Team']: horde.roster,
      ['Alliance Score']: alliance.teamScore,
      ['Alliance Team']: alliance.roster,
    }
  }

  return battleData
}

function battleReport(battleData: Battledata): string {
  const { Bracket, Winner, Battleground, VictoryText, Teams } = battleData

  return `[${Bracket} Level Bracket]: ${Winner} wins the battle of ${Battleground}! ${VictoryText}. Here's some data about the WoW battleground you simulated: ${JSON.stringify(Teams)}`
}

export function simulateBattle(): string {
  return battleReport(battle());
}
