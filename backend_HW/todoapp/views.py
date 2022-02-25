# from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, NoteModelSerializer
from .models import Project, Note


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()


class NoteViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()
