from rest_framework import serializers
from .models import Produto, ItemDispensa


class ProdutoSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)

    class Meta:
        model = Produto
        fields = ('id', 'nome', 'categoria', 'categoria_nome', 'imagem', 'unidade_padrao')


class ItemDispensaSerializer(serializers.ModelSerializer):
    data_validade = serializers.CharField(required=False, allow_null=True)
    nome = serializers.CharField(source='produto.nome', read_only=True)
    imagem = serializers.ImageField(source='produto.imagem', read_only=True)
    categoria = serializers.CharField(source='produto.categoria', read_only=True)
    produto = serializers.PrimaryKeyRelatedField(queryset=Produto.objects.all())

    class Meta:
        model = ItemDispensa
        fields = (
            'id', 'produto', 'nome', 'imagem', 'categoria','quantidade', 'unidade',
            'data_validade', 'congelado', 'adicionado_em', 'adicionado_por',
        )

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        if instance.congelado:
            ret['data_validade'] = None

        return ret
