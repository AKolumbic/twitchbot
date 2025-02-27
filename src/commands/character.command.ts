import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";

export class CharacterCommand implements Command {
  options: CommandOptions = {
    name: "character",
    description: "Get information about Drosshole's current characters",
    aliases: ["char", "characters"],
    permission: "everyone",
    usage: "!character [name]",
  };

  private characters = {
    gilbert: {
      name: "Gilbert Goldgrin",
      race: "Halfling",
      class: "Bard",
      campaign: "Stolen Fate (Pathfinder 2e)",
      description:
        "A celebrity polymath bard halfling known for his wit, charm, and encyclopedic knowledge. Gilbert uses his fame and talents to navigate through dangerous situations with style.",
    },
    brodi: {
      name: "Brodi Dankweed",
      race: "Tortle",
      class: "Druid",
      campaign: "Hometown Heroes (D&D)",
      description:
        "A teenage tortle druid with a heart of gold. Brodi is connected to nature and uses his druidic powers to protect his hometown and friends.",
    },
  };

  execute(context: CommandContext): void {
    const { client, channel, args } = context;

    // If no specific character requested, list all characters
    if (args.length === 0) {
      const characterList = Object.values(this.characters)
        .map((c) => `${c.name} (${c.race} ${c.class}) - ${c.campaign}`)
        .join(" | ");

      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Current characters: ${characterList}. Use !character <name> for details.`
      );
      return;
    }

    // Handle specific character request
    const characterName = args[0].toLowerCase();

    // Check for character matches
    let character = null;
    if (
      characterName.includes("gilbert") ||
      characterName.includes("gold") ||
      characterName.includes("bard") ||
      characterName.includes("halfling")
    ) {
      character = this.characters["gilbert"];
    } else if (
      characterName.includes("brodi") ||
      characterName.includes("dank") ||
      characterName.includes("tortle") ||
      characterName.includes("druid")
    ) {
      character = this.characters["brodi"];
    } else if (
      Object.prototype.hasOwnProperty.call(this.characters, characterName)
    ) {
      character =
        this.characters[characterName as keyof typeof this.characters];
    }

    if (character) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${character.name} - ${character.race} ${character.class} from ${character.campaign}: ${character.description}`
      );
    } else {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Character not found. Use !character to see all available characters.`
      );
    }
  }
}
