from .common import *

DEBUG = True

SECRET_KEY = 'django-insecure-yshw^j28cpeqsu_(xo+(5g)e4gvyp9ch-kbm8bgih&osa*0q7-'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "atomic_clock",
        "HOST": "localhost",
        "USER": "root",
        "PASSWORD": "DevPassword",
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}