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
      console.error('Save Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getAllDiagrams() {
    try {
      const response = await axios.get('/api/mermaid-diagrams');
      return response.data;
    } catch (error) {
      console.error('Get Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async deleteDiagram(id) {
    try {
      if (!id) {
        throw new Error('ID is required for deletion');
      }
      console.log('Attempting to delete diagram with ID:', id);
      const response = await axios.delete(`/api/mermaid-diagrams?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete Error:', error.response?.data || error.message);
      throw error;
    }
  }
}

const mermaidClient = new MermaidDiagramClient();
export default mermaidClient;