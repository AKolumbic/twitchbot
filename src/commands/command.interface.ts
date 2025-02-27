import { Client, Userstate } from "tmi.js";

export interface CommandOptions {
  name: string;
  aliases?: string[];
  description: string;
  cooldown?: number; // in seconds
  permission?: string;
  usage?: string;
}

export interface CommandContext {
  client: Client;
  channel: string;
  userstate: Userstate;
  message: string;
  args: string[];
  isBroadcaster: boolean;
  isModerator: boolean;
  isSubscriber: boolean;
  isVIP: boolean;
}

export interface Command {
  options: CommandOptions;
  execute: (context: CommandContext) => Promise<void> | void;
}

