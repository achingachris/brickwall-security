from django.urls import path
from . import views as v

urlpatterns = [
    path('hello/', v.HelloWorld, name='hello')
]