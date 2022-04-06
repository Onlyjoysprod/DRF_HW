import graphene
from graphene_django import DjangoObjectType

from users.models import User
from todoapp.models import Project, Note


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class Query(graphene.ObjectType):

    # Users
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, pk=graphene.Int(required=True))
    users_by_name = graphene.List(UserType, name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_user_by_id(root, info, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    def resolve_users_by_name(root, info, name):
        user = User.objects.all()
        if name:
            user = User.objects.filter(first_name=name)
        return user

    # Projects
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, pk=graphene.Int(required=True))
    projects_by_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_id(root, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def resolve_projects_by_name(root, info, name):
        project = Project.objects.all()
        if name:
            project = Project.objects.filter(name=name)
        return project

    # Notes
    all_notes = graphene.List(NoteType)
    note_by_id = graphene.Field(NoteType, pk=graphene.Int(required=True))
    notes_by_body = graphene.List(NoteType, body=graphene.String())

    def resolve_all_notes(root, info):
        return Note.objects.all()

    def resolve_note_by_id(root, info, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            return None

    def resolve_notes_by_body(self, info, body=''):
        return Note.objects.filter(body__contains=body)


schema = graphene.Schema(query=Query)