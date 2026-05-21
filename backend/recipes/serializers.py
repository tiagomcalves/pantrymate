from rest_framework import serializers
from .models import ReceitaSugerida


class ReceitaSugeridaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceitaSugerida
        fields = ('id', 'nome', 'descricao', 'tempo_preparacao', 'ingredientes_usados', 'passos', 'gerada_em')
        read_only_fields = ('id', 'gerada_em')
