from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Categoria, Produto, ItemDispensa
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scanner_adicionar(request):
    """
    Aceita uma lista de produtos detetados pelo scanner e cria os respetivos
    ItemDispensa. Cria o Produto e a Categoria se ainda não existirem.
    Payload: { "produtos": [{ "nome", "quantidade", "unidade", "categoria_nome", "data_validade" }] }
    """
    produtos_data = request.data.get('produtos', [])
    if not produtos_data:
        return Response({'error': 'lista de produtos vazia'}, status=status.HTTP_400_BAD_REQUEST)

    familia = getattr(getattr(request.user, 'membrofamilia', None), 'family', None)
    if not familia:
        familia = Familia.objects.first()
    if not familia:
        return Response({'error': 'nenhuma família encontrada'}, status=status.HTTP_400_BAD_REQUEST)

    criados = []
    for p in produtos_data:
        nome = p.get('nome', '').strip()
        if not nome:
            continue
        categoria_nome = p.get('categoria_nome', '').strip()
        unidade = p.get('unidade', 'un')
        quantidade = p.get('quantidade', 1)
        data_validade = p.get('data_validade') or None

        categoria = None
        if categoria_nome:
            categoria, _ = Categoria.objects.get_or_create(nome=categoria_nome)

        produto, _ = Produto.objects.get_or_create(
            nome=nome,
            defaults={'categoria': categoria, 'unidade_padrao': unidade},
        )

        item = ItemDispensa.objects.create(
            produto=produto,
            familia=familia,
            quantidade=quantidade,
            unidade=unidade,
            data_validade=data_validade,
            adicionado_por=request.user,
        )
        criados.append(ItemDispensaSerializer(item).data)

    return Response({'adicionados': criados}, status=status.HTTP_201_CREATED)


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
    if not item_serialized.is_valid():
        return Response(status=status.HTTP_400_BAD_REQUEST)

    familia = request.user.membrofamilia.family
    produto = item_serialized.validated_data['produto']
    unidade = item_serialized.validated_data.get('unidade', '')
    quantidade = item_serialized.validated_data['quantidade']

    existente = ItemDispensa.objects.filter(
        familia=familia,
        produto=produto,
        unidade=unidade,
        congelado=item_serialized.validated_data.get('congelado', False),
    ).first()

    if existente:
        existente.quantidade += quantidade
        existente.save(update_fields=['quantidade'])
    else:
        item_serialized.save(familia=familia, adicionado_por=request.user)

    return Response(status=status.HTTP_201_CREATED)



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