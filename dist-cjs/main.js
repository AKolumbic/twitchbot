"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_bot_1 = require("./src/configure-bot");
// Configure and start the Twitch bot client
const bot = (0, configure_bot_1.configureBot)();
// Handle process termination gracefully
process.on("SIGINT", () => {
    console.log("Disconnecting from Twitch...");
    bot.disconnect();
    process.exit(0);
});
console.log("Bot is starting up...");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBbUQ7QUFFbkQsNENBQTRDO0FBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUEsNEJBQVksR0FBRSxDQUFDO0FBRTNCLHdDQUF3QztBQUN4QyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzVDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDIn0=