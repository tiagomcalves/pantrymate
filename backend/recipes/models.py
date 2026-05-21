from django.db import models


class ReceitaSugerida(models.Model):
    familia = models.ForeignKey(
        'family.Familia', on_delete=models.CASCADE, related_name='receitas_sugeridas'
    )
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    tempo_preparacao = models.IntegerField(help_text='minutos')
    produto_imagem = models.ForeignKey(
        'products.Produto', on_delete=models.SET_NULL, null=True, blank=True,
        related_name='receitas_como_imagem'
    )
    # listas tal como a IA devolve
    ingredientes_usados = models.JSONField(default=list)
    passos = models.JSONField(default=list)
    gerada_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.familia.nome})"
