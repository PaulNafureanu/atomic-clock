from django.apps import AppConfig


class Object3DConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'object3D'

    def ready(self):
        from . import signals
        return super().ready()