from django.urls import path
from . import views

app_name = 'shopping'

urlpatterns = [
    path('api/lista/', views.lista_compras),
    path('api/lista/<int:pk>/', views.item_lista_compras),
    path('api/pedidos/', views.pedidos_compra),
    path('api/pedidos/<int:pk>/', views.pedido_detail),
]
