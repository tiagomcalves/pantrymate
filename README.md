# PantryMate
## Projeto final DIAM elaborado por:
- Rúben Rocha – Aluno N.º 66174
- Tiago Alves – Aluno N.º 106090
- Rodrigo Delaunay – Aluno N.º 122123
- Gonçalo Moita – Aluno N.º 123283

---

### Sobre o projeto

PantryMate é uma aplicação web de gestão de despensa familiar que permite controlar stocks, datas de validade, listas de compras e sugestões de receitas geradas por IA.

O projeto está dividido em duas pastas principais:
- `backend/` — API Django REST (Python)
- `frontend/` — Interface React + Vite (JavaScript)

---

### Correr com run.bat

**1ª vez — setup inicial:**
```powershell
.\setup.ps1
```
Cria o ambiente virtual Python, instala todas as dependências e instala os pacotes npm do frontend.

**Depois (e nas vezes seguintes):**
```
run.bat
```

---

### Correr manualmente (sem run.bat)

**1ª vez — setup inicial** (igual ao método com bat):
```powershell
.\setup.ps1
```

**Backend** (dentro da pasta `backend/`):
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py sample_users
python manage.py sample_data
python manage.py runserver
```

**Frontend** (dentro da pasta `frontend/`):
```bash
npm run dev
```

---

### Dados criados pelo `sample_users` + `sample_data`

**Utilizadores criados (QUE DEVERÃO SER UTILIZADOS PARA EFETUAR LOG-IN NA PLATAFORMA):**
- `admin` / `admin123` — superuser (Django Admin)
- `maria` / `maria123` — Maria Silva, admin da Família Silva
- `joao` / `joao123` — Joao Silva, admin da Família Silva
- `ana` / `ana123` — Ana Silva, member da Família Silva
- `pedro` / `pedro123` — Pedro Silva, junior da Família Silva
- `claudia` / `claudia123` — Claudia Marques, admin da Família Marques
- `goncalo` / `goncalo123` — Gonçalo Marques, member da Família Marques
- `hugo` / `hugo123` — Hugo Marques, junior da Família Marques

> Roles: `admin` gere a família; `member` tem acesso completo; `junior` tem acesso limitado.

**Famílias criadas:** Família Silva · Família Marques

**Catálogo de produtos criado (21 produtos):** Frescos (Tomates Frescos, Fiambre Fatiado, Peitos de Frango, Ovos, Presunto Curado), Congelados (Salmão, Hambúrgueres, Ervilhas), Laticínios (Queijo Flamengo, Leite, Iogurte Natural, Manteiga), Mercearia (Massa Esparguete, Arroz, Feijão, Azeite, Açúcar), Padaria (Pão de Forma, Tostas), Bebidas (Água, Sumo de Laranja).

**Dispensa da Família Silva (14 itens):** Tomates Frescos, Fiambre Fatiado, Peitos de Frango (congelado), Queijo Flamengo, Ovos, Presunto Curado, Leite, Iogurte Natural, Massa Esparguete, Arroz, Azeite, Pão de Forma, Água, Salmão (congelado).

**Dispensa da Família Marques (9 itens):** Tomates Frescos, Hambúrgueres (congelado), Ervilhas (congelado), Leite, Manteiga, Feijão, Açúcar, Tostas, Sumo de Laranja.

**Receitas sugeridas criadas (para ambas as famílias):** Paloco do ISCTE, Exemplo estático, Bife à molho do chefe do ISCTE.
