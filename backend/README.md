# Backend — PantryMate

## Configuração inicial

Estar dentro da pasta `backend/`.

### 1. Ativar o ambiente virtual
```powershell
.\.venv\Scripts\Activate.ps1
```
O prompt deve mostrar `(.venv)` no início.

### 2. Instalar dependências
Só é necessário na primeira vez ou após alterações ao `requirements.txt`:
```powershell
pip install -r requirements.txt
```

### 3. Criar as tabelas da base de dados
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 4. Popular com dados de demonstração
```powershell
python manage.py sample_users   # cria utilizadores e famílias de exemplo
python manage.py sample_data    # popula produtos, dispensa e receitas
```

### 5. Iniciar o servidor
```powershell
python manage.py runserver
```
O servidor fica disponível em `http://localhost:8000`.

### 6. Painel de administração
Abre `http://localhost:8000/admin/` e entra com as credenciais criadas pelo `sample_users`.

---

## Notas

- O ficheiro `db.sqlite3` é local e não está no git — cada pessoa tem a sua própria base de dados.
- Sempre que chegarem alterações aos `models.py` via `git pull`, corre `makemigrations` e `migrate` para as aplicar.

---

## Adicionar uma nova App

### 1. Criar a app
```bash
python manage.py startapp <NovaApp>
```

### 2. Registar em `backend/settings.py`
```python
INSTALLED_APPS = [
    'novaapp.apps.NovaAppConfig',  # adicionar
    ...
]
```

### 3. Editar `novaapp/models.py` com os modelos pretendidos

### 4. Efetuar migrações
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Base de Dados — Estrutura Atual

### `userprofiles` — Perfis de Utilizador

**Profile**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `user` | OneToOne → User | utilizador Django associado |
| `creation_date` | data/hora | automático |

> Criado automaticamente via signal `post_save` quando um `User` é criado.

---

### `family` — Família e Membros

**Familia**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `nome` | texto | nome da família |
| `criada_em` | data/hora | automático |

**MembroFamilia**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `family` | FK → Familia | família a que pertence |
| `user` | OneToOne → User | conta Django (opcional) |
| `role` | escolha | `admin` / `member` / `junior` |
| `join_date` | data/hora | automático |

---

### `products` — Catálogo e Dispensa

**Categoria**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `nome` | texto | ex: Frescos, Congelados, Laticínios |
| `icone` | imagem | upload para `media/categorias/` (opcional) |

**Produto**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `nome` | texto | |
| `categoria` | FK → Categoria | opcional |
| `unidade_padrao` | escolha | `un` / `cx` / `kg` / `g` / `L` / `mL` |
| `imagem` | imagem | upload para `media/produtos/` (opcional) |

**ItemDispensa**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `produto` | FK → Produto | |
| `quantidade` | decimal | |
| `unidade` | texto | |
| `data_validade` | data | opcional; devolvida como `null` pela API quando `congelado = true` |
| `congelado` | booleano | `false` por defeito |
| `adicionado_em` | data/hora | automático |
| `adicionado_por` | FK → User | opcional |

---

### `shopping` — Lista de Compras e Pedidos

**ItemListaCompra**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `produto` | FK → Produto | opcional |
| `quantidade` | decimal | default: 1 |
| `unidade` | texto | |
| `adicionado_por` | FK → User | opcional |
| `nome_livre` | texto | nome manual quando não há produto na BD (opcional) |
| `categoria` | texto | categoria em texto livre (opcional) |

**PedidoCompra** *(pedido feito por um Junior, sujeito a aprovação)*
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `pedido_por` | FK → User | o junior que fez o pedido |
| `estado` | escolha | `pendente` / `aprovado` / `recusado` |
| `pedido_em` | data/hora | automático |
| `revisto_por` | FK → User | quem aprovou/recusou (opcional) |

**ItemPedidoCompra** *(artigos dentro de um pedido)*
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `pedido` | FK → PedidoCompra | |
| `produto` | FK → Produto | opcional |
| `nome_livre` | texto | nome manual quando não há produto na BD (opcional) |

---

### `recipes` — Receitas Sugeridas por IA

**ReceitaSugerida**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `nome` | texto | |
| `descricao` | texto longo | opcional |
| `tempo_preparacao` | inteiro | minutos |
| `produto_imagem` | FK → Produto | produto cuja imagem representa a receita (opcional) |
| `ingredientes_usados` | JSON | lista de texto devolvida pela IA |
| `passos` | JSON | lista de passos de preparação devolvida pela IA |
| `gerada_em` | data/hora | automático |
