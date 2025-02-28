# Twitch Bot

A modernized bot for Twitch channels with OpenAI integration, command handling, and moderation capabilities. This bot is designed to enhance interaction in stream chats by providing various commands for rolling dice, getting game information, asking AI-powered questions, and more.

## Features

- **Robust Command System**: Command handler with aliases, permissions, and cooldowns
- **AI-Powered Responses**: OpenAI integration for intelligent responses to questions
- **Specialized AI Commands**: Tailored AI responses for TTRPG and games
- **Dice Rolling**: Advanced dice rolling system for tabletop games
- **Game Information**: Commands to track current games, campaigns, and characters
- **Moderation Tools**: Chat moderation features to maintain a healthy chat environment
- **Helldivers 2 Integration**: Random tips and strategies for Helldivers 2 players
- **Stream Schedule**: Command to display the streaming schedule

## Commands

The bot supports the following commands:

| Command     | Description                        | Usage                                    | Permission           |
| ----------- | ---------------------------------- | ---------------------------------------- | -------------------- |
| !ask        | Ask the AI a general question      | `!ask <your question>`                   | Everyone             |
| !ask-ttrpg  | Ask the AI a tabletop RPG question | `!ask-ttrpg <your question>`             | Everyone             |
| !ask-game   | Ask the AI a video game question   | `!ask-game <your question>`              | Everyone             |
| !roll       | Roll dice for tabletop games       | `!roll <number>d<sides> [+/-<modifier>]` | Everyone             |
| !campaign   | Get or set current campaign info   | `!campaign [set <info>]`                 | Mod/Set: Broadcaster |
| !character  | Get or set current character info  | `!character [set <info>]`                | Mod/Set: Broadcaster |
| !game       | Get or set current game info       | `!game [set <info>]`                     | Mod/Set: Broadcaster |
| !schedule   | Show stream schedule               | `!schedule`                              | Everyone             |
| !helldivers | Get a random Helldivers 2 tip      | `!helldivers`                            | Everyone             |
| !info       | Show bot information               | `!info`                                  | Everyone             |
| !commands   | List available commands            | `!commands`                              | Everyone             |

## Setup

1. Make sure you have Node.js 16+ installed
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with your Twitch and OpenAI credentials (see `.env.example` if available)
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

