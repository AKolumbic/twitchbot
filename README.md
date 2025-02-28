# Twitch Bot

A modernized bot for Twitch channels with OpenAI integration.

## Features

- Command handling system
- Moderation capabilities
- OpenAI integration for smart responses

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

Configuration is managed through the `src/config.ts` file and environment variables in `.env`.

## Commands

Commands are managed through the CommandManager system. Each command is a separate class that implements the Command interface.

## License

ISC
