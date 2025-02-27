"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollCommand = void 0;
const config_1 = require("../config");
class RollCommand {
    constructor() {
        this.options = {
            name: "roll",
            description: "Roll dice for D&D or other tabletop games",
            usage: "!roll <number>d<sides> [+/-<modifier>]",
            permission: "everyone",
            aliases: ["dice", "r"],
        };
        this.diceRegex = /^(\d+)d(\d+)(?:([+-])(\d+))?$/i;
    }
    execute(context) {
        const { client, channel, args, userstate } = context;
        const chatter = `@${userstate.username}`;
        // If no dice notation is provided
        if (args.length === 0) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${chatter}, please specify the dice to roll. Example: !roll 2d20 or !roll 1d20+5`);
            return;
        }
        const diceNotation = args[0].toLowerCase();
        const match = this.diceRegex.exec(diceNotation);
        if (!match) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${chatter}, invalid dice format. Use format like: 2d6, 1d20+4, 3d8-2`);
            return;
        }
        const count = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);
        const hasModifier = match[3] !== undefined;
        const modifierSign = match[3] || "+";
        const modifierValue = hasModifier ? parseInt(match[4], 10) : 0;
        // Validate roll parameters
        if (count <= 0 || count > 20) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${chatter}, you can roll between 1 and 20 dice at once.`);
            return;
        }
        if (sides <= 0 || sides > 1000) {
            client.say(channel, `${config_1.BOT_CONFIG.NAME}: ${chatter}, dice must have between 1 and 1000 sides.`);
            return;
        }
        // Roll the dice
        const rolls = [];
        let total = 0;
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }
        // Apply modifier
        const modifierAmount = modifierSign === "+" ? modifierValue : -modifierValue;
        const finalTotal = total + modifierAmount;
        // Format the response
        let response = `${config_1.BOT_CONFIG.NAME}: ${chatter} rolled ${diceNotation} → `;
        if (count === 1 && !hasModifier) {
            // Simple single die roll
            response += `${rolls[0]}`;
        }
        else if (count === 1 && hasModifier) {
            // Single die with modifier
            response += `${rolls[0]} ${modifierSign} ${modifierValue} = ${finalTotal}`;
        }
        else if (count > 1 && !hasModifier) {
            // Multiple dice without modifier
            response += `${rolls.join(" + ")} = ${total}`;
        }
        else {
            // Multiple dice with modifier
            response += `(${rolls.join(" + ")} = ${total}) ${modifierSign} ${modifierValue} = ${finalTotal}`;
        }
        client.say(channel, response);
    }
}
exports.RollCommand = RollCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbC5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3JvbGwuY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBdUM7QUFFdkMsTUFBYSxXQUFXO0lBQXhCO1FBQ0UsWUFBTyxHQUFtQjtZQUN4QixJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsS0FBSyxFQUFFLHdDQUF3QztZQUMvQyxVQUFVLEVBQUUsVUFBVTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1NBQ3ZCLENBQUM7UUFFTSxjQUFTLEdBQUcsZ0NBQWdDLENBQUM7SUFxRnZELENBQUM7SUFuRkMsT0FBTyxDQUFDLE9BQXVCO1FBQzdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFekMsa0NBQWtDO1FBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FDUixPQUFPLEVBQ1AsR0FBRyxtQkFBVSxDQUFDLElBQUksS0FBSyxPQUFPLHdFQUF3RSxDQUN2RyxDQUFDO1lBQ0YsT0FBTztTQUNSO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLENBQUMsR0FBRyxDQUNSLE9BQU8sRUFDUCxHQUFHLG1CQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sNERBQTRELENBQzNGLENBQUM7WUFDRixP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