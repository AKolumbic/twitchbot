import { jest, describe, it, expect } from "@jest/globals";

describe("Simple Test", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  it("checks if mock functions work", () => {
    const mockFn = jest.fn();
    mockFn("test");
    expect(mockFn).toHaveBeenCalledWith("test");
  });
});

