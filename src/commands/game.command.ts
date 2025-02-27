import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";

export class GameCommand implements Command {
  options: CommandOptions = {
    name: "game",
    description: "Get information about games Drosshole streams",
    aliases: ["games", "videogame"],
    permission: "everyone",
    usage: "!game [name]",
  };

  private games = {
    helldivers: {
      name: "Helldivers 2",
      genre: "Third-person shooter",
      description:
        "A cooperative shooter where players fight to protect Super Earth from alien threats. SPREAD MANAGED DEMOCRACY! FOR SUPER EARTH!",
      releaseYear: 2023,
    },
    hearthstone: {
      name: "Hearthstone",
      genre: "Digital card game",
      description:
        "Blizzard's popular digital card game where players build decks and battle against each other using various heroes and strategies.",
      releaseYear: 2014,
    },
    baldurs: {
      name: "Baldur's Gate 3",
      genre: "CRPG",
      description:
        "An epic RPG set in the Forgotten Realms, featuring turn-based combat, deep character customization, and a rich narrative.",
      releaseYear: 2023,
    },
    cyberpunk: {
      name: "Cyberpunk 2077",
      genre: "Action RPG",
      description:
        "An open-world RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
      releaseYear: 2020,
    },
  };

  execute(context: CommandContext): void {
    const { client, channel, args } = context;

    // If no specific game requested, list all games
    if (args.length === 0) {
      const gameList = Object.values(this.games)
        .map((g) => g.name)
        .join(", ");

      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Games I stream: ${gameList}. Use !game <name> for details.`
      );
      return;
    }

    // Handle specific game request
    const gameName = args.join(" ").toLowerCase();

    // Check for game matches
    let game = null;
    if (gameName.includes("helldivers") || gameName.includes("hd2")) {
      game = this.games["helldivers"];
    } else if (gameName.includes("hearth") || gameName.includes("hs")) {
      game = this.games["hearthstone"];
    } else if (
      gameName.includes("baldur") ||
      gameName.includes("bg3") ||
      gameName.includes("gate")
    ) {
      game = this.games["baldurs"];
    } else if (
      gameName.includes("cyber") ||
      gameName.includes("2077") ||
      gameName.includes("cp77")
    ) {
      game = this.games["cyberpunk"];
    }

    if (game) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${game.name} (${game.releaseYear}) - ${game.genre}: ${game.description}`
      );
    } else {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: Game not found. Use !game to see all available games.`
      );
    }
  }
}
