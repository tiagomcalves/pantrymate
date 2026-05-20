from rest_framework import serializers

from family.models import MembroFamilia
from .models import Profile, User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username', 'first_name')

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    role = serializers.CharField(source='user.membrofamilia.role')
    # family = serializers.IntegerField(source='user.membrofamilia.family.id')
    # family_member_id = serializers.IntegerField(source='user.membrofamilia.id')

    class Meta:
        model = Profile
        fields = ('id', 'username', 'first_name', 'last_name', 'role')