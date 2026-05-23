from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ItemListaCompra, PedidoCompra, ItemPedidoCompra
from .serializers import ItemListaCompraSerializer, PedidoCompraSerializer
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
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def item_lista_compras(request, pk):
    try:
        item = ItemListaCompra.objects.get(pk=pk)
    except ItemListaCompra.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def pedidos_compra(request):
    familia, err = _get_familia(request)
    if err:
        return err

    if request.method == 'GET':
        pedidos = PedidoCompra.objects.filter(familia=familia).prefetch_related('itens').order_by('-pedido_em')
        return Response(PedidoCompraSerializer(pedidos, many=True).data)

    if request.method == 'POST':
        itens_data = request.data.get('itens', [])
        pedido = PedidoCompra.objects.create(
            familia=familia,
            pedido_por=request.user if request.user.is_authenticated else None,
        )
        for item in itens_data:
            ItemPedidoCompra.objects.create(
                pedido=pedido,
                nome_livre=item.get('nome', ''),
                icone=item.get('icone', '🛒'),
            )
        return Response(PedidoCompraSerializer(pedido).data, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def pedido_detail(request, pk):
    try:
        pedido = PedidoCompra.objects.prefetch_related('itens').get(pk=pk)
    except PedidoCompra.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    estado = request.data.get('estado')
    if estado not in ['aprovado', 'recusado']:
        return Response({'error': 'estado inválido'}, status=status.HTTP_400_BAD_REQUEST)

    pedido.estado = estado
    pedido.revisto_por = request.user if request.user.is_authenticated else None
    pedido.save()

    if estado == 'aprovado':
        for item in pedido.itens.all():
            ItemListaCompra.objects.create(
                familia=pedido.familia,
                nome_livre=item.nome_livre,
                icone=item.icone,
                categoria='Outros',
                quantidade=1,
                unidade='EA',
            )

    return Response(PedidoCompraSerializer(pedido).data)
