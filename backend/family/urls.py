from django.urls import path
from . import views

app_name = 'family'

urlpatterns = [
    path('api/membros/', views.membros),
    path('api/membros/add', views.membro_add),
    path('api/membros/<int:pk>/', views.membro_detail),
]
