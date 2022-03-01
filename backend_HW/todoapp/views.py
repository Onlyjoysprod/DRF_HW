from rest_framework.generics import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import ProjectModelSerializer, NoteModelSerializer
from .models import Project, Note
from .filters import ProjectFilter
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class NoteModelViewSet(ModelViewSet):
    serializer_class = NoteModelSerializer
    queryset = Note.objects.all()
    pagination_class = NoteLimitOffsetPagination

    def destroy(self, request, pk=None, *args, **kwargs):
        note = get_object_or_404(Note, pk=pk)
        serializer = NoteModelSerializer(note, context={'request': request})
        note.is_active = False
        note.save()
        return Response(serializer.data)
