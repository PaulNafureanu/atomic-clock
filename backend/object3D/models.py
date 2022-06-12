from django.db import models
from django.core.validators import RegexValidator
import os


#Validators
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

# Create your models here.
class Object3D(models.Model):
    title = models.CharField(max_length=255, unique=True, primary_key=True, validators=[alphanumeric])
    usage = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Object 3D'
        verbose_name_plural = 'Objects 3D'


class ResourceFile(models.Model):

    FILE_TYPE_CHOICES = [
            ("general", "General File"),
            ("geometry", "Geometry File"),
            ("object", "Object File"),
            ("material", "Material File"),
            ("texture", "Texture File"),
            ("image", "Image File"),
            ("audio", "Audio File"),
            ("animation", "Animation File")
        ]

    def uploadPath(instance, filename):
        return "3D/{0}/{1}".format(instance.fileType, filename)

    title = models.CharField(max_length=255, unique=True, primary_key=True, validators=[alphanumeric])
    fileType = models.CharField(max_length=15, choices=FILE_TYPE_CHOICES, default="general")
    description = models.TextField(null=True, blank=True)
    filePath = models.FileField(upload_to=uploadPath)
    assignedObjects = models.ManyToManyField(Object3D, blank=True, related_name="filesRelated")

    __original_file_path_name = None

    def __init__(self , *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.filePath:
            self.__original_file_path_name = self.filePath.path

    #Override save method to include the os remove method for removing the old resource file
    def save(self, force_insert: bool = False, force_update: bool = False, using = None, update_fields = None) -> None:
        original_path = self.__original_file_path_name
        if original_path != None and self.filePath.path != original_path:
            if os.path.isfile(original_path):
                os.remove(original_path)
        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Resource File"
        verbose_name_plural = "Resource Files"