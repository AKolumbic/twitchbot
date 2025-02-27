"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCharacterCommands = void 0;
function executeCharacterCommands(characterName, channel, chatbot) {
    switch (characterName) {
        // The Sea of Sorrows
        case `!crawford`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/65884788`);
            break;
        case `!donny`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/65577690`);
            break;
        case `!silverhook`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/65462545`);
            break;
        case `!ren`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/57175143`);
            break;
        case `!tamasq`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/65460572`);
            break;
        // Carry The Knowledge
        case `!rhopraxus`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/63459699`);
            break;
        case `!saint`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/64752234`);
            break;
        case `!kaylin`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/13989809`);
            break;
        case `!morgan`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/71002279`);
            break;
        case `!zereks`:
            chatbot.say(channel, `Zereks is a dragonborn samurai, but not the fighter subclass, a custom class from Final Fantasy, learn more here: https://www.finalfantasyd20.com/classes/hybrid-classes/samurai/`);
            break;
        case `!sil'lith`:
            chatbot.say(channel, ``);
            break;
        // A Clash Of Two Fates
        case `!marek`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/55956716`);
            break;
        case `!spraxus`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/55853414`);
            break;
        case `!edryn`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/57776502`);
            break;
        case `!belavor`:
            chatbot.say(channel, `https://www.dndbeyond.com/characters/56441113`);
            break;
        default:
            break;
    }
}
exports.executeCharacterCommands = executeCharacterCommands;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1jaGFyYWN0ZXItY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhlY3V0YWJsZUNvbW1hbmRzL2V4ZWN1dGUtY2hhcmFjdGVyLWNvbW1hbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLHdCQUF3QixDQUFDLGFBQXFCLEVBQUUsT0FBZSxFQUFFLE9BQWU7SUFDOUYsUUFBUSxhQUFhLEVBQUU7UUFDckIscUJBQXFCO1FBQ3JCLEtBQUssV0FBVztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLCtDQUErQyxDQUFDLENBQUM7WUFDdEUsTUFBTTtRQUVSLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLCtDQUErQyxDQUFDLENBQUM7WUFDdEUsTUFBTTtRQUVSLEtBQUssYUFBYTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixLQUFLLE1BQU07WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixLQUFLLFNBQVM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixzQkFBc0I7UUFDdEIsS0FBSyxZQUFZO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0NBQStDLENBQUMsQ0FBQztZQUN0RSxNQUFNO1FBRVIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0NBQStDLENBQUMsQ0FBQztZQUN0RSxNQUFNO1FBRVIsS0FBSyxTQUFTO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0NBQStDLENBQUMsQ0FBQztZQUN0RSxNQUFNO1FBRVIsS0FBSyxTQUFTO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0NBQStDLENBQUMsQ0FBQztZQUN0RSxNQUFNO1FBRVIsS0FBSyxTQUFTO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbUxBQW1MLENBQUMsQ0FBQztZQUMxTSxNQUFNO1FBRVIsS0FBSyxXQUFXO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekIsTUFBTTtRQUVSLHVCQUF1QjtRQUN2QixLQUFLLFFBQVE7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixLQUFLLFVBQVU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixLQUFLLFFBQVE7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUixLQUFLLFVBQVU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFFUjtZQUNFLE1BQU07S0FDVDtBQUNILENBQUM7QUFwRUQsNERBb0VDIn0=