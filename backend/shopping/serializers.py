from rest_framework import serializers
from .models import ItemListaCompra


class ItemListaCompraSerializer(serializers.ModelSerializer):
    nome = serializers.SerializerMethodField()

    def get_nome(self, obj):
        return obj.produto.nome if obj.produto else obj.nome_livre

    class Meta:
        model = ItemListaCompra
        fields = ('id', 'nome', 'icone', 'categoria', 'quantidade', 'unidade')
