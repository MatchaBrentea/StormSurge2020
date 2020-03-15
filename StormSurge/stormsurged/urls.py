from django.urls import path
from django.conf.urls import url
from . import views



urlpatterns = [
    url(r'^$', views.home,name='surge-home'),
    url(r'^about/', views.about,name='surge-about'),
    url(r'^samar/',views.samar,name='surge-samar'),
]
