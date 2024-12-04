from django.db import models

class MermaidDiagram(models.Model):
    title = models.CharField(max_length=200)
    diagram_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

