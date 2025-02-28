# TwitchBot with OpenAI Integration

A modern Twitch chatbot for a variety of streaming content, including D&D, Pathfinder 2e, Call of Cthulhu, and video games like Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077. Features intelligent responses powered by OpenAI.

## Features

- **OpenAI Integration**: Smart responses to viewer questions using OpenAI's GPT models
- **TTRPG Support**: Commands for D&D and Pathfinder 2e games, characters, and rules
- **Video Game Information**: Details about Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077
- **Dice Rolling**: Advanced dice notation support (e.g., 2d20+5)
- **Chat Moderation**: Automatic moderation of inappropriate content
- **Permission System**: Different commands for different user roles (broadcaster, mods, subs, etc.)
- **Cooldown System**: Prevent command spam

## Getting Started

### Prerequisites

- Node.js 16+
- A Twitch account for the bot
- An OpenAI API key

### Installation

1. Clone the repository:

```
git clone https://github.com/AKolumbic/twitchbot.git
cd twitchbot
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
# Twitch Authentication
TWITCH_USERNAME=your_bot_username
TWITCH_OAUTH_TOKEN=your_oauth_token
TWITCH_CHANNELS=your_channel_name

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo

# Bot Configuration
BOT_PREFIX=!
BOT_NAME=DROSSBOT
```

4. Start the bot:

```
npm start
```

### Getting a Twitch OAuth Token

1. Visit [Twitch Token Generator](https://twitchapps.com/tmi/)
2. Log in with your bot's Twitch account
3. Copy the OAuth token (including the "oauth:" prefix)
4. Paste it into your `.env` file

## Commands

The bot comes with numerous commands:

### General Commands

- `!info` - Information about the channel
- `!commands` - Lists all available commands
- `!schedule` - Shows the streaming schedule

### TTRPG Commands

- `!campaign [name]` - Information about current TTRPG campaigns
- `!character [name]` - Details about current characters
- `!roll <dice>` - Rolls dice (e.g., !roll 2d20+5)
- `!ttrpg <question>` - Ask about Pathfinder 2e or D&D rules/lore

### Video Game Commands

- `!game [name]` - Information about games streamed
- `!askgame <question>` - Ask questions about the video games
- `!helldivers` - Get a random Helldivers 2 tip

### AI Commands

- `!ask <question>` - Ask the AI a general question

## Current Campaigns & Characters

### Pathfinder 2e - Stolen Fate

- **Character**: Gilbert Goldgrin (celebrity polymath bard halfling)
- **Stream**: Thursdays @ 8:00 PM EST

### D&D - Hometown Heroes

- **Character**: Brodi Dankweed (teenage tortle druid)
- **Stream**: Saturdays @ 7:00 PM EST

## Video Games

- Helldivers 2
- Hearthstone
- Baldur's Gate 3
- Cyberpunk 2077

## Adding New Commands

To add a new command, create a new file in the `src/commands` directory:

```typescript
import { Command, CommandContext, CommandOptions } from "./command.interface";

export class MyCommand implements Command {
  options: CommandOptions = {
    name: "mycommand",
    description: "Description of my command",
    aliases: ["mc", "mycmd"],
    permission: "everyone", // or 'broadcaster', 'moderator', etc.
  };

  execute(context: CommandContext): void {
    const { client, channel } = context;
    client.say(channel, "My command response!");
  }
}
```

Then register your command in `src/commands/command-manager.ts`:

```typescript
import { MyCommand } from "./mycommand.command";

// In the constructor
this.registerCommand(new MyCommand());
```

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- [tmi.js](https://github.com/tmijs/tmi.js) - Twitch chat client
- [OpenAI](https://openai.com/) - AI integration

