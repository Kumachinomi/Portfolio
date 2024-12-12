import axios from "axios";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create();
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay, // 待機時間を指数関数的に増加
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 529
    );
  },
});

class ClaudeClient {
  async completion(messages) {
    try {
      const requestData = {
        messages,
      };

      const response = await axiosInstance.post("/api/claude", requestData);
      return response.data.content[0].text;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClaudeClient();
