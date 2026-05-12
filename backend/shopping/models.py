from django.db import models
from django.conf import settings


class ItemListaCompra(models.Model):
    familia = models.ForeignKey(
        'family.Familia', on_delete=models.CASCADE, related_name='lista_compras'
    )
    produto = models.ForeignKey(
        'products.Produto', on_delete=models.SET_NULL, null=True, blank=True
    )
    quantidade = models.DecimalField(max_digits=8, decimal_places=2, default=1)
    unidade = models.CharField(max_length=20, blank=True)
    adicionado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        nome = self.produto.nome if self.produto else '(sem produto)'
        return f"{nome} — {self.familia.nome}"


class PedidoCompra(models.Model):
    ESTADO_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('recusado', 'Recusado'),
    ]

    familia = models.ForeignKey(
        'family.Familia', on_delete=models.CASCADE, related_name='pedidos_compra'
    )
    pedido_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='pedidos_feitos'
    )
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendente')
    pedido_em = models.DateTimeField(auto_now_add=True)
    revisto_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='pedidos_revistos'
    )

    def __str__(self):
        return f"Pedido #{self.id} — {self.familia.nome} [{self.estado}]"


class ItemPedidoCompra(models.Model):
    pedido = models.ForeignKey(
        PedidoCompra, on_delete=models.CASCADE, related_name='itens'
    )
    produto = models.ForeignKey(
        'products.Produto', on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        nome = self.produto.nome if self.produto else '(sem produto)'
        return f"{nome} → Pedido #{self.pedido.id}"
