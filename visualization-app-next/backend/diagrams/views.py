from rest_framework import viewsets
from rest_framework import filters  
from django_filters import rest_framework as django_filters  
from .models import MermaidDiagram
from .serializers import MermaidDiagramSerializer
from .filters import MermaidDiagramFilter
from django_filters.rest_framework import DjangoFilterBackend 

class MermaidDiagramViewSet(viewsets.ModelViewSet):
    queryset = MermaidDiagram.objects.all()
    serializer_class = MermaidDiagramSerializer
    filterset_class = MermaidDiagramFilter
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,  
    ]
    ordering_fields = ['created_at','title']
    ordering = ['-created_at']  




