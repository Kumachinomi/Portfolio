import axios from 'axios';

class ClaudeClient {
  async completion(messages) {
    try {
      const requestData = {
        messages,
      };

      const response = await axios.post('/api/claude', requestData);
      
      return response.data.content[0].text;
    } catch (error) {
      throw error;
    }
  }
}

const claude = new ClaudeClient();
export default claude;