from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Produto, ItemDispensa
from .serializers import ProdutoSerializer, ItemDispensaSerializer
from family.models import Familia, MembroFamilia
from datetime import timedelta
from django.utils import timezone


@api_view(['GET'])
def products(request):
    if request.method == 'GET':
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

#
# @api_view(['GET', 'POST'])
# def itens_dispensa(request):
#     if request.method == 'GET':
#         itens = ItemDispensa.objects.all()
#         serializer = ItemDispensaSerializer(itens, many=True)
#         return Response(serializer.data)
#
#     if request.method == 'POST':
#         nome = request.data.get('nome')
#         quantidade = request.data.get('quantidade', 1)
#         unidade = request.data.get('unidade', 'un')
#         categoria_nome = request.data.get('categoria_nome', '')
#
#         if not nome:
#             return Response({'error': 'nome é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)
#
#         categoria = None
#         if categoria_nome:
#             categoria, _ = Categoria.objects.get_or_create(nome=categoria_nome)
#
#         produto, _ = Produto.objects.get_or_create(
#             nome=nome,
#             defaults={'categoria': categoria, 'unidade': unidade}
#         )
#
#         familia = None
#         if request.user.is_authenticated:
#             membro = MembroFamilia.objects.filter(user=request.user).first()
#             if membro:
#                 familia = membro.family
#         if not familia:
#             familia = Familia.objects.first()
#
#         if not familia:
#             return Response({'error': 'Nenhuma família encontrada'}, status=status.HTTP_400_BAD_REQUEST)
#
#         item = ItemDispensa.objects.create(
#             produto=produto,
#             familia=familia,
#             quantidade=quantidade,
#             unidade=unidade,
#             adicionado_por=request.user if request.user.is_authenticated else None,
#         )
#
#         serializer = ItemDispensaSerializer(item)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def items_dispensa(request):
    if request.method == 'GET':
        user_family = request.user.membrofamilia.family
        items = ItemDispensa.objects.filter(familia=user_family)
        serializer = ItemDispensaSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'POST':  # (3)
        return add_item_dispensa(request)

    return Response(status=status.HTTP_400_BAD_REQUEST)


def add_item_dispensa(request) -> Response:

    item_serialized = ItemDispensaSerializer(data=request.data)
    if item_serialized.is_valid():
        item_serialized.save(
            familia=request.user.membrofamilia.family,
            adicionado_por=request.user
        )
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def items_dispensa_alertas(request):
    if request.method == 'GET':
        hoje = timezone.now().date()
        no_prazo_limite = hoje + timedelta(days=3)
        items = ItemDispensa.objects.filter(
            data_validade__lte=no_prazo_limite,
            familia=request.user.membrofamilia.family
        )
        serializer = ItemDispensaSerializer(items, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)