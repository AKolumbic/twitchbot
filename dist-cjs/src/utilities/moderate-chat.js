"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderateChat = void 0;
const secrets_1 = require("../../secrets");
function moderateChat(message, chatbot, channel, userstate, messageID) {
    if (secrets_1.banlist.some(blockedWord => message.includes(blockedWord))) {
        chatbot.deletemessage(channel, messageID);
        chatbot.say(channel, `@${userstate.username} we don't like that kinda talk around here, your message was deleted.`);
    }
}
exports.moderateChat = moderateChat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdGUtY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsaXRpZXMvbW9kZXJhdGUtY2hhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBd0M7QUFFeEMsU0FBZ0IsWUFBWSxDQUMxQixPQUFlLEVBQ2YsT0FBZSxFQUNmLE9BQWUsRUFDZixTQUFvQixFQUNwQixTQUFpQjtJQUVqQixJQUFJLGlCQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO1FBQzlELE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksU0FBUyxDQUFDLFFBQVEsdUVBQXVFLENBQUMsQ0FBQztLQUNySDtBQUNILENBQUM7QUFYRCxvQ0FXQyJ9