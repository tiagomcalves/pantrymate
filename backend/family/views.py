from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Familia, MembroFamilia
from .serializers import MembroFamiliaSerializer

FAMILIA_ID_DEFAULT = 1


def _get_familia(familia_id):
    familia, _ = Familia.objects.get_or_create(
        id=familia_id,
        defaults={'nome': 'Família Principal'}
    )
    return familia


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def membros(request):
    familia_id = request.query_params.get('familia_id', FAMILIA_ID_DEFAULT)
    familia = _get_familia(familia_id)

    if request.method == 'GET':
        qs = MembroFamilia.objects.filter(familia=familia).select_related('utilizador', 'utilizador__profile')
        return Response(MembroFamiliaSerializer(qs, many=True).data)

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

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=primeiro,
            last_name=ultimo,
        )
        user.profile.role = role
        user.profile.save()

        membro = MembroFamilia.objects.create(
            nome=nome_completo,
            utilizador=user,
            familia=familia,
            papel=role,
        )
        return Response(MembroFamiliaSerializer(membro).data, status=status.HTTP_201_CREATED)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def membro_detail(request, pk):
    try:
        membro = MembroFamilia.objects.select_related('utilizador', 'utilizador__profile').get(pk=pk)
    except MembroFamilia.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        if membro.utilizador:
            membro.utilizador.delete()
        else:
            membro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'PATCH':
        role = request.data.get('role')
        nome_completo = request.data.get('nome', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        if role:
            membro.papel = role
            if membro.utilizador:
                membro.utilizador.profile.role = role
                membro.utilizador.profile.save()

        if nome_completo:
            membro.nome = nome_completo
            if membro.utilizador:
                parts = nome_completo.split(' ', 1)
                membro.utilizador.first_name = parts[0]
                membro.utilizador.last_name = parts[1] if len(parts) > 1 else ''

        if email and membro.utilizador:
            membro.utilizador.email = email

        if password and membro.utilizador:
            membro.utilizador.set_password(password)

        if membro.utilizador:
            membro.utilizador.save()
        membro.save()

        return Response(MembroFamiliaSerializer(membro).data)
