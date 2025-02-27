"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterCommand = void 0;
const config_1 = require("../config");
class CharacterCommand {
    constructor() {
        this.options = {
            name: "character",
            description: "Get information about Drosshole's current characters",
            aliases: ["char", "characters"],
            permission: "everyone",
            usage: "!character [name]",
        };
        this.characters = {
            gilbert: {
                name: "Gilbert Goldgrin",
                race: "Halfling",
                class: "Bard",
                campaign: "Stolen Fate (Pathfinder 2e)",
                description: "A celebrity polymath bard halfling known for his wit, charm, and encyclopedic knowledge. Gilbert uses his fame and talents to navigate through dangerous situations with style.",
            },
            brodi: {
                name: "Brodi Dankweed",
                race: "Tortle",
                class: "Druid",
                campaign: "Hometown Heroes (D&D)",
                description: "A teenage tortle druid with a heart of gold. Brodi is connected to nature and uses his druidic powers to protect his hometown and friends.",
            },
        };
    }
    execute(context) {
        const { client, channel, args } = context;
        // If no specific character requested, list all characters
        if (args.length === 0) {
            const characterList = Object.values(this.characters)
                .map((c) => `${c.name} (${c.race} ${c.class}) - ${c.campaign}`)
                .join(" | ");
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Current characters: ${characterList}. Use !character <name> for details.`);
            return;
        }
        // Handle specific character request
        const characterName = args[0].toLowerCase();
        // Check for character matches
        let character = null;
        if (characterName.includes("gilbert") ||
            characterName.includes("gold") ||
            characterName.includes("bard") ||
            characterName.includes("halfling")) {
            character = this.characters["gilbert"];
        }
        else if (characterName.includes("brodi") ||
            characterName.includes("dank") ||
            characterName.includes("tortle") ||
            characterName.includes("druid")) {
            character = this.characters["brodi"];
        }
        else if (Object.prototype.hasOwnProperty.call(this.characters, characterName)) {
            character =
                this.characters[characterName];
        }
        if (character) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${character.name} - ${character.race} ${character.class} from ${character.campaign}: ${character.description}`);
        }
        else {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Character not found. Use !character to see all available characters.`);
        }
    }
}
exports.CharacterCommand = CharacterCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyLmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvY2hhcmFjdGVyLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQXVDO0FBRXZDLE1BQWEsZ0JBQWdCO0lBQTdCO1FBQ0UsWUFBTyxHQUFtQjtZQUN4QixJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsc0RBQXNEO1lBQ25FLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7WUFDL0IsVUFBVSxFQUFFLFVBQVU7WUFDdEIsS0FBSyxFQUFFLG1CQUFtQjtTQUMzQixDQUFDO1FBRU0sZUFBVSxHQUFHO1lBQ25CLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsV0FBVyxFQUNULGlMQUFpTDthQUNwTDtZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxXQUFXLEVBQ1QsNElBQTRJO2FBQy9JO1NBQ0YsQ0FBQztJQXdESixDQUFDO0lBdERDLE9BQU8sQ0FBQyxPQUF1QjtRQUM3QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFMUMsMERBQTBEO1FBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUNqRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFZixNQUFNLENBQUMsR0FBRyxDQUNSLE9BQU8sRUFDUCxHQUFHLG1CQUFVLENBQUMsSUFBSSx5QkFBeUIsYUFBYSxzQ0FBc0MsQ0FDL0YsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELG9DQUFvQztRQUNwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUMsOEJBQThCO1FBQzlCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUNFLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ2pDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzlCLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzlCLGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQ2xDO1lBQ0EsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEM7YUFBTSxJQUNMLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQy9CLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzlCLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ2hDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQy9CO1lBQ0EsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxFQUNwRTtZQUNBLFNBQVM7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUE2QyxDQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksTUFBTSxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLFNBQVMsU0FBUyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQ3BJLENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUksd0VBQXdFLENBQzNGLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRjtBQWxGRCw0Q0FrRkMifQ==