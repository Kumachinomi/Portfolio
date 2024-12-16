from django_filters import rest_framework as filters
from .models import MermaidDiagram

class MermaidDiagramFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')  
    created_at = filters.DateTimeFromToRangeFilter() 
    is_favorite = filters.BooleanFilter() 

    class Meta:
        model = MermaidDiagram
        fields = ['title', 'created_at', 'is_favorite']

