"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCommand = void 0;
const config_1 = require("../config");
class GameCommand {
    constructor() {
        this.options = {
            name: "game",
            description: "Get information about games Drosshole streams",
            aliases: ["games", "videogame"],
            permission: "everyone",
            usage: "!game [name]",
        };
        this.games = {
            helldivers: {
                name: "Helldivers 2",
                genre: "Third-person shooter",
                description: "A cooperative shooter where players fight to protect Super Earth from alien threats. SPREAD MANAGED DEMOCRACY! FOR SUPER EARTH!",
                releaseYear: 2023,
            },
            hearthstone: {
                name: "Hearthstone",
                genre: "Digital card game",
                description: "Blizzard's popular digital card game where players build decks and battle against each other using various heroes and strategies.",
                releaseYear: 2014,
            },
            baldurs: {
                name: "Baldur's Gate 3",
                genre: "CRPG",
                description: "An epic RPG set in the Forgotten Realms, featuring turn-based combat, deep character customization, and a rich narrative.",
                releaseYear: 2023,
            },
            cyberpunk: {
                name: "Cyberpunk 2077",
                genre: "Action RPG",
                description: "An open-world RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
                releaseYear: 2020,
            },
        };
    }
    execute(context) {
        const { client, channel, args } = context;
        // If no specific game requested, list all games
        if (args.length === 0) {
            const gameList = Object.values(this.games)
                .map((g) => g.name)
                .join(", ");
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Games I stream: ${gameList}. Use !game <name> for details.`);
            return;
        }
        // Handle specific game request
        const gameName = args.join(" ").toLowerCase();
        // Check for game matches
        let game = null;
        if (gameName.includes("helldivers") || gameName.includes("hd2")) {
            game = this.games["helldivers"];
        }
        else if (gameName.includes("hearth") || gameName.includes("hs")) {
            game = this.games["hearthstone"];
        }
        else if (gameName.includes("baldur") ||
            gameName.includes("bg3") ||
            gameName.includes("gate")) {
            game = this.games["baldurs"];
        }
        else if (gameName.includes("cyber") ||
            gameName.includes("2077") ||
            gameName.includes("cp77")) {
            game = this.games["cyberpunk"];
        }
        if (game) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${game.name} (${game.releaseYear}) - ${game.genre}: ${game.description}`);
        }
        else {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: Game not found. Use !game to see all available games.`);
        }
    }
}
exports.GameCommand = GameCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWUuY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBdUM7QUFFdkMsTUFBYSxXQUFXO0lBQXhCO1FBQ0UsWUFBTyxHQUFtQjtZQUN4QixJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztZQUMvQixVQUFVLEVBQUUsVUFBVTtZQUN0QixLQUFLLEVBQUUsY0FBYztTQUN0QixDQUFDO1FBRU0sVUFBSyxHQUFHO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxjQUFjO2dCQUNwQixLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixXQUFXLEVBQ1QsaUlBQWlJO2dCQUNuSSxXQUFXLEVBQUUsSUFBSTthQUNsQjtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsV0FBVyxFQUNULG1JQUFtSTtnQkFDckksV0FBVyxFQUFFLElBQUk7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsV0FBVyxFQUNULDJIQUEySDtnQkFDN0gsV0FBVyxFQUFFLElBQUk7YUFDbEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFdBQVcsRUFDVCx5R0FBeUc7Z0JBQzNHLFdBQVcsRUFBRSxJQUFJO2FBQ2xCO1NBQ0YsQ0FBQztJQXFESixDQUFDO0lBbkRDLE9BQU8sQ0FBQyxPQUF1QjtRQUM3QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFMUMsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVkLE1BQU0sQ0FBQyxHQUFHLENBQ1IsT0FBTyxFQUNQLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHFCQUFxQixRQUFRLGlDQUFpQyxDQUNqRixDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsK0JBQStCO1FBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUMseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xDO2FBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUMzQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUN4QixRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUN6QjtZQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUMxQixRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN6QixRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUN6QjtZQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsR0FBRyxDQUNSLE9BQU8sRUFDUCxHQUFHLG1CQUFVLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDOUYsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLENBQUMsR0FBRyxDQUNSLE9BQU8sRUFDUCxHQUFHLG1CQUFVLENBQUMsSUFBSSx5REFBeUQsQ0FDNUUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGO0FBM0ZELGtDQTJGQyJ9