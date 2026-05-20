from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from family.models import Familia, MembroFamilia
from userprofiles.models import Profile

User = get_user_model()

SAMPLE_USERS = [
    {"first": "Maria",      "last": "Silva",    "role": "admin", "familia": 1},
    {"first": "Joao",       "last": "Silva",    "role": "admin", "familia": 1},
    {"first": "Ana",        "last": "Silva",    "role": "member", "familia": 1},
    {"first": "Pedro",      "last": "Silva",    "role": "junior", "familia": 1},

    {"first": "Claudia",    "last": "Marques",   "role": "admin", "familia": 2},
    {"first": "Gonçalo",    "last": "Marques",   "role": "member", "familia": 2},
    {"first": "Hugo",       "last": "Marques",   "role": "junior", "familia": 2}
]


class Command(BaseCommand):
    help = "Cria utilizadores de demonstração com roles e família"

    def handle(self, *args, **kwargs):
        # Superuser admin
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@pantrymate.pt",
                password="admin123"
            )
            self.stdout.write("Criado superuser: admin / admin123")

        # Família de demonstração
        familia1, _ = Familia.objects.get_or_create(id=1, defaults={"nome": "Familia Silva"})
        familia2, _ = Familia.objects.get_or_create(id=2, defaults={"nome": "Familia Marques"})

        familia = Familia.objects.all()

        for data in SAMPLE_USERS:
            username = data["first"].lower()
            email = f"{username}@pantrymate.pt"
            password = f"{username}123"

            if User.objects.filter(username=username).exists():
                self.stdout.write(f"Ignorado (já existe): {username}")
                continue

            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=data["first"],
                last_name=data["last"],
            )

            MembroFamilia.objects.get_or_create(
                user=user,
                family=familia.get(id=data["familia"]),
                role=data["role"]
            )

            self.stdout.write(f"Criado: {username} / {password}  [{data['role']}]")

        self.stdout.write(self.style.SUCCESS("Utilizadores de demonstração criados com sucesso."))
