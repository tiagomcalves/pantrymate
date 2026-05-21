from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Produto, ItemDispensa, Categoria
from .serializers import ProdutoSerializer, ItemDispensaSerializer
from family.models import Familia, MembroFamilia


@api_view(['GET'])
def products(request):
    if request.method == 'GET':
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def itens_dispensa(request):
    if request.method == 'GET':
        familia = None
        if request.user.is_authenticated:
            membro = MembroFamilia.objects.filter(user=request.user).first()
            if membro:
                familia = membro.family
        if not familia:
            familia = Familia.objects.first()
        if not familia:
            return Response([])
        itens = ItemDispensa.objects.filter(familia=familia)
        serializer = ItemDispensaSerializer(itens, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        nome = request.data.get('nome')
        quantidade = request.data.get('quantidade', 1)
        unidade = request.data.get('unidade', 'un')
        categoria_nome = request.data.get('categoria_nome', '')

        if not nome:
            return Response({'error': 'nome é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)

        categoria = None
        if categoria_nome:
            categoria, _ = Categoria.objects.get_or_create(nome=categoria_nome)

        produto, _ = Produto.objects.get_or_create(
            nome=nome,
            defaults={'categoria': categoria, 'unidade': unidade}
        )

        familia = None
        if request.user.is_authenticated:
            membro = MembroFamilia.objects.filter(user=request.user).first()
            if membro:
                familia = membro.family
        if not familia:
            familia = Familia.objects.first()

        if not familia:
            return Response({'error': 'Nenhuma família encontrada'}, status=status.HTTP_400_BAD_REQUEST)

        item = ItemDispensa.objects.create(
            produto=produto,
            familia=familia,
            quantidade=quantidade,
            unidade=unidade,
            adicionado_por=request.user if request.user.is_authenticated else None,
        )

        serializer = ItemDispensaSerializer(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
