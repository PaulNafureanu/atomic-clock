from urllib import request
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

# Create your views here.
class Object3DViewSet(ModelViewSet):
    queryset = Object3D.objects.all()
    serializer_class = Object3DSerializer

class ResourceFileViewSet(ModelViewSet):
    queryset = ResourceFile.objects.all()
    serializer_class = ResourceFileSerializer