from django.contrib import admin
from .models import *

# Register your models here.

class ResourceFileInline(admin.TabularInline):
    model = ResourceFile.assignedObjects.through
    autocomplete_fields = ["resourcefile"]
    extra = 0

@admin.register(Object3D)
class Object3DAdmin(admin.ModelAdmin):
    list_display = ["title", "usage"]
    ordering = ["usage", "title"]
    search_fields = ["title", "usage"]
    inlines = [ResourceFileInline]

@admin.register(ResourceFile)
class ResourceFileAdmin(admin.ModelAdmin):
    autocomplete_fields = ["assignedObjects"]
    list_display = ["title", "fileType", "filePath"]
    ordering = ["fileType", "title"]
    search_fields = ["title", "fileType"]
