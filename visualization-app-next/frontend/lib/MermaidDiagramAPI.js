import axios from 'axios';

class MermaidDiagramClient {
  async saveDiagram(title, diagram_data) {
    try {
      const requestData = {
        title,
        diagram_data
      };
      const response = await axios.post('/api/mermaid-diagrams', requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllDiagrams() {
    try {
      const response = await axios.get('/api/mermaid-diagrams');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const mermaidClient = new MermaidDiagramClient();
export default mermaidClient;