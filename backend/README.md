# Backend — PantryMate

## Projeto elaborado por
- Rúben Rocha – Aluno N.º 66174
- Tiago Alves – Aluno N.º 106090
- Rodrigo Delaunay – Aluno N.º 122123
- Gonçalo Moita – Aluno N.º 123283

## Configuração inicial para correr MANUALMENTE (fora setup.ps1 e run.bat)

Estar dentro da pasta `backend/`.

### 1. Ativar o ambiente virtual
```powershell
.\.venv\Scripts\Activate.ps1
```

### 2. Instalar dependências

```powershell
pip install -r requirements.txt
```

### 3. Criar as tabelas da base de dados
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 4. Dados demonstração
```powershell
python manage.py sample_users   # cria utilizadores e famílias de exemplo
python manage.py sample_data    # popula produtos, dispensa e receitas
```

### 5. Iniciar o servidor
```powershell
python manage.py runserver
```
`http://localhost:8000`.

### 6. Painel de administração
`http://localhost:8000/admin/`

## BD— Estrutura

### `userprofiles` — Perfis de Utilizador

**Profile**
| Campo | Tipo | Notas |
|---|---|---|
| `id` | PK | automático |
| `user` | OneToOne → User | utilizador Django associado |
| `creation_date` | data/hora | automático |

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
