from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *  # (1)


@api_view(['GET'])
def products(request):
    if request.method == 'GET':
        products_list = Product.objects.all()
        serializer = ProductsSerializer(products_list, many=True)
        return Response(serializer.data)

    return Response(status=status.HTTP_400_BAD_REQUEST)
