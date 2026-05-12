from django.contrib import admin
from .models import ItemListaCompra, PedidoCompra, ItemPedidoCompra

admin.site.register(ItemListaCompra)
admin.site.register(PedidoCompra)
admin.site.register(ItemPedidoCompra)
