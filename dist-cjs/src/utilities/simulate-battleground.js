"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateBattle = void 0;
const _1 = require(".");
/**
 * builds a character and adds them to the roster as many times as the team size
 * @param factionRaces - an array of the faction's races
 * @param teamSize - the amount of characters on a team, determined by battleground
 * @param bracket - the bracket that determines character level
 */
function teamBuilder(factionRaces, teamSize, bracket) {
    let teamScore = 0;
    const roster = [];
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
    ];
    for (let index = 0; index < teamSize; index++) {
        const lvl = (0, _1.getRandom)(bracket);
        const race = (0, _1.getRandom)(factionRaces);
        const characterClass = (0, _1.getRandom)(classes);
        const teamMember = `Level ${lvl} ${race} ${characterClass}`;
        teamScore = teamScore + lvl;
        roster.push(teamMember);
    }
    return { teamScore, roster };
}
/**
 * 50/50 decider between horde and alliance if they have same score
 */
function tieBreaker() {
    const rng = (0, _1.random)(1, 100);
    const even = rng % 2 === 0;
    return even ? 'HORDE' : 'ALLIANCE';
}
/**
 * accepts faction team scores to determine the winner of battle.
 * Note that order matters for the params.
 * @param hordeScore - all horde team character levels added together
 * @param allianceScore - all alliance team character levels added together
 */
function getWinner(hordeScore, allianceScore) {
    const tie = hordeScore === allianceScore;
    let hordeVictory = hordeScore > allianceScore;
    let allianceVictory = allianceScore > hordeScore;
    let winner = '';
    let victoryText = '';
    if (tie) {
        const coinFlip = tieBreaker();
        if (coinFlip === 'HORDE') {
            hordeVictory = true;
        }
        else if (coinFlip === 'ALLIANCE') {
            allianceVictory = true;
        }
    }
    if (hordeVictory) {
        winner = 'HORDE';
        victoryText = 'FOR THE HORDE! LOKTAR OGAR!';
    }
    else if (allianceVictory) {
        winner = 'ALLIANCE';
        victoryText = 'FOR THE ALLIANCE!';
    }
    return { winner, victoryText };
}
/**
 * Determines battleground, and level bracket
 */
function chooseBattleground() {
    const bgLvlBracket = [
        [15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77, 78, 79],
        [80]
    ];
    const maxLvlBracket = bgLvlBracket[bgLvlBracket.length - 1]; // [80]
    const battlegrounds = [
        {
            name: 'Warsong Gulch',
            size: 10,
            lvlBracket: (0, _1.getRandom)([bgLvlBracket[0], maxLvlBracket])
        },
        {
            name: 'Arathi Basin',
            size: 12,
            lvlBracket: (0, _1.getRandom)([bgLvlBracket[1], maxLvlBracket])
        },
        {
            name: 'Alterac Valley',
            size: 40,
            lvlBracket: (0, _1.getRandom)([bgLvlBracket[2], maxLvlBracket])
        },
        {
            name: 'The Eye of the Storm',
            size: 15,
            lvlBracket: (0, _1.getRandom)([bgLvlBracket[5], maxLvlBracket])
        },
        {
            name: 'The Strand of the Ancients',
            size: 15,
            lvlBracket: (0, _1.getRandom)([bgLvlBracket[6], maxLvlBracket])
        }
    ];
    return (0, _1.getRandom)(battlegrounds);
}
/**
 * picks battlefield, assembles armies, and declares a winner before
 * putting the data together and returning it
 */
function battle() {
    const battleground = chooseBattleground();
    const teamSize = battleground.size;
    const bracket = battleground.lvlBracket;
    const hordeRaces = [
        'Orc',
        'Troll',
        'Tauren',
        'Undead',
        'Blood Elf'
    ];
    const horde = teamBuilder(hordeRaces, teamSize, bracket);
    const allianceRaces = [
        'Human',
        'Dwarf',
        'Gnome',
        'Night Elf',
        'Daenai'
    ];
    const alliance = teamBuilder(allianceRaces, teamSize, bracket);
    const winner = getWinner(horde.teamScore, alliance.teamScore);
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
    };
    return battleData;
}
function battleReport(battleData) {
    const { Bracket, Winner, Battleground, VictoryText, Teams } = battleData;
    return `[${Bracket} Level Bracket]: ${Winner} wins the battle of ${Battleground}! ${VictoryText}. Here's some data about the WoW battleground you simulated: ${JSON.stringify(Teams)}`;
}
function simulateBattle() {
    return battleReport(battle());
}
exports.simulateBattle = simulateBattle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGUtYmF0dGxlZ3JvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy9zaW11bGF0ZS1iYXR0bGVncm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0JBQXNDO0FBV3RDOzs7OztHQUtHO0FBQ0gsU0FBUyxXQUFXLENBQ2xCLFlBQTRCLEVBQzVCLFFBQWdCLEVBQ2hCLE9BQWlCO0lBS2pCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtJQUNqQixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUE7SUFDM0IsTUFBTSxPQUFPLEdBQUc7UUFDZCxPQUFPO1FBQ1AsTUFBTTtRQUNOLFNBQVM7UUFDVCxPQUFPO1FBQ1AsUUFBUTtRQUNSLFNBQVM7UUFDVCxTQUFTO1FBQ1QsUUFBUTtRQUNSLFFBQVE7UUFDUixjQUFjO0tBQ0QsQ0FBQTtJQUVmLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxHQUFHLEdBQVcsSUFBQSxZQUFTLEVBQUMsT0FBTyxDQUFDLENBQUE7UUFDdEMsTUFBTSxJQUFJLEdBQWlCLElBQUEsWUFBUyxFQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2xELE1BQU0sY0FBYyxHQUFhLElBQUEsWUFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ25ELE1BQU0sVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxjQUFjLEVBQUUsQ0FBQTtRQUUzRCxTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQ3hCO0lBRUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUM5QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFVBQVU7SUFDakIsTUFBTSxHQUFHLEdBQUcsSUFBQSxTQUFNLEVBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzFCLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtBQUNwQyxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxVQUFrQixFQUFFLGFBQXFCO0lBSTFELE1BQU0sR0FBRyxHQUFHLFVBQVUsS0FBSyxhQUFhLENBQUE7SUFDeEMsSUFBSSxZQUFZLEdBQUcsVUFBVSxHQUFHLGFBQWEsQ0FBQTtJQUM3QyxJQUFJLGVBQWUsR0FBRyxhQUFhLEdBQUcsVUFBVSxDQUFBO0lBQ2hELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLEdBQUcsRUFBRTtRQUNQLE1BQU0sUUFBUSxHQUFHLFVBQVUsRUFBRSxDQUFBO1FBRTdCLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN4QixZQUFZLEdBQUcsSUFBSSxDQUFBO1NBQ3BCO2FBQU0sSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLGVBQWUsR0FBRyxJQUFJLENBQUE7U0FDdkI7S0FDRjtJQUVELElBQUksWUFBWSxFQUFFO1FBQ2hCLE1BQU0sR0FBRyxPQUFPLENBQUE7UUFDaEIsV0FBVyxHQUFHLDZCQUE2QixDQUFBO0tBQzVDO1NBQU0sSUFBSSxlQUFlLEVBQUU7UUFDMUIsTUFBTSxHQUFHLFVBQVUsQ0FBQTtRQUNuQixXQUFXLEdBQUcsbUJBQW1CLENBQUE7S0FDbEM7SUFFRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFBO0FBQ2hDLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsa0JBQWtCO0lBQ3pCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUUsQ0FBQztLQUNRLENBQUM7SUFDZixNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDLE9BQU87SUFFbkUsTUFBTSxhQUFhLEdBQUc7UUFDcEI7WUFDRSxJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxJQUFBLFlBQVMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN4RDtRQUNEO1lBQ0UsSUFBSSxFQUFFLGNBQWM7WUFDcEIsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBQSxZQUFTLEVBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEQ7UUFDRDtZQUNFLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBQSxZQUFTLEVBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEQ7UUFDRDtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBQSxZQUFTLEVBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEQ7UUFDRDtZQUNFLElBQUksRUFBRSw0QkFBNEI7WUFDbEMsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBQSxZQUFTLEVBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEQ7S0FDZ0IsQ0FBQTtJQUNuQixPQUFPLElBQUEsWUFBUyxFQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLE1BQU07SUFDYixNQUFNLFlBQVksR0FBRyxrQkFBa0IsRUFBRSxDQUFBO0lBQ3pDLE1BQU0sUUFBUSxHQUFXLFlBQVksQ0FBQyxJQUFJLENBQUE7SUFDMUMsTUFBTSxPQUFPLEdBQVksWUFBWSxDQUFDLFVBQVUsQ0FBQTtJQUdoRCxNQUFNLFVBQVUsR0FBRztRQUNqQixLQUFLO1FBQ0wsT0FBTztRQUNQLFFBQVE7UUFDUixRQUFRO1FBQ1IsV0FBVztLQUNHLENBQUE7SUFDaEIsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFeEQsTUFBTSxhQUFhLEdBQUc7UUFDcEIsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsV0FBVztRQUNYLFFBQVE7S0FDUyxDQUFBO0lBQ25CLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRzlELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUU3RCxNQUFNLFVBQVUsR0FBRztRQUNqQixZQUFZLEVBQUUsWUFBWSxDQUFDLElBQUk7UUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztRQUMvQixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDekQsS0FBSyxFQUFFO1lBQ0wsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUztZQUNoQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQzVCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUN0QyxDQUFDLGVBQWUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNO1NBQ25DO0tBQ0YsQ0FBQTtJQUVELE9BQU8sVUFBVSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxVQUFzQjtJQUMxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQTtJQUV4RSxPQUFPLElBQUksT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsWUFBWSxLQUFLLFdBQVcsZ0VBQWdFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtBQUN4TCxDQUFDO0FBRUQsU0FBZ0IsY0FBYztJQUM1QixPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCx3Q0FFQyJ9