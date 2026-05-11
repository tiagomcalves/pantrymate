from django.db import models
from django.conf import settings


class Familia(models.Model):
    nome = models.CharField(max_length=100)
    criada_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


class MembroFamilia(models.Model):
    PAPEL_CHOICES = [
        ('junior', 'Junior'),
        ('membro', 'Membro'),
        ('administrador', 'Administrador'),
    ]

    nome = models.CharField(max_length=100)
    utilizador = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='familias'
    )
    familia = models.ForeignKey(
        Familia, on_delete=models.CASCADE, related_name='membros'
    )
    papel = models.CharField(max_length=20, choices=PAPEL_CHOICES, default='membro')
    juntou_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} — {self.familia.nome} ({self.papel})"
