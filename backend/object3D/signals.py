from django.dispatch import receiver
from django.db.models.signals import post_delete
from .models import ResourceFile
import os

def delete_file(path):
   if os.path.isfile(path):
       os.remove(path)

@receiver(post_delete, sender = ResourceFile)
def resourceFile_post_delete(sender, instance:ResourceFile, *args, **kwargs):
    if instance.filePath:
        delete_file(instance.filePath.path)
