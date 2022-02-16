from rest_framework.viewsets import ModelViewSet
from .serializers import UserModelSerializer
from .models import User


class UserViewSer(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
