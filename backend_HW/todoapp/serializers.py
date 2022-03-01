from todoapp.models import Project, Note

from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

