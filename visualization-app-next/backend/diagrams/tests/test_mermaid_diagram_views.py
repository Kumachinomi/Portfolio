import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from diagrams.models import MermaidDiagram

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def mermaid_diagram():
    return MermaidDiagram.objects.create(
        title="Test Diagram",
        diagram_data="graph TD;\nA-->B;"
    )

@pytest.mark.django_db
class TestMermaidDiagramViewSet:
    def test_list_diagrams(self, api_client, mermaid_diagram):
        """一覧取得ができることのテスト"""
        url = reverse('mermaiddiagram-list')
        response = api_client.get(url)
        
        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]['title'] == mermaid_diagram.title
        assert response.data[0]['diagram_data'] == mermaid_diagram.diagram_data

    def test_create_diagram(self, api_client):
        """保存ができることのテスト"""
        url = reverse('mermaiddiagram-list')
        request_data = {
            'title': 'New Diagram',
            "diagram_data": 'graph LR;\nA-->B;'
        }
        response = api_client.post(url, request_data, format='json')

        assert response.status_code == 201
        assert MermaidDiagram.objects.count() == 1
        assert response.data['title'] == request_data['title']
        assert response.data['diagram_data'] == request_data['diagram_data']
    
    def test_create_diagram_invalid_data(self,api_client):
        """タイトルが空の場合、保存が失敗することをテスト"""
        url = reverse('mermaiddiagram-list')
        data = {
            'title': '',
            'diagram_data': 'graph LR;\nA-->B;'
        }
        response = api_client.post(url, data, format='json')

        assert response.status_code == 400
        assert 'title' in response.data 

    def test_update_favorite(self,api_client, mermaid_diagram):
        """お気に入り状態を更新できることをテスト"""
        url = reverse('mermaiddiagram-update-favorite',args=[mermaid_diagram.id])
        response = api_client.patch(url, {'is_favorite': True}, format='json')

        assert response.status_code == 200
        assert response.data['is_favorite'] is True

    def test_filter_favorite_diagrams(self, api_client):
        """お気に入りでフィルタリングできることをテスト"""
        MermaidDiagram.objects.create(
            title="Favorite Diagram",
            diagram_data="graph TD;\nA-->B;",
            is_favorite=True
        )
        
        url = reverse('mermaiddiagram-list')
        response = api_client.get(f"{url}?is_favorite=true")

        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]['title'] == "Favorite Diagram"




    










