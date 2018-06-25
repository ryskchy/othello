from django.urls import path, include
from . import views

urlpatterns = [
    path('left_top', views.left_top, name='left_top'),
]
