"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignDescription = void 0;
function getCampaignDescription() {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    switch (day) {
        case 'Tuesday':
            return `Tonight we're playing Carry the Knowledge, a D&D 5e campaign set in Viridium's Greatest City, Gildenberg!`;
        case 'Wednesday':
            return `Tonight we're playing A Clash of Two Fates, a D&D 5e campaign set in Viridium's brutal outlander continent, Siccrum.`;
        case 'Sunday':
            return `Tonight we're playing The Sea of Sorrows, a D&D 5e campaign set in a mythical sea where danger lurks over the horizon...`;
        default:
            return `You caught me on the rare occasion where I'm not streaming D&D lol`;
    }
}
exports.getCampaignDescription = getCampaignDescription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNhbXBhaWduLWRlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy9nZXQtY2FtcGFpZ24tZGVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0Isc0JBQXNCO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FDakMsT0FBTyxFQUNQLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUNwQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFFckIsUUFBUSxHQUFHLEVBQUU7UUFDWCxLQUFLLFNBQVM7WUFDWixPQUFPLDJHQUEyRyxDQUFDO1FBQ3JILEtBQUssV0FBVztZQUNkLE9BQU8sc0hBQXNILENBQUM7UUFDaEksS0FBSyxRQUFRO1lBQ1gsT0FBTywwSEFBMEgsQ0FBQztRQUNwSTtZQUNFLE9BQU8sb0VBQW9FLENBQUM7S0FDL0U7QUFDSCxDQUFDO0FBaEJELHdEQWdCQyJ9