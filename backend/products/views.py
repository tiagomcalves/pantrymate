from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Produto, ItemDispensa
from .serializers import ProdutoSerializer, ItemDispensaSerializer


@api_view(['GET'])
def products(request):
    if request.method == 'GET':
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def items_dispensa(request):
    if request.method == 'GET':
        items = ItemDispensa.objects.all()
        serializer = ItemDispensaSerializer(items, many=True)
        return Response(serializer.data)

    return Response(status=status.HTTP_400_BAD_REQUEST)
