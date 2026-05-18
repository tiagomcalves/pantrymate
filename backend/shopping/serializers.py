from rest_framework import serializers
from .models import ItemListaCompra, PedidoCompra, ItemPedidoCompra


class ItemListaCompraSerializer(serializers.ModelSerializer):
    nome = serializers.SerializerMethodField()

    def get_nome(self, obj):
        return obj.produto.nome if obj.produto else obj.nome_livre

    class Meta:
        model = ItemListaCompra
        fields = ('id', 'nome', 'icone', 'categoria', 'quantidade', 'unidade')


class ItemPedidoCompraSerializer(serializers.ModelSerializer):
    nome = serializers.SerializerMethodField()

    def get_nome(self, obj):
        return obj.produto.nome if obj.produto else obj.nome_livre

    class Meta:
        model = ItemPedidoCompra
        fields = ('nome', 'icone')


class PedidoCompraSerializer(serializers.ModelSerializer):
    itens = ItemPedidoCompraSerializer(many=True, read_only=True)
    numero = serializers.SerializerMethodField()

    def get_numero(self, obj):
        return f"PED-{str(obj.id).zfill(3)}"

    class Meta:
        model = PedidoCompra
        fields = ('id', 'numero', 'estado', 'pedido_em', 'itens')
