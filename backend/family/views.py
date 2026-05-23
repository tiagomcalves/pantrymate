from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from userprofiles.serializers import ProfileSerializer
from .models import Familia, MembroFamilia
from .serializers import MembroFamiliaSerializer, FamilyMembersListSerializer

FAMILIA_ID_DEFAULT = 1


def _get_familia(familia_id):
    familia, _ = Familia.objects.get_or_create(
        id=familia_id,
        defaults={'nome': 'Família Principal'}
    )
    return familia


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def membros(request):

    if not hasattr(request.user, "membrofamilia"):
        return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'GET':
        qs = request.user.membrofamilia.family.get_members()
        return Response(FamilyMembersListSerializer(qs, many=True).data)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def membro_add(request):

    role = request.user.profile.get_family_role()

    if role != "admin":
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        nome_completo = request.data.get('nome', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')
        role = request.data.get('role', 'member')

        if not nome_completo or not email or not password:
            return Response({'error': 'nome, email e password são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Já existe um utilizador com este email.'}, status=status.HTTP_400_BAD_REQUEST)

        parts = nome_completo.split(' ', 1)
        primeiro = parts[0]
        ultimo = parts[1] if len(parts) > 1 else ''

        username = email.split('@', 1)

        user = User.objects.create_user(
            username=username[0],
            email=email,
            password=password,
            first_name=primeiro,
            last_name=ultimo,
        )
        user.profile.role = role
        user.profile.save()

        family_id = request.user.membrofamilia.family

        membro = MembroFamilia.objects.create(
            user=user,
            family=family_id,
            role=role,
        )
        return Response(FamilyMembersListSerializer(membro).data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def membro_detail(request, pk):
    try:
        membro = MembroFamilia.objects.select_related('user', 'user__profile').get(pk=pk)
    except MembroFamilia.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        if membro.user:
            membro.user.delete()
        else:
            membro.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    if request.method == 'PATCH':
        role = request.data.get('role')
        nome_completo = request.data.get('nome', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        if role:
            membro.role = role
            if membro.user:
                membro.user.profile.role = role
                membro.user.profile.save()

        if nome_completo:
            membro.nome = nome_completo
            if membro.user:
                parts = nome_completo.split(' ', 1)
                membro.user.first_name = parts[0]
                membro.user.last_name = parts[1] if len(parts) > 1 else ''

        if email and membro.user:
            membro.user.email = email

        if password and membro.user:
            membro.user.set_password(password)

        if membro.user:
            membro.user.save()
        membro.save()

        return Response(FamilyMembersListSerializer(membro).data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)