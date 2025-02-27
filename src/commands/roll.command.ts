import { Command, CommandContext, CommandOptions } from "./command.interface";
import { BOT_CONFIG } from "../config";

export class RollCommand implements Command {
  options: CommandOptions = {
    name: "roll",
    description: "Roll dice for D&D or other tabletop games",
    usage: "!roll <number>d<sides> [+/-<modifier>]",
    permission: "everyone",
    aliases: ["dice", "r"],
  };

  private diceRegex = /^(\d+)d(\d+)(?:([+-])(\d+))?$/i;

  execute(context: CommandContext): void {
    const { client, channel, args, userstate } = context;
    const chatter = `@${userstate.username}`;

    // If no dice notation is provided
    if (args.length === 0) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${chatter}, please specify the dice to roll. Example: !roll 2d20 or !roll 1d20+5`
      );
      return;
    }

    const diceNotation = args[0].toLowerCase();
    const match = this.diceRegex.exec(diceNotation);

    if (!match) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${chatter}, invalid dice format. Use format like: 2d6, 1d20+4, 3d8-2`
      );
      return;
    }

    const count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const hasModifier = match[3] !== undefined;
    const modifierSign = match[3] || "+";
    const modifierValue = hasModifier ? parseInt(match[4], 10) : 0;

    // Validate roll parameters
    if (count <= 0 || count > 20) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${chatter}, you can roll between 1 and 20 dice at once.`
      );
      return;
    }

    if (sides <= 0 || sides > 1000) {
      client.say(
        channel,
        `${BOT_CONFIG.NAME}: ${chatter}, dice must have between 1 and 1000 sides.`
      );
      return;
    }

    // Roll the dice
    const rolls: number[] = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }

    // Apply modifier
    const modifierAmount =
      modifierSign === "+" ? modifierValue : -modifierValue;
    const finalTotal = total + modifierAmount;

    // Format the response
    let response = `${BOT_CONFIG.NAME}: ${chatter} rolled ${diceNotation} → `;

    if (count === 1 && !hasModifier) {
      // Simple single die roll
      response += `${rolls[0]}`;
    } else if (count === 1 && hasModifier) {
      // Single die with modifier
      response += `${rolls[0]} ${modifierSign} ${modifierValue} = ${finalTotal}`;
    } else if (count > 1 && !hasModifier) {
      // Multiple dice without modifier
      response += `${rolls.join(" + ")} = ${total}`;
    } else {
      // Multiple dice with modifier
      response += `(${rolls.join(
        " + "
      )} = ${total}) ${modifierSign} ${modifierValue} = ${finalTotal}`;
    }

    client.say(channel, response);
  }
}

