from rest_framework import viewsets, status
from rest_framework import filters  
from django_filters import rest_framework as django_filters  
from .models import MermaidDiagram
from .serializers import MermaidDiagramSerializer
from .filters import MermaidDiagramFilter
from django_filters.rest_framework import DjangoFilterBackend 
from rest_framework.decorators import action
from rest_framework.response import Response

class MermaidDiagramViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    queryset = MermaidDiagram.objects.all()
    serializer_class = MermaidDiagramSerializer
    filterset_class = MermaidDiagramFilter
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,  
    ]
    ordering_fields = ['created_at','title', 'is_favorite']
    ordering = ['-created_at']  

    @action(detail=True, methods=['patch'])
    def update_favorite(self, request, pk=None):
        diagram = self.get_object()
        is_favorite = request.data.get('is_favorite')
        
        if is_favorite is None:
            return Response(
                {'error': 'お気に入りの状態が指定されていません'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        diagram.is_favorite = is_favorite
        diagram.save()
        
        serializer = self.get_serializer(diagram)
        return Response(serializer.data)








