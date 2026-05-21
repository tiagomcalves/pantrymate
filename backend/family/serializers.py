from rest_framework import serializers
from .models import MembroFamilia, Familia


class FamiliaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Familia
        fields = ('id', 'nome', 'criada_em')


class MembroFamiliaSerializer(serializers.ModelSerializer):

    profile_id = serializers.IntegerField(source='user.profile.id')

    class Meta:
        model = MembroFamilia
        fields = ('id', 'family', 'user', 'role', 'profile_id')

    # def get_nome(self, obj):
    #     if obj.utilizador:
    #         full = f"{obj.utilizador.first_name} {obj.utilizador.last_name}".strip()
    #         return full or obj.nome
    #     return obj.nome

class FamilyMembersListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.membrofamilia.id')
    nome = serializers.SerializerMethodField()

    class Meta:
        model = MembroFamilia
        fields = ('id', 'nome', 'role')

    def get_nome(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"