from todoapp.models import Project, Note

from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

