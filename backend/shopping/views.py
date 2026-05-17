from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ItemListaCompra
from .serializers import ItemListaCompraSerializer
from family.models import Familia

# TODO: substituir por familia derivada do utilizador autenticado
FAMILIA_ID_DEFAULT = 1


def _get_familia(request):
    familia_id = request.query_params.get('familia_id', FAMILIA_ID_DEFAULT)
    familia, _ = Familia.objects.get_or_create(
        id=familia_id,
        defaults={'nome': 'Família Principal'}
    )
    return familia, None


@api_view(['GET', 'POST'])
def lista_compras(request):
    familia, err = _get_familia(request)
    if err:
        return err

    if request.method == 'GET':
        itens = ItemListaCompra.objects.filter(familia=familia)
        return Response(ItemListaCompraSerializer(itens, many=True).data)

    if request.method == 'POST':
        item = ItemListaCompra.objects.create(
            familia=familia,
            nome_livre=request.data.get('nome', ''),
            icone=request.data.get('icone', '🛒'),
            categoria=request.data.get('categoria', 'Outros'),
            quantidade=request.data.get('quantidade', 1),
            unidade=request.data.get('unidade', 'EA'),
        )
        return Response(ItemListaCompraSerializer(item).data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def item_lista_compras(request, pk):
    try:
        item = ItemListaCompra.objects.get(pk=pk)
    except ItemListaCompra.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
