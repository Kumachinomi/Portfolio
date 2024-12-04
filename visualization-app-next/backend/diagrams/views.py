from rest_framework import viewsets
from .models import MermaidDiagram
from .serializers import MermaidDiagramSerializer

class MermaidDiagramViewSet(viewsets.ModelViewSet):
    queryset = MermaidDiagram.objects.all()
    serializer_class = MermaidDiagramSerializer

