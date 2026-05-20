from datetime import timezone

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Produto, ItemDispensa
from .serializers import ProdutoSerializer, ItemDispensaSerializer
from datetime import timedelta
from django.utils import timezone


@api_view(['GET'])
def products(request):
    if request.method == 'GET':
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def itens_dispensa(request):
    if request.method == 'GET':
        itens = ItemDispensa.objects.all()
        serializer = ItemDispensaSerializer(itens, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def items_dispensa(request):
    if request.method == 'GET':
        items = ItemDispensa.objects.all()
        serializer = ItemDispensaSerializer(items, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':  # (3)
        serializer = ItemDispensaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def items_dispensa_alertas(request):
    if request.method == 'GET':
        hoje = timezone.now().date()
        no_prazo_limite = hoje + timedelta(days=7)
        items = ItemDispensa.objects.filter(
            data_validade__lte=no_prazo_limite
        )
        serializer = ItemDispensaSerializer(items, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)