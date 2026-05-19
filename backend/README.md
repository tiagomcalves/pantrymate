
# Sequencia de criacao e alteracao de Apps no Django

## 1) Criar nova App
`python manage.py startapp <NewApp>`

## 2) Aceder a 'backend/settings.py' e adicionar nova app:

```python
INSTALLED_APPS = [
    'newapp.apps.NewAppConfig',     # adicionar nova linha
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles'
]
```

## 3) Editar o ficheiro 'NewApp/models.py' com os novos modelos de dados

Exemplo:
```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=120)
    img = models.CharField(max_length=64)

    def __str__(self):
        return self.name
```

## 4) Efetuar migrações

```shell
python manage.py makemigrations NewApp
python manage.py migrate
```

## Criação e integração da nova App concluída
# Se fizer alterações à estrutura dos modelos, tem que repetir o passo 4 


# Novo script para popular base de dados vazia com users de demonstracao

`python manage.py sample_users`