import { Command, CommandContext, CommandOptions } from "./command.interface.js";
import { BOT_CONFIG } from "../config.js";

export class ScheduleCommand implements Command {
  options: CommandOptions = {
    name: "schedule",
    description: "Get information about Drosshole's streaming schedule",
    aliases: ["when", "streams"],
    permission: "everyone",
  };

  private schedule = [
    {
      day: "Thursday",
      time: "6:00 PM PST",
      activity: "Pathfinder 2e - Stolen Fate campaign (Gilbert Goldgrin)",
      description: "Weekly Pathfinder 2e session",
    },
    {
      day: "Saturday",
      time: "6:00 PM PST",
      activity: "D&D - Hometown Heroes campaign (Brodi Dankweed)",
      description: "Biweekly D&D session",
    },
    {
      day: "Various weeknights",
      time: "6:00 PM PST",
      activity: "Video Games",
      description:
        "Helldivers 2, Hearthstone, Baldur's Gate 3, or Cyberpunk 2077",
    },
  ];

  execute(context: CommandContext): void {
    const { client, channel } = context;

    const today = new Date();
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });

    // Find today's stream, if any
    const todayStream = this.schedule.find((s) => s.day === dayOfWeek);

    // Generate schedule message
    const scheduleMessage = this.schedule
      .map((s) => `${s.day} @ ${s.time}: ${s.activity}`)
      .join(" | ");

    let message = `${BOT_CONFIG.NAME}: Stream Schedule: ${scheduleMessage}`;

    // Add today's stream info if applicable
    if (todayStream) {
      message += ` | TODAY: ${todayStream.activity} @ ${todayStream.time}`;
    }

    client.say(channel, message);
  }
}

