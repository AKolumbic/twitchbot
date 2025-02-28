# Twitch Bot Commands

This directory contains all the command implementations for the Twitch bot. Each command is implemented as a class that follows the `Command` interface.

## Table of Contents

- [Command Structure](#command-structure)
- [Permission Levels](#permission-levels)
- [Command List](#command-list)
  - [AI-Based Commands](#ai-based-commands)
    - [ask](#ask)
    - [ttrpg](#ttrpg)
    - [askgame](#askgame)
  - [TTRPG Commands](#ttrpg-commands)
    - [roll](#roll)
    - [character](#character)
    - [campaign](#campaign)
  - [Game Information Commands](#game-information-commands)
    - [game](#game)
    - [helldivers](#helldivers)
  - [Channel Information Commands](#channel-information-commands)
    - [info](#info)
    - [schedule](#schedule)
    - [commands](#commands)

## Command Structure

All commands implement the `Command` interface, which requires:

```typescript
interface Command {
  options: CommandOptions;
  execute: (context: CommandContext) => Promise<void> | void;
}
```

The `CommandOptions` defines the command's properties:

```typescript
interface CommandOptions {
  name: string; // Command name (without the prefix)
  aliases?: string[]; // Optional alternative names for the command
  description: string; // Description of what the command does
  cooldown?: number; // Optional cooldown in seconds
  permission?: string; // Permission level required to use the command
  usage?: string; // Optional usage example
}
```

## Permission Levels

The bot supports the following permission levels:

- `everyone`: Any viewer can use the command
- `subscriber`: Only channel subscribers can use the command
- `moderator`: Only channel moderators can use the command
- `broadcaster`: Only the channel owner can use the command

Moderators automatically have access to subscriber commands, and the broadcaster can use all commands.

## Command List

### AI-Based Commands

These commands leverage OpenAI to provide AI-powered responses to user questions.

#### ask

- **Name**: ask
- **Description**: Ask the AI a question about D&D or anything else
- **Usage**: `!ask <your question>`
- **Permission**: subscriber
- **Cooldown**: 30 seconds
- **Example**: `!ask what is the best class in D&D?`

The `ask` command allows subscribers to ask general questions to the AI. It sends a "thinking" message while processing and then returns the AI's response. It handles errors gracefully and truncates long questions in the thinking message.

#### ttrpg

- **Name**: ttrpg
- **Aliases**: pf2e, dnd, pathfinder
- **Description**: Ask about Pathfinder 2e or D&D rules, lore, or mechanics
- **Usage**: `!ttrpg <your question>`
- **Permission**: subscriber
- **Cooldown**: 30 seconds
- **Example**: `!ttrpg how does flanking work in Pathfinder 2e?`

The `ttrpg` command is specialized for tabletop RPG questions, particularly about Pathfinder 2e and D&D. It uses a specialized TTRPG-focused AI response generation.

#### askgame

- **Name**: askgame
- **Aliases**: gamequestion, videogame
- **Description**: Ask about Helldivers 2, Hearthstone, Baldur's Gate 3, or Cyberpunk 2077
- **Usage**: `!askgame <your question>`
- **Permission**: subscriber
- **Cooldown**: 30 seconds
- **Example**: `!askgame what's the best strategy in Helldivers 2?`

The `askgame` command is specialized for video game questions, particularly about games the streamer plays. It uses a specialized game-focused AI response generation.

### TTRPG Commands

These commands provide information and utilities for tabletop RPG games.

#### roll

- **Name**: roll
- **Aliases**: dice, r
- **Description**: Roll dice for D&D or other tabletop games
- **Usage**: `!roll <number>d<sides> [+/-<modifier>]`
- **Permission**: everyone
- **Example**: `!roll 2d20` or `!roll 1d20+5`

The `roll` command simulates dice rolls for tabletop games. It supports standard dice notation with optional modifiers. It validates inputs to ensure they're within reasonable limits (1-20 dice with 1-1000 sides) and provides detailed output showing each individual roll.

#### character

- **Name**: character
- **Aliases**: char, characters
- **Description**: Get information about Drosshole's current characters
- **Usage**: `!character [name]`
- **Permission**: everyone
- **Example**: `!character gilbert`

The `character` command provides information about the streamer's TTRPG characters. Without arguments, it lists all characters. With a character name (or partial match), it provides detailed information about that character.

#### campaign

- **Name**: campaign
- **Aliases**: campaigns
- **Description**: Get information about current TTRPG campaigns
- **Usage**: `!campaign [name]`
- **Permission**: everyone
- **Example**: `!campaign stolen-fate`

The `campaign` command provides information about the streamer's TTRPG campaigns. Without arguments, it lists all campaigns. With a campaign name (or partial match), it provides detailed information about that campaign.

### Game Information Commands

These commands provide information about video games played on the channel.

#### game

- **Name**: game
- **Aliases**: games, videogame
- **Description**: Get information about games Drosshole streams
- **Usage**: `!game [name]`
- **Permission**: everyone
- **Example**: `!game helldivers`

The `game` command provides information about the video games the streamer plays. Without arguments, it lists all games. With a game name (or partial match), it provides detailed information about that game, including its genre, release year, and a brief description.

#### helldivers

- **Name**: helldivers
- **Aliases**: hd2, helldivers2, divers
- **Description**: Get a random Helldivers 2 tip or strategy
- **Permission**: everyone
- **Example**: `!helldivers`

The `helldivers` command provides a random tip or strategy for Helldivers 2. This command doesn't take any arguments and is primarily for entertainment and helpful information about a game frequently played on the channel.

### Channel Information Commands

These commands provide information about the channel and the bot itself.

#### info

- **Name**: info
- **Aliases**: about
- **Description**: Provides information about the channel and bot
- **Permission**: everyone
- **Example**: `!info`

The `info` command provides general information about the channel. It displays a different message depending on whether the broadcaster or a viewer uses the command.

#### schedule

- **Name**: schedule
- **Aliases**: when, streams
- **Description**: Get information about Drosshole's streaming schedule
- **Permission**: everyone
- **Example**: `!schedule`

The `schedule` command displays the streamer's weekly schedule. It shows all regular stream days and times, and highlights today's stream if applicable.

#### commands

- **Name**: commands
- **Aliases**: help, cmds
- **Description**: List all available commands
- **Usage**: `!commands [command name]`
- **Permission**: everyone
- **Example**: `!commands roll`

The `commands` command lists all available commands. Without arguments, it provides a simple list. With a command name, it provides detailed information about that specific command, including description, usage, and aliases.

