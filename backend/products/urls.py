from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('api/items-dispensa/', views.items_dispensa),
    path('api/products/', views.products),
]
