from dataclasses import fields
from rest_framework import serializers
from .models import *

class ResourceFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceFile
        fields = ["title", "fileType", "description", "filePath"]

class Object3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object3D
        fields = ["title", "usage", "description", "filesRelated"]
    filesRelated = ResourceFileSerializer(many = True)
