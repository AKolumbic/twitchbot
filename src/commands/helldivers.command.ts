import { Command, CommandContext, CommandOptions } from "./command.interface.js";
import { BOT_CONFIG } from "../config.js";

export class HelldiversCommand implements Command {
  options: CommandOptions = {
    name: "helldivers",
    description: "Get a random Helldivers 2 tip or strategy",
    aliases: ["hd2", "helldivers2", "divers"],
    permission: "everyone",
  };

  private tips = [
    "FOR SUPER EARTH! Remember to spread managed democracy wherever you go!",
    "Stratagems can be called in much faster by using diagonals in the sequence.",
    "The Railgun can penetrate multiple enemies - line them up for maximum efficiency!",
    "Communication is key - use the comms wheel to coordinate with your squad.",
    "Don't forget to extract civilians - it contributes to the war effort!",
    "Resupply frequently to never run out of ammunition during tough fights.",
    "Shield Generator Backpacks can help your entire team survive high-difficulty missions.",
    "When defending, set up choke points with static defenses and mines.",
    "Remember to call in the shuttle with enough time to extract safely.",
    "Friendly fire is a feature, not a bug. Watch your aim, soldier!",
    "Different exosuits are useful for different mission types - choose wisely.",
    "The Eagle 500kg Bomb can quickly eliminate large groups of enemies or objectives.",
    "Liberty and Democracy are non-negotiable. Death to the enemies of freedom!",
    "The Expendable Anti-Tank can take down even the toughest armored enemies.",
    "Don't bunch up when Automatons start calling in their orbital strikes.",
    "Remember: Service guarantees citizenship. Are you doing your part?",
    "Teamwork makes the dream work - revive fallen teammates whenever possible.",
    "Save your heavy weapons for high-priority targets, not basic infantry.",
    "The Recoilless Rifle is powerful but requires a Support Pack buddy for maximum efficiency.",
    "Swimming in bug spray is the proper way to handle Terminid infestations!",
  ];

  execute(context: CommandContext): void {
    const { client, channel } = context;

    // Select a random tip
    const randomTip = this.tips[Math.floor(Math.random() * this.tips.length)];

    client.say(channel, `${BOT_CONFIG.NAME}: HELLDIVERS 2 TIP: ${randomTip}`);
  }
}

