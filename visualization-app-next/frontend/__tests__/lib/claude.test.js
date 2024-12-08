import axios from "axios";
import claude from "../../lib/claude";

jest.mock("axios");

describe("ClaudeClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("正しいレスポンスが返ってくる", async () => {
    const mockResponse = {
      data: {
        content: [{ text: "test-response" }],
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await claude.completion([
      {
        role: "user",
        content: "test-input",
      },
    ]);

    expect(axios.post).toHaveBeenCalled();

    expect(typeof result).toBe("string");
    expect(result).toBe("test-response");
  });
});
