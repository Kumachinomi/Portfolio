import axios from 'axios';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).end();
    }
  
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: "claude-3-5-sonnet-20241022",
          messages: req.body.messages,
          max_tokens: 4096,
        },
        {
          headers: {
            "content-type": "application/json",
            "anthropic-version": "2023-06-01",
            "x-api-key": process.env.CLAUDE_API_KEY
          },
          timeout: 30000  
        }
      );
      
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Full error:', error);
      console.error('Response data:', error.response?.data);
      res.status(500).json({ error: error.message });
    }
  }

export default handler;