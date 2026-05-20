from django.contrib.auth.models import User
from django.db import models


class Familia(models.Model):
    nome = models.CharField(max_length=100)
    criada_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_members(self):
        return self.membrofamilia_set.all()


class MembroFamilia(models.Model):
    PAPEL_CHOICES = [
        ('admin', 'Administrador'),
        ('member', 'Membro'),
        ('junior', 'Júnior'),
    ]

    family = models.ForeignKey(
        Familia, on_delete=models.CASCADE)  #talvez set null mas necessario adicionar safe checks

    user = models.OneToOneField(
        User, on_delete=models.CASCADE,     #nao devia ser cascade
        null=True)

    role = models.CharField(max_length=20, choices=PAPEL_CHOICES, default='member')
    join_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} — {self.family.nome} ({self.role})"