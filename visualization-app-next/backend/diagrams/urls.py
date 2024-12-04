from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MermaidDiagramViewSet

router = DefaultRouter()
router.register(r'mermaid-diagrams', MermaidDiagramViewSet)

urlpatterns = [
    path('',include(router.urls)),
]