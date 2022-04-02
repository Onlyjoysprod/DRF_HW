from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet


from .serializers import UserModelSerializer, UserModelSerializerV2
from .models import User


class UserGenericViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV2
        return UserModelSerializer

    # serializer_class = UserModelSerializer
    queryset = User.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


