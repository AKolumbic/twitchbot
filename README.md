# Twitch Bot

A modernized bot for my Twitch channel with OpenAI integration, command handling, and moderation capabilities. This bot is designed to enhance interaction in stream chats by providing AI-powered responses, TTRPG tools, game information, and channel management features.

## Features

- **Robust Command System**: Command handler with aliases, permissions, and cooldowns
- **AI-Powered Responses**: OpenAI integration for intelligent responses to various types of questions
- **Specialized AI Commands**: Tailored AI responses for TTRPG and specific video games
- **Dice Rolling**: Advanced dice rolling system for tabletop games
- **Campaign & Character Tracking**: Commands to track TTRPG campaigns and characters
- **Game Information**: Commands to provide details about streamed games
- **Moderation Tools**: Chat moderation features to maintain a healthy chat environment
- **Helldivers 2 Integration**: Random tips and strategies for Helldivers 2 players
- **Stream Schedule**: Command to display the streaming schedule

## Commands

The bot supports the following commands:

| Command     | Description                                | Usage                                    | Permission |
| ----------- | ------------------------------------------ | ---------------------------------------- | ---------- |
| !ask        | Ask the AI a general question              | `!ask <your question>`                   | Subscriber |
| !ttrpg      | Ask about TTRPG rules, lore, or mechanics  | `!ttrpg <your question>`                 | Subscriber |
| !askgame    | Ask about specific video games             | `!askgame <your question>`               | Subscriber |
| !roll       | Roll dice for tabletop games               | `!roll <number>d<sides> [+/-<modifier>]` | Everyone   |
| !campaign   | Get information about TTRPG campaigns      | `!campaign [name]`                       | Everyone   |
| !character  | Get information about TTRPG characters     | `!character [name]`                      | Everyone   |
| !game       | Get information about streamed games       | `!game [name]`                           | Everyone   |
| !schedule   | Show stream schedule                       | `!schedule`                              | Everyone   |
| !helldivers | Get a random Helldivers 2 tip              | `!helldivers`                            | Everyone   |
| !info       | Show channel and bot information           | `!info`                                  | Everyone   |
| !commands   | List available commands or command details | `!commands [command name]`               | Everyone   |

## Setup

1. Make sure you have Node.js 16+ installed
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with your Twitch and OpenAI credentials
5. Build the project:
   ```
   npm run build
   ```
6. Start the bot:
   ```
   npm start
   ```

## Development

To run the bot in development mode with hot-reloading:

```
npm run dev
```

## Configuration

Configuration is managed through the `src/config.ts` file and environment variables in `.env`. The bot supports configurable command prefixes, cooldowns, and permissions.

## Architecture

The bot is built using TypeScript with a modular architecture:

- Commands follow an interface-based approach for consistency
- Services handle specific functionality like OpenAI integration and moderation
- Configuration is centralized for easy management

## License

ISC

