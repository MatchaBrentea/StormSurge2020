from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='surge-home'),
    path('about/', views.about,name='surge-about'),
]
