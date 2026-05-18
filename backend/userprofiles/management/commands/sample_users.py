from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from family.models import Familia, MembroFamilia

User = get_user_model()

SAMPLE_USERS = [
    {"first": "Maria", "last": "Marques", "role": "admin"},
    {"first": "Joao",  "last": "Silva",   "role": "admin"},
    {"first": "Ana",   "last": "Lucas",   "role": "member"},
    {"first": "Pedro", "last": "Faria",   "role": "junior"},
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
        familia, _ = Familia.objects.get_or_create(id=1, defaults={"nome": "Família Principal"})

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

            user.profile.role = data["role"]
            user.profile.save()

            MembroFamilia.objects.get_or_create(
                utilizador=user,
                familia=familia,
                defaults={"nome": f"{data['first']} {data['last']}", "papel": data["role"]},
            )

            self.stdout.write(f"Criado: {username} / {password}  [{data['role']}]")

        self.stdout.write(self.style.SUCCESS("Utilizadores de demonstração criados com sucesso."))
