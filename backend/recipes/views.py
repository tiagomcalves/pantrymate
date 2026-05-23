from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import ReceitaSugerida
from .serializers import ReceitaSugeridaSerializer
from family.models import Familia, MembroFamilia


@api_view(['GET', 'POST'])
def receitas(request):
    membro = MembroFamilia.objects.filter(user=request.user).first()
    if not membro:
        familia = Familia.objects.first()
    else:
        familia = membro.family

    if not familia:
        return Response([], status=status.HTTP_200_OK)

    if request.method == 'GET':
        lista = ReceitaSugerida.objects.filter(familia=familia).order_by('-gerada_em')
        serializer = ReceitaSugeridaSerializer(lista, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ReceitaSugeridaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(familia=familia)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_400_BAD_REQUEST)
