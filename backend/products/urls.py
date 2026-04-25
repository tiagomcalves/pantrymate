from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('api/products/', views.products),
]
