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
        url = reverse('mermaiddiagram-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['title'] == mermaid_diagram.title
        assert response.data[0]['diagram_data'] == mermaid_diagram.diagram_data

    def test_create_diagram(self, api_client):
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









