from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register("objects", Object3DViewSet)
router.register("files", ResourceFileViewSet)

urlpatterns = router.urls