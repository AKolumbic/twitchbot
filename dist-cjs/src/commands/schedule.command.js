"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCommand = void 0;
const config_1 = require("../config");
class ScheduleCommand {
    constructor() {
        this.options = {
            name: "schedule",
            description: "Get information about Drosshole's streaming schedule",
            aliases: ["when", "streams"],
            permission: "everyone",
        };
        this.schedule = [
            {
                day: "Thursday",
                time: "8:00 PM EST",
                activity: "Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin)",
                description: "Weekly Pathfinder 2e session",
            },
            {
                day: "Saturday",
                time: "7:00 PM EST",
                activity: "D&D - Hometown Heroes campaign (Brodi Dankweed)",
                description: "Biweekly D&D session",
            },
            {
                day: "Various weeknights",
                time: "9:00 PM EST",
                activity: "Video Games",
                description: "Helldivers 2, Hearthstone, Baldur's Gate 3, or Cyberpunk 2077",
            },
        ];
    }
    execute(context) {
        const { client, channel } = context;
        const today = new Date();
        const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
        // Find today's stream, if any
        const todayStream = this.schedule.find((s) => s.day === dayOfWeek);
        // Generate schedule message
        const scheduleMessage = this.schedule
            .map((s) => `${s.day} @ ${s.time}: ${s.activity}`)
            .join(" | ");
        let message = `${config_1.BOT_CONFIG.NAME}: Stream Schedule: ${scheduleMessage}`;
        // Add today's stream info if applicable
        if (todayStream) {
            message += ` | TODAY: ${todayStream.activity} @ ${todayStream.time}`;
        }
        client.say(channel, message);
    }
}
exports.ScheduleCommand = ScheduleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9zY2hlZHVsZS5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNDQUF1QztBQUV2QyxNQUFhLGVBQWU7SUFBNUI7UUFDRSxZQUFPLEdBQW1CO1lBQ3hCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFBRSxzREFBc0Q7WUFDbkUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUM1QixVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUFDO1FBRU0sYUFBUSxHQUFHO1lBQ2pCO2dCQUNFLEdBQUcsRUFBRSxVQUFVO2dCQUNmLElBQUksRUFBRSxhQUFhO2dCQUNuQixRQUFRLEVBQUUseURBQXlEO2dCQUNuRSxXQUFXLEVBQUUsOEJBQThCO2FBQzVDO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFFBQVEsRUFBRSxpREFBaUQ7Z0JBQzNELFdBQVcsRUFBRSxzQkFBc0I7YUFDcEM7WUFDRDtnQkFDRSxHQUFHLEVBQUUsb0JBQW9CO2dCQUN6QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFdBQVcsRUFDVCwrREFBK0Q7YUFDbEU7U0FDRixDQUFDO0lBeUJKLENBQUM7SUF2QkMsT0FBTyxDQUFDLE9BQXVCO1FBQzdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRXBDLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRXpFLDhCQUE4QjtRQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUVuRSw0QkFBNEI7UUFDNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDbEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWYsSUFBSSxPQUFPLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksc0JBQXNCLGVBQWUsRUFBRSxDQUFDO1FBRXhFLHdDQUF3QztRQUN4QyxJQUFJLFdBQVcsRUFBRTtZQUNmLE9BQU8sSUFBSSxhQUFhLFdBQVcsQ0FBQyxRQUFRLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBckRELDBDQXFEQyJ9