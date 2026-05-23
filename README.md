# PantryMate
## a DIAM project by
- Gonçalo Moita
- Rodrigo Delaunay
- Rúben Rocha
- Tiago Alves

---

### Correr com run.bat (recomendado)

**1ª vez — setup inicial:**
```powershell
.\setup.ps1
```
Cria o ambiente virtual Python, instala todas as dependências e instala os pacotes npm do frontend.

**Depois (e nas vezes seguintes):**
```
run.bat
```
Instala dependências Python automaticamente, cria e popula a base de dados se ainda não existir, e arranca o frontend e o backend em janelas separadas.

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
