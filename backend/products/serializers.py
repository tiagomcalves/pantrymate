from rest_framework import serializers
from .models import Produto, ItemDispensa


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ('id', 'nome', 'categoria', 'imagem', 'unidade')


class ItemDispensaSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(source='produto.nome', read_only=True)
    imagem = serializers.ImageField(source='produto.imagem', read_only=True)
    data_validade = serializers.SerializerMethodField()

    def get_data_validade(self, obj):
        if obj.congelado:
            return None
        return obj.data_validade

    class Meta:
        model = ItemDispensa
        fields = (
            'id', 'produto', 'nome', 'imagem', 'familia', 'quantidade', 'unidade',
            'data_validade', 'congelado', 'adicionado_em', 'adicionado_por',
        )
