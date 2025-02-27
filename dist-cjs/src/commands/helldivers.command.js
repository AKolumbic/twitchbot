"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelldiversCommand = void 0;
const config_1 = require("../config");
class HelldiversCommand {
    constructor() {
        this.options = {
            name: "helldivers",
            description: "Get a random Helldivers 2 tip or strategy",
            aliases: ["hd2", "helldivers2", "divers"],
            permission: "everyone",
        };
        this.tips = [
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
    }
    execute(context) {
        const { client, channel } = context;
        // Select a random tip
        const randomTip = this.tips[Math.floor(Math.random() * this.tips.length)];
        client.say(channel, `${config_1.BOT_CONFIG.NAME}: HELLDIVERS 2 TIP: ${randomTip}`);
    }
}
exports.HelldiversCommand = HelldiversCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbGRpdmVycy5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2hlbGxkaXZlcnMuY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBdUM7QUFFdkMsTUFBYSxpQkFBaUI7SUFBOUI7UUFDRSxZQUFPLEdBQW1CO1lBQ3hCLElBQUksRUFBRSxZQUFZO1lBQ2xCLFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUM7WUFDekMsVUFBVSxFQUFFLFVBQVU7U0FDdkIsQ0FBQztRQUVNLFNBQUksR0FBRztZQUNiLHdFQUF3RTtZQUN4RSw2RUFBNkU7WUFDN0UsbUZBQW1GO1lBQ25GLDJFQUEyRTtZQUMzRSx1RUFBdUU7WUFDdkUseUVBQXlFO1lBQ3pFLHdGQUF3RjtZQUN4RixxRUFBcUU7WUFDckUscUVBQXFFO1lBQ3JFLGlFQUFpRTtZQUNqRSw0RUFBNEU7WUFDNUUsbUZBQW1GO1lBQ25GLDRFQUE0RTtZQUM1RSwyRUFBMkU7WUFDM0Usd0VBQXdFO1lBQ3hFLG9FQUFvRTtZQUNwRSw0RUFBNEU7WUFDNUUsd0VBQXdFO1lBQ3hFLDRGQUE0RjtZQUM1RiwwRUFBMEU7U0FDM0UsQ0FBQztJQVVKLENBQUM7SUFSQyxPQUFPLENBQUMsT0FBdUI7UUFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFcEMsc0JBQXNCO1FBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLHVCQUF1QixTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRjtBQXZDRCw4Q0F1Q0MifQ==