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
