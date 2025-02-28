import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { openAIService } from "../../services/openai.service.js";

// Mock console.error to prevent test output pollution
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

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
      expect(console.error).toHaveBeenCalledWith(
        "Error generating OpenAI response:",
        expect.any(Object)
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

    it("should handle response with no message content", async () => {
      // Setup the mock to return response with no content
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              // No content property
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.generateResponse("Test prompt");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a response at this time."
      );
    });

    it("should handle response with null message", async () => {
      // Setup the mock to return response with null message
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            // No message property
          },
        ],
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

    it("should handle errors gracefully in TTRPG responses", async () => {
      // Setup the mock to throw an error
      mockCompletionsCreate.mockRejectedValue(new Error("API Error"));

      // Call the method
      const response = await openAIService.getTtrpgResponse("D&D question");

      // Assertions
      expect(response).toBe(
        "There was an error generating a TTRPG response. Please try again later."
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error generating TTRPG response:",
        expect.any(Object)
      );
    });

    it("should handle empty TTRPG responses gracefully", async () => {
      // Setup the mock to return empty response
      mockCompletionsCreate.mockResolvedValue({
        choices: [],
      });

      // Call the method
      const response = await openAIService.getTtrpgResponse("D&D question");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a TTRPG response at this time."
      );
    });

    it("should handle TTRPG response with no message content", async () => {
      // Setup the mock to return response with no content
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              // No content property
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.getTtrpgResponse("D&D question");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a TTRPG response at this time."
      );
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

    it("should handle errors gracefully in game responses", async () => {
      // Setup the mock to throw an error
      mockCompletionsCreate.mockRejectedValue(new Error("API Error"));

      // Call the method
      const response = await openAIService.getGameResponse("Game question");

      // Assertions
      expect(response).toBe(
        "There was an error generating a gaming response. Please try again later."
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error generating game response:",
        expect.any(Object)
      );
    });

    it("should handle empty game responses gracefully", async () => {
      // Setup the mock to return empty response
      mockCompletionsCreate.mockResolvedValue({
        choices: [],
      });

      // Call the method
      const response = await openAIService.getGameResponse("Game question");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a gaming response at this time."
      );
    });

    it("should handle game response with no message content", async () => {
      // Setup the mock to return response with no content
      mockCompletionsCreate.mockResolvedValue({
        choices: [
          {
            message: {
              // No content property
            },
          },
        ],
      });

      // Call the method
      const response = await openAIService.getGameResponse("Game question");

      // Assertions
      expect(response).toBe(
        "Sorry, I couldn't generate a gaming response at this time."
      );
    });

    it("should handle game response with null choices", async () => {
      // Setup the mock to return null choices
      mockCompletionsCreate.mockResolvedValue({
        choices: null,
      });

      // Call the method
      const response = await openAIService.getGameResponse("Game question");

      // Assertions
      expect(response).toBe(
        "There was an error generating a gaming response. Please try again later."
      );
    });
  });
});

