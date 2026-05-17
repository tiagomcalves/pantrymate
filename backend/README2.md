### PARA METER A BD LOCAL NO VOSSO PC
- Estar dentro da pasta `backend/`

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
python manage.py migrate
```

### 4. Criar conta de administrador
```powershell
python manage.py createsuperuser
```
Preenche o utilizador, email (opcional) e password quando pedido.

### 5. Iniciar o servidor
```powershell
python manage.py runserver
```

O servidor fica disponível em `http://localhost:8000`.

### 6. Aceder ao painel de administração
Abre `http://localhost:8000/admin/` e entra com as credenciais do passo 4.
A partir daqui podes criar e gerir todas as tabelas manualmente.

---

## Notas

- O ficheiro `db.sqlite3` é local e não está no git — cada pessoa tem a sua própria base de dados.
- Sempre que chegarem migrações novas via `git pull`, corre `python manage.py migrate` para as aplicar.
- Nunca é necessário correr `makemigrations` a menos que tenhas alterado os `models.py`.


## Base de Dados Relacional

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
| `nome` | texto | nome do membro |
| `utilizador` | FK → User | conta Django (opcional) |
| `familia` | FK → Familia | |
| `papel` | escolha | `junior` / `membro` / `administrador` |
| `juntou_em` | data/hora | automático |

---

### `products` — Catálogo e Dispensa

**Categoria**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `nome` | texto | ex: Frescos, Congelados |
| `icone` | imagem | upload para `media/categorias/` |

**Produto**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `nome` | texto | |
| `categoria` | FK → Categoria | opcional |
| `imagem` | imagem | upload para `media/produtos/` |
| `quantidade` | decimal | |
| `unidade` | escolha | `un` / `cx` / `kg` / `g` / `L` / `mL` |

**ItemDispensa**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `produto` | FK → Produto | |
| `quantidade` | decimal | |
| `unidade` | texto | |
| `data_validade` | data | opcional; ignorada quando `congelado = true` |
| `congelado` | booleano | `false` por defeito; quando `true`, a `data_validade` é devolvida como `null` pela API |
| `adicionado_em` | data/hora | automático |
| `adicionado_por` | FK → User | opcional |

**Endpoint:** `GET /products/api/itens/` — devolve todos os itens da dispensa. Itens com `congelado = true` têm `data_validade: null` na resposta JSON.

---

### `shopping` — Lista de Compras e Pedidos

**ItemListaCompra**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `produto` | FK → Produto | opcional |
| `quantidade` | decimal | |
| `unidade` | texto | |
| `adicionado_por` | FK → User | opcional |

**PedidoCompra** *(pedido feito por um Junior, sujeito a aprovação)*
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `familia` | FK → Familia | |
| `pedido_por` | FK → User | o junior |
| `estado` | escolha | `pendente` / `aprovado` / `recusado` |
| `pedido_em` | data/hora | automático |
| `revisto_por` | FK → User | quem aprovou/recusou (opcional) |

**ItemPedidoCompra** *(artigos dentro de um pedido)*
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `pedido` | FK → PedidoCompra | |
| `produto` | FK → Produto | opcional |

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
| `produto_imagem` | FK → Produto | produto cuja imagem representa a receita |
| `ingredientes_usados` | JSON | lista de texto livre devolvida pela IA |
| `gerada_em` | data/hora | automático |

---
