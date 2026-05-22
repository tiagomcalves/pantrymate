from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('api/items-dispensa/', views.items_dispensa),
    path('api/items-dispensa/alertas/', views.items_dispensa_alertas),
    path('api/products/', views.products),
    path('api/itens/', views.items_dispensa),
]
