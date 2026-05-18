from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Creates sample users and admin user"

    def handle(self, *args, **kwargs):

        # Create admin
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@pantrymate.pt",
                password="admin123"
            )
            self.stdout.write("Created admin user")

        self.create_sample_users()

        self.stdout.write(self.style.SUCCESS("Done creating sample users"))

    def create_sample_users(self):

        first_names = ["Maria", "Joao", "Ana", "Pedro"]
        last_names = ["Marques", "Silva", "Lucas", "Faria"]

        for i in range(len(first_names)):
            username = first_names[i].lower()
            email = f"{username}@pantrymate.pt"
            password = f"{username}123"

            if User.objects.filter(username=username).exists():
                self.stdout.write(f"Skipping {username}")
                continue

            User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_names[i],
                last_name=last_names[i],
            )

            self.stdout.write(f"Created user {username}")