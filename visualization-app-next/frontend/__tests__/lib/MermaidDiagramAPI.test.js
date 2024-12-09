import axios from 'axios';
import mermaidClient from '../../lib/MermaidDiagramAPI';

jest.mock('axios');

describe('MermaidDiagramClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('図の保存ができるかテスト', async () => {
    const testData = {
      title: 'システムの構造',
      diagram_data: 'stateDiagram-v2\n状態A --> 状態B'
    };
 
    const mockResponse = {
      data: {
        id: 1,
        ...testData
      }
    };
    
    axios.post.mockResolvedValue(mockResponse);
 
    const result = await mermaidClient.saveDiagram(
      testData.title, 
      testData.diagram_data
    );
 
    expect(axios.post).toHaveBeenCalledWith(
        '/api/mermaid-diagrams',
        testData
    );
 
    expect(result).toEqual(mockResponse.data);
  });


  test('保存済みの図一覧を取得できるかテスト', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'システムの構造',
          diagram_data: 'stateDiagram-v2\n状態A --> 状態B'
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await mermaidClient.getAllDiagrams();

    expect(result).toEqual(mockResponse.data);
  });
});
