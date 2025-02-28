import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { openAIService } from "../../services/openai.service.js";

// Mock the OpenAI client
jest.mock("openai", () => {
  const mockCreateFn = jest.fn();
  return function () {
    return {
      chat: {
        completions: {
          create: mockCreateFn,
        },
      },
    };
  };
});

// Mock the config
jest.mock("../../config.js", () => ({
  OPENAI_CONFIG: {
    API_KEY: "mock-api-key",
    MODEL: "gpt-3.5-turbo",
    MAX_TOKENS: 150,
    TEMPERATURE: 0.7,
  },
}));

describe("OpenAIService", () => {
  let mockCompletionsCreate;

  beforeEach(() => {
    jest.clearAllMocks();

    // Get reference to the mocked completions.create method
    mockCompletionsCreate = (openAIService as any).client.chat.completions
      .create;

    // Make sure it's a proper mock function
    if (!mockCompletionsCreate.mockResolvedValue) {
      // If not, replace it with a jest.fn()
      mockCompletionsCreate = jest.fn();
      (openAIService as any).client.chat.completions.create =
        mockCompletionsCreate;
    }
  });

  describe("generateResponse", () => {
    it("should generate a response with the correct parameters", async () => {
      // Setup the mock response
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: "This is a mocked response.",
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.generateResponse("Test prompt");

      // Assertions
      expect(response).toBe("This is a mocked response.");
      expect(mockCompletionsCreate).toHaveBeenCalled();

      // Check that correct parameters were passed
      const callArgs = mockCompletionsCreate.mock.calls[0][0];
      expect(callArgs.model).toBe("gpt-3.5-turbo");
      expect(callArgs.max_tokens).toBe(150);
      expect(callArgs.temperature).toBe(0.7);
      expect(callArgs.messages[1].content).toBe("Test prompt");
      expect(callArgs.messages[0].role).toBe("system");

      // Ensure system message contains streamer context
      expect(callArgs.messages[0].content).toContain(
        "You are a helpful assistant"
      );
      expect(callArgs.messages[0].content).toContain("drosshole");
    });

    it("should handle errors gracefully", async () => {
      // Setup the mock to throw an error
      mockCompletionsCreate.mockRejectedValue(new Error("API Error"));

      // Call the method
      const response = await openAIService.generateResponse("Test prompt");

      // Assertions
      expect(response).toBe(
        "There was an error generating a response. Please try again later."
      );
    });

    it("should handle empty response gracefully", async () => {
      // Setup the mock to return empty response
      mockCompletionsCreate.mockResolvedValue({
        choices: [],
      });

      // Call the method
      const response = await openAIService.generateResponse("Test prompt");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a response at this time."
      );
    });
  });

  describe("getTtrpgResponse", () => {
    it("should generate a TTRPG-focused response", async () => {
      // Setup the mock response
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: "This is a TTRPG response.",
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.getTtrpgResponse("D&D question");

      // Assertions
      expect(response).toBe("This is a TTRPG response.");

      // Check that the system message includes TTRPG context
      const callArgs = mockCompletionsCreate.mock.calls[0][0];
      expect(callArgs.messages[0].content).toContain("tabletop RPG expert");
    });
  });

  describe("getGameResponse", () => {
    it("should generate a video game-focused response", async () => {
      // Setup the mock response
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: "This is a video game response.",
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.getGameResponse("Game question");

      // Assertions
      expect(response).toBe("This is a video game response.");

      // Check that the system message includes video game context
      const callArgs = mockCompletionsCreate.mock.calls[0][0];
      expect(callArgs.messages[0].content).toContain("video game expert");
    });
  });
});

