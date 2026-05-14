from django.db import models
from django.conf import settings


class Categoria(models.Model):
    nome = models.CharField(max_length=50)
    icone = models.ImageField(upload_to='categorias/', blank=True, null=True)

    def __str__(self):
        return self.nome


class Produto(models.Model):
    UNIDADE_CHOICES = [
        ('un', 'Unidade'),
        ('cx', 'Caixa'),
        ('kg', 'Quilograma'),
        ('g', 'Grama'),
        ('L', 'Litro'),
        ('mL', 'Mililitro'),
    ]

    nome = models.CharField(max_length=120)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.SET_NULL, null=True, blank=True, related_name='produtos'
    )
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)
    quantidade = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    unidade = models.CharField(max_length=20, choices=UNIDADE_CHOICES, default='un')

    def __str__(self):
        return self.nome


class ItemDispensa(models.Model):
    familia = models.ForeignKey(
        'family.Familia', on_delete=models.CASCADE, related_name='itens_dispensa'
    )
    produto = models.ForeignKey(
        Produto, on_delete=models.CASCADE, related_name='itens_dispensa'
    )
    quantidade = models.DecimalField(max_digits=8, decimal_places=2)
    unidade = models.CharField(max_length=20, blank=True)
    data_validade = models.DateField(null=True, blank=True)
    adicionado_em = models.DateTimeField(auto_now_add=True)
    adicionado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.produto.nome} — {self.familia.nome}"