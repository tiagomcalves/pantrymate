from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from products.models import Categoria, Produto, ItemDispensa
from family.models import Familia
from recipes.models import ReceitaSugerida

CATEGORIAS = [
    "Frescos",
    "Congelados",
    "Laticínios",
    "Mercearia",
    "Padaria",
    "Bebidas",
]

# (nome, categoria, unidade, imagem)
PRODUTOS = [
    ("Tomates Frescos",  "Frescos",    "kg",  "produtos/tomates_frescos.jpg"),
    ("Fiambre Fatiado",  "Frescos",    "g",   "produtos/fiambre_fatiado.jpg"),
    ("Peitos de Frango", "Frescos",    "kg",  "produtos/peitos_frango.jpg"),
    ("Queijo Flamengo",  "Laticínios", "g",   "produtos/queijo_flamengo.jpg"),
    ("Ovos",             "Frescos",    "un",  "produtos/ovos.jpg"),
    ("Presunto Curado",  "Frescos",    "un",  "produtos/presunto.jpg"),
    ("Salmão",           "Congelados", "kg",  "produtos/salmao.jpg"),
    ("Hambúrgueres",     "Congelados", "un",  "produtos/hamburgueres.jpg"),
    ("Ervilhas",         "Congelados", "kg",  "produtos/ervilhas.jpg"),
    ("Leite",            "Laticínios", "L",   "produtos/leite.jpg"),
    ("Iogurte Natural",  "Laticínios", "un",  "produtos/iogurte.jpg"),
    ("Manteiga",         "Laticínios", "un",  "produtos/manteiga.jpg"),
    ("Massa Esparguete", "Mercearia",  "un",  "produtos/massa_esparguete.jpg"),
    ("Arroz",            "Mercearia",  "kg",  "produtos/arroz.jpg"),
    ("Feijão",           "Mercearia",  "un",  "produtos/feijao.jpg"),
    ("Azeite",           "Mercearia",  "L",   "produtos/azeite.jpg"),
    ("Açúcar",           "Mercearia",  "kg",  "produtos/acucar.jpg"),
    ("Pão de Forma",     "Padaria",    "un",  "produtos/pao_de_forma.jpg"),
    ("Tostas",           "Padaria",    "un",  "produtos/tostas.jpg"),
    ("Água",             "Bebidas",    "L",   "produtos/agua.jpg"),
    ("Sumo de Laranja",  "Bebidas",    "L",   "produtos/sumo_laranja.jpg"),
]

hoje = timezone.now().date()

# (produto, quantidade, unidade, dias_ate_validade, congelado)
# dias negativos = já expirado; None = congelado sem data
DISPENSA_FAMILIA1 = [
    ("Tomates Frescos",  6,  "un",  3,     False),
    ("Fiambre Fatiado",  200,  "g",  5,     False),
    ("Peitos de Frango", 2,  "kg",  None,  True),
    ("Queijo Flamengo",  300,  "g",  7,     False),
    ("Ovos",             12, "un",  21,    False),
    ("Presunto Curado",  1,  "un",  25,    False),
    ("Leite",            2,  "L",   4,     False),
    ("Iogurte Natural",  4,  "un",  6,     False),
    ("Massa Esparguete", 3,  "un",  200,   False),
    ("Arroz",            1,  "kg",  300,   False),
    ("Azeite",           1,  "L",   400,   False),
    ("Pão de Forma",     1,  "un",  2,     False),
    ("Água",             6,  "L",   365,   False),
    ("Salmão",           2,  "kg",  None,  True),
]

DISPENSA_FAMILIA2 = [
    ("Tomates Frescos",  4,  "un",  2,     False),
    ("Hambúrgueres",     4,  "un",  None,  True),
    ("Ervilhas",         1,  "kg",  None,  True),
    ("Leite",            3,  "L",   5,     False),
    ("Manteiga",         1,  "un",  30,    False),
    ("Feijão",           2,  "un",  180,   False),
    ("Açúcar",           1,  "kg",  365,   False),
    ("Tostas",           1,  "un",  60,    False),
    ("Sumo de Laranja",  2,  "L",   10,    False),
]


class Command(BaseCommand):
    help = "Popula a base de dados com produtos e itens de dispensa de exemplo"

    def handle(self, *args, **kwargs):
        # Categorias
        categorias = {}
        for nome in CATEGORIAS:
            cat, created = Categoria.objects.get_or_create(nome=nome)
            categorias[nome] = cat
            if created:
                self.stdout.write(f"  Categoria criada: {nome}")

        # Produtos
        produtos = {}
        for nome, cat_nome, unidade, imagem in PRODUTOS:
            prod, created = Produto.objects.get_or_create(
                nome=nome,
                defaults={"categoria": categorias[cat_nome], "unidade_padrao": unidade, "imagem": imagem}
            )
            if not created:
                atualizar = []
                if prod.unidade_padrao != unidade:
                    prod.unidade_padrao = unidade
                    atualizar.append("unidade_padrao")
                if not prod.imagem:
                    prod.imagem = imagem
                    atualizar.append("imagem")
                if atualizar:
                    prod.save(update_fields=atualizar)
            produtos[nome] = prod
            if created:
                self.stdout.write(f"  Produto criado: {nome}")

        # Dispensa
        familia1 = Familia.objects.filter(id=1).first()
        familia2 = Familia.objects.filter(id=2).first()

        if not familia1 or not familia2:
            self.stdout.write(self.style.ERROR(
                "Famílias não encontradas. Corre primeiro: python manage.py sample_users"
            ))
            return

        self._criar_itens(familia1, DISPENSA_FAMILIA1, produtos)
        self._criar_itens(familia2, DISPENSA_FAMILIA2, produtos)

        # Receitas de exemplo
        RECEITAS_EXEMPLO = [
            {
                "nome": "Paloco do ISCTE",
                "tempo_preparacao": 35,
                "ingredientes_usados": ["400g de bacalhau desfiado", "2 dentes de alho", "1 cebola", "azeite q.b.", "salsa picada", "batata cozida"],
                "passos": ["Cozer o bacalhau e desfiar.", "Refogar a cebola e o alho no azeite.", "Juntar o bacalhau e envolver bem.", "Servir com batata cozida e salsa por cima."],
            },
            {
                "nome": "Exemplo estático",
                "tempo_preparacao": 20,
                "ingredientes_usados": ["massa", "tomate", "queijo ralado", "oregãos"],
                "passos": ["Cozer a massa em água com sal.", "Aquecer o molho de tomate numa frigideira.", "Misturar a massa com o molho.", "Polvilhar com queijo ralado e oregãos."],
            },
            {
                "nome": "Bife à molho do chefe do ISCTE",
                "tempo_preparacao": 25,
                "ingredientes_usados": ["2 bifes de vaca", "1 colher de manteiga", "2 dentes de alho", "mostarda", "natas", "sal e pimenta"],
                "passos": ["Temperar os bifes com sal, pimenta e alho.", "Grelhar os bifes numa frigideira com manteiga.", "Na mesma frigideira, juntar as natas e a mostarda.", "Deixar apurar o molho e servir por cima dos bifes."],
            },
        ]

        for familia in [familia1, familia2]:
            for dados in RECEITAS_EXEMPLO:
                if not ReceitaSugerida.objects.filter(nome=dados["nome"], familia=familia).exists():
                    ReceitaSugerida.objects.create(familia=familia, **dados)
                    self.stdout.write(f"  Receita criada: {dados['nome']} — {familia.nome}")
                else:
                    self.stdout.write(f"  Ignorada (já existe): {dados['nome']} — {familia.nome}")

        self.stdout.write(self.style.SUCCESS("Dados de exemplo criados com sucesso."))

    def _criar_itens(self, familia, lista, produtos):
        for nome, quantidade, unidade, dias, congelado in lista:
            produto = produtos.get(nome)
            if not produto:
                continue

            if ItemDispensa.objects.filter(familia=familia, produto=produto).exists():
                self.stdout.write(f"  Ignorado (já existe): {nome} — {familia.nome}")
                continue

            data_validade = None
            if not congelado and dias is not None:
                data_validade = hoje + timedelta(days=dias)

            ItemDispensa.objects.create(
                familia=familia,
                produto=produto,
                quantidade=quantidade,
                unidade=unidade,
                data_validade=data_validade,
                congelado=congelado,
            )
            self.stdout.write(f"  Item adicionado: {nome} — {familia.nome}")
