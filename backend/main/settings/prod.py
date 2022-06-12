import os
import dj_database_url
from .common import *

DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = []

DATABASES = {
    'default': dj_database_url.config()
}

DATABASES['default']['OPTIONS'] = {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"}
