from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('api/receitas/', views.receitas),
]
