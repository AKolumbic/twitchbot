import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";

export class CampaignCommand implements Command {
  options: CommandOptions = {
    name: "campaign",
    description: "Get information about current TTRPG campaigns",
    aliases: ["campaigns"],
    permission: "everyone",
    usage: "!campaign [name]",
  };

  private campaigns = {
    "stolen-fate": {
      name: "Stolen Fate",
      system: "Pathfinder 2e",
      day: "Thursdays",
      character: "Gilbert Goldgrin (celebrity polymath bard halfling)",
      description:
        "A thrilling Pathfinder 2e adventure where Gilbert Goldgrin, a celebrity polymath bard halfling, navigates a world of intrigue and danger.",
    },
    "hometown-heroes": {
      name: "Hometown Heroes",
      system: "D&D",
      day: "Saturdays",
      character: "Brodi Dankweed (teenage tortle druid)",
      description:
        "Join Brodi Dankweed, a teenage tortle druid, as he and his friends protect their hometown in this lighthearted D&D campaign.",
    },
  };

  execute(context: CommandContext): void {
    const { client, channel, args } = context;

    // If no specific campaign requested, list all campaigns
    if (args.length === 0) {
      const campaignList = Object.values(this.campaigns)
        .map((c) => `${c.name} (${c.system}) - ${c.day}`)
        .join(" | ");

      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Current campaigns: ${campaignList}. Use !campaign <name> for details or !character for character info.`
      );
      return;
    }

    // Handle specific campaign request
    const campaignName = args.join("-").toLowerCase();

    // Special cases for partial matches
    let campaign = null;
    if (
      campaignName.includes("stolen") ||
      campaignName.includes("fate") ||
      campaignName.includes("pathfinder")
    ) {
      campaign = this.campaigns["stolen-fate"];
    } else if (
      campaignName.includes("hometown") ||
      campaignName.includes("heroes") ||
      campaignName.includes("dnd") ||
      campaignName.includes("d&d")
    ) {
      campaign = this.campaigns["hometown-heroes"];
    } else if (
      Object.prototype.hasOwnProperty.call(
        this.campaigns,
        campaignName as keyof typeof this.campaigns
      )
    ) {
      campaign = this.campaigns[campaignName as keyof typeof this.campaigns];
    }

    if (campaign) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${campaign.name} (${campaign.system}) - ${campaign.day}: ${campaign.description} Character: ${campaign.character}`
      );
    } else {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Campaign not found. Use !campaign to see all available campaigns.`
      );
    }
  }
}

