"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartyMembers = void 0;
function getPartyMembers() {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
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
exports.getPartyMembers = getPartyMembers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBhcnR5LW1lbWJlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL2dldC1wYXJ0eS1tZW1iZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLGVBQWU7SUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUNqQyxPQUFPLEVBQ1AsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQ3BCLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVyQixRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssU0FBUztZQUNaLE9BQU8sMkpBQTJKLENBQUM7UUFDckssS0FBSyxXQUFXO1lBQ2QsT0FBTyw4VEFBOFQsQ0FBQztRQUN4VSxLQUFLLFFBQVE7WUFDWCxPQUFPLDhLQUE4SyxDQUFDO1FBQ3hMO1lBQ0UsT0FBTyxzQ0FBc0MsQ0FBQztLQUNqRDtBQUNILENBQUM7QUFoQkQsMENBZ0JDIn0=