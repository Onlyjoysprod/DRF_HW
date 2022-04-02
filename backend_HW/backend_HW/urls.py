"""backend_HW URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.models import Token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from users.views import UserGenericViewSet
from todoapp.views import ProjectModelViewSet, NoteModelViewSet
from graphene_django.views import GraphQLView

router = DefaultRouter()
router.register('users', UserGenericViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', NoteModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='1.0',
        description='description',
        contact=openapi.Contact(email='test@mail.com'),
        license=openapi.License(name='MIT')
    ),
    public=True,
    permission_classes=(AllowAny, )
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', obtain_auth_token),
    path('swagger/', schema_view.with_ui()),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)', schema_view.without_ui()),
]
