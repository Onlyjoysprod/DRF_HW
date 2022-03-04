from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .serializers import UserModelSerializer
from .models import User


class UserGenericViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


