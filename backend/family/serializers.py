from rest_framework import serializers
from .models import MembroFamilia


class MembroFamiliaSerializer(serializers.ModelSerializer):
    nome = serializers.SerializerMethodField()
    role = serializers.CharField(source='papel')
    profile_id = serializers.SerializerMethodField()

    class Meta:
        model = MembroFamilia
        fields = ('id', 'nome', 'role', 'profile_id')

    def get_nome(self, obj):
        if obj.utilizador:
            full = f"{obj.utilizador.first_name} {obj.utilizador.last_name}".strip()
            return full or obj.nome
        return obj.nome

    def get_profile_id(self, obj):
        if obj.utilizador:
            try:
                return obj.utilizador.profile.id
            except Exception:
                return None
        return None
