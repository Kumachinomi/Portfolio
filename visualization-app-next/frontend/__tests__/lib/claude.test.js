import axios from "axios";
import claude from "../../lib/claude";

jest.mock("axios");

describe("ClaudeClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("レスポンスが表示されるかテスト", async () => {
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

  test("エラー時にメッセージを表示されるかテスト", async () => {
    const mockError = new Error("Claude APIへのリクエストが失敗しました");
    axios.post.mockRejectedValue(mockError);

    const messages = [
      {
        role: "user",
        content:
          ":今からの入力を状態遷移図で最大限詳細に表現してほしい\nOAuthの仕組みについて",
      },
    ];

    await expect(claude.completion(messages)).rejects.toThrow(
      "Claude APIへのリクエストが失敗しました"
    );
  });
});
