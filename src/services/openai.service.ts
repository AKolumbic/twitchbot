import OpenAI from "openai";
import { OPENAI_CONFIG } from "../config.js";

class OpenAIService {
  private client: OpenAI;
  private streamerContext: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: OPENAI_CONFIG.API_KEY,
    });

    // Create context about the streamer's content
    this.streamerContext = `
Streamer context:
- Name: drosshole, a Twitch streamer who plays both tabletop RPGs and video games.
- Current Pathfinder 2e character: Gilbert Goldgrin, a celebrity polymath bard halfling in the Stolen Fate campaign (Thursdays).
- Current D&D character: Brodi Dankweed, a teenage tortle druid in the Hometown Heroes campaign (Saturdays).
- Also plays video games: Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077.
`.trim();
  }

  /**
   * Generate a response using the OpenAI API
   * @param prompt The prompt to send to the OpenAI API
   * @returns The generated response
   */
  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant for a Twitch channel. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
        temperature: OPENAI_CONFIG.TEMPERATURE,
      });

      return (
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response at this time."
      );
    } catch (error) {
      console.error("Error generating OpenAI response:", error);
      return "There was an error generating a response. Please try again later.";
    }
  }

  /**
   * Generate a TTRPG-focused response
   * @param prompt The TTRPG-related question or prompt
   * @returns The generated response
   */
  async getTtrpgResponse(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "system",
            content: `You are a knowledgeable tabletop RPG expert familiar with both D&D and Pathfinder 2e. Provide helpful and accurate information about rules, lore, and gameplay. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
        temperature: OPENAI_CONFIG.TEMPERATURE,
      });

      return (
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a TTRPG response at this time."
      );
    } catch (error) {
      console.error("Error generating TTRPG response:", error);
      return "There was an error generating a TTRPG response. Please try again later.";
    }
  }

  /**
   * Generate a video game focused response
   * @param prompt The video game related question or prompt
   * @returns The generated response
   */
  async getGameResponse(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "system",
            content: `You are a video game expert familiar with Helldivers 2, Hearthstone, Baldur's Gate 3, and Cyberpunk 2077. Provide helpful gaming tips, strategies, or lore. Keep responses concise (max 1-2 sentences) and Twitch-friendly. ${this.streamerContext}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
        temperature: OPENAI_CONFIG.TEMPERATURE,
      });

      return (
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a gaming response at this time."
      );
    } catch (error) {
      console.error("Error generating game response:", error);
      return "There was an error generating a gaming response. Please try again later.";
    }
  }
}

export const openAIService = new OpenAIService();

