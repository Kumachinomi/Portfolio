from rest_framework import serializers
from .models import MermaidDiagram

class MermaidDiagramSerializer(serializers.ModelSerializer):
    class Meta:
        model = MermaidDiagram
        fields = ['id', 'title', 'diagram_data', 'created_at', 'updated_at']
