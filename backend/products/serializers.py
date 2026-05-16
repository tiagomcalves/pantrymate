from rest_framework import serializers
from .models import Produto
from .models import ItemDispensa

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ('id', 'nome', 'categoria', 'imagem', 'unidade') #Todo tirei o campo codigo barras porque nao estava no models depois adicionar

class ItemDispensaSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(source='produto.nome', read_only=True)
    imagem = serializers.ImageField(source='produto.imagem', read_only=True)
    categoria = serializers.CharField(source='produto.categoria', read_only=True)
    class Meta:
        model = ItemDispensa
        fields = ('id', 'familia', 'nome', 'imagem', 'categoria', 'quantidade', 'unidade', 'data_validade', 'adicionado_em', 'adicionado_por')
