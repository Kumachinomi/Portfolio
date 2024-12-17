import axios from "axios";

class MermaidDiagramClient {
  async saveDiagram(title, diagram_data) {
    try {
      const requestData = {
        title,
        diagram_data,
      };
      const response = await axios.post("/api/mermaid-diagrams", requestData);
      return response.data;
    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
      throw error;
    }
  }

  async getAllDiagrams(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (params.title) {
        queryParams.append("title", params.title);
      }

      if (params.ordering) {
        queryParams.append("ordering", params.ordering);
      }

      const response = await axios.get(`/api/mermaid-diagrams?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Get Error:", error.response?.data || error.message);
      throw error;
    }
  }

  async deleteDiagram(id) {
    try {
      if (!id) {
        throw new Error("IDが指定されていないため削除ができません");
      }
      console.log("図を削除しようとしています:", id);
      const response = await axios.delete(`/api/mermaid-diagrams?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateFavorite(id, isFavorite) {
    try {
      if (!id) {
        throw new Error("IDが指定されていないため更新ができません");
      }
      const response = await axios.patch(`/api/mermaid-diagrams/${id}/update_favorite/`, {
        is_favorite: isFavorite
      });
      return response.data;
    } catch (error) {
      console.error("Favorite Update Error:", error.response?.data || error.message);
      throw error;
    }
  }
}

const mermaidClient = new MermaidDiagramClient();
export default mermaidClient;
