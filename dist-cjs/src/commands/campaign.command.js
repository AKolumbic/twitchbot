"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCommand = void 0;
const config_1 = require("../config");
class CampaignCommand {
    constructor() {
        this.options = {
            name: "campaign",
            description: "Get information about current TTRPG campaigns",
            aliases: ["campaigns"],
            permission: "everyone",
            usage: "!campaign [name]",
        };
        this.campaigns = {
            "stolen-fate": {
                name: "Stolen Fate",
                system: "Pathfinder 2e",
                day: "Thursdays",
                character: "Gilbert Goldgrin (celebrity polymath bard halfling)",
                description: "A thrilling Pathfinder 2e adventure where Gilbert Goldgrin, a celebrity polymath bard halfling, navigates a world of intrigue and danger.",
            },
            "hometown-heroes": {
                name: "Hometown Heroes",
                system: "D&D",
                day: "Saturdays",
                character: "Brodi Dankweed (teenage tortle druid)",
                description: "Join Brodi Dankweed, a teenage tortle druid, as he and his friends protect their hometown in this lighthearted D&D campaign.",
            },
        };
    }
    execute(context) {
        const { client, channel, args } = context;
        // If no specific campaign requested, list all campaigns
        if (args.length === 0) {
            const campaignList = Object.values(this.campaigns)
                .map((c) => `${c.name} (${c.system}) - ${c.day}`)
                .join(" | ");
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Current campaigns: ${campaignList}. Use !campaign <name> for details or !character for character info.`);
            return;
        }
        // Handle specific campaign request
        const campaignName = args.join("-").toLowerCase();
        // Special cases for partial matches
        let campaign = null;
        if (campaignName.includes("stolen") ||
            campaignName.includes("fate") ||
            campaignName.includes("pathfinder")) {
            campaign = this.campaigns["stolen-fate"];
        }
        else if (campaignName.includes("hometown") ||
            campaignName.includes("heroes") ||
            campaignName.includes("dnd") ||
            campaignName.includes("d&d")) {
            campaign = this.campaigns["hometown-heroes"];
        }
        else if (Object.prototype.hasOwnProperty.call(this.campaigns, campaignName)) {
            campaign = this.campaigns[campaignName];
        }
        if (campaign) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${campaign.name} (${campaign.system}) - ${campaign.day}: ${campaign.description} Character: ${campaign.character}`);
        }
        else {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Campaign not found. Use !campaign to see all available campaigns.`);
        }
    }
}
exports.CampaignCommand = CampaignCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtcGFpZ24uY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9jYW1wYWlnbi5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNDQUF1QztBQUV2QyxNQUFhLGVBQWU7SUFBNUI7UUFDRSxZQUFPLEdBQW1CO1lBQ3hCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLEtBQUssRUFBRSxrQkFBa0I7U0FDMUIsQ0FBQztRQUVNLGNBQVMsR0FBRztZQUNsQixhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE1BQU0sRUFBRSxlQUFlO2dCQUN2QixHQUFHLEVBQUUsV0FBVztnQkFDaEIsU0FBUyxFQUFFLHFEQUFxRDtnQkFDaEUsV0FBVyxFQUNULDJJQUEySTthQUM5STtZQUNELGlCQUFpQixFQUFFO2dCQUNqQixJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsV0FBVztnQkFDaEIsU0FBUyxFQUFFLHVDQUF1QztnQkFDbEQsV0FBVyxFQUNULDhIQUE4SDthQUNqSTtTQUNGLENBQUM7SUF5REosQ0FBQztJQXZEQyxPQUFPLENBQUMsT0FBdUI7UUFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTFDLHdEQUF3RDtRQUN4RCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDL0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVmLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHdCQUF3QixZQUFZLHNFQUFzRSxDQUM3SCxDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsbUNBQW1DO1FBQ25DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbEQsb0NBQW9DO1FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUNFLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQy9CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ25DO1lBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7YUFBTSxJQUNMLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2pDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQy9CLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzVCLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQzVCO1lBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQ0wsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNsQyxJQUFJLENBQUMsU0FBUyxFQUNkLFlBQTJDLENBQzVDLEVBQ0Q7WUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUEyQyxDQUFDLENBQUM7U0FDeEU7UUFFRCxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsTUFBTSxPQUFPLFFBQVEsQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLFdBQVcsZUFBZSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQ3hJLENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUkscUVBQXFFLENBQ3hGLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRjtBQW5GRCwwQ0FtRkMifQ==