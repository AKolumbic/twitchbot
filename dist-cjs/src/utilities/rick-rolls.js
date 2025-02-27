"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rickRoll = void 0;
function rickRoll(command, chatbot, channel, messageID) {
    let wasRickRolled = false;
    if (command === '!rickRoll') {
        chatbot.deletemessage(channel, messageID);
        wasRickRolled = true;
        setTimeout(() => {
            chatbot.say(channel, `DROSSBOT: https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
        }, 60000);
    }
    if (command === 'never gonna give you up') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: Never gonna let you down`);
    }
    if (command === 'never gonna run around') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: and desert you`);
    }
    if (command === 'never gonna run around and desert you') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: Never gonna make you cry`);
    }
    if (command === 'never gonna make you cry') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: Never gonna say goodbye`);
    }
    if (command === 'never gonna say goodbye') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: Never gonna tell a lie and hurt you`);
    }
    if (command === 'never gonna tell a lie') {
        wasRickRolled = true;
        chatbot.say(channel, `DROSSBOT: And hurt you`);
    }
    return wasRickRolled;
}
exports.rickRoll = rickRoll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljay1yb2xscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsaXRpZXMvcmljay1yb2xscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixRQUFRLENBQ3RCLE9BQWUsRUFDZixPQUFlLEVBQ2YsT0FBZSxFQUNmLFNBQWlCO0lBRWpCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztJQUUxQixJQUFJLE9BQU8sS0FBSyxXQUFXLEVBQUU7UUFDM0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsdURBQXVELENBQUMsQ0FBQztRQUNoRixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDWDtJQUVELElBQUksT0FBTyxLQUFLLHlCQUF5QixFQUFFO1FBQ3pDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztLQUM1RDtJQUVELElBQUksT0FBTyxLQUFLLHdCQUF3QixFQUFFO1FBQ3hDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztLQUNsRDtJQUVELElBQUksT0FBTyxLQUFLLHVDQUF1QyxFQUFFO1FBQ3ZELGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztLQUM1RDtJQUVELElBQUksT0FBTyxLQUFLLDBCQUEwQixFQUFFO1FBQzFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztLQUMzRDtJQUVELElBQUksT0FBTyxLQUFLLHlCQUF5QixFQUFFO1FBQ3pDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0NBQStDLENBQUMsQ0FBQztLQUN2RTtJQUVELElBQUksT0FBTyxLQUFLLHdCQUF3QixFQUFFO1FBQ3hDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztLQUNoRDtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUEvQ0QsNEJBK0NDIn0=