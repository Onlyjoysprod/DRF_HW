from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate

from .models import User
from todoapp.models import Project, Note
from .views import UserGenericViewSet

from mixer.backend.django import mixer


class TestUser(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        user = User.objects.create_superuser(username='django', email='django@gb.local', password='geekbrains')
        request = factory.get('/api/users')
        force_authenticate(request, user)
        view = UserGenericViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProject(TestCase):

    def test_get_list_1(self):
        self.admin = User.objects.create_superuser(username='django', email='django@gb.local', password='geekbrains')
        self.project = mixer.blend(Project)

        client = APIClient()
        client.login(username='django', password='geekbrains')
        response = client.get('/api/projects/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestNoteClientApi(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('django', email='django@gb.local', password='geekbrains')
        self.author = mixer.blend(Project)
        self.bio = mixer.blend(Note)

    def test_get_list_1(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
