import { useState } from "react";
import { Button, Badge } from "reactstrap";
import { usePedidos } from "../context/PedidosContext";

const CATEGORIAS = [
    { nome: "Laticínios",       icone: "🥛", cor: "#e3f2fd", corTexto: "#1565c0" },
    { nome: "Padaria",          icone: "🍞", cor: "#fff8e1", corTexto: "#f57f17" },
    { nome: "Frutas e Legumes", icone: "🥦", cor: "#e8f5e9", corTexto: "#2e7d32" },
    { nome: "Carnes",           icone: "🥩", cor: "#fce4ec", corTexto: "#c62828" },
    { nome: "Bebidas",          icone: "🥤", cor: "#f3e5f5", corTexto: "#6a1b9a" },
    { nome: "Outros",           icone: "🛒", cor: "#f5f5f5", corTexto: "#424242" },
];

const CATALOGO = {
    "Laticínios":       [
        { nome: "Leite",    icone: "🥛" },
        { nome: "Queijo",   icone: "🧀" },
        { nome: "Ovos",     icone: "🥚" },
        { nome: "Manteiga", icone: "🧈" },
        { nome: "Iogurte",  icone: "🥛" },
        { nome: "Natas",    icone: "🥛" },
    ],
    "Padaria":          [
        { nome: "Pão",      icone: "🍞" },
        { nome: "Croissant",icone: "🥐" },
        { nome: "Tostas",   icone: "🍞" },
        { nome: "Bolo",     icone: "🎂" },
    ],
    "Frutas e Legumes": [
        { nome: "Maçã",     icone: "🍎" },
        { nome: "Tomate",   icone: "🍅" },
        { nome: "Banana",   icone: "🍌" },
        { nome: "Laranja",  icone: "🍊" },
        { nome: "Alface",   icone: "🥬" },
        { nome: "Cenoura",  icone: "🥕" },
        { nome: "Batata",   icone: "🥔" },
        { nome: "Cebola",   icone: "🧅" },
        { nome: "Alho",     icone: "🧄" },
    ],
    "Carnes":           [
        { nome: "Frango",       icone: "🍗" },
        { nome: "Carne Picada", icone: "🥩" },
        { nome: "Salsichas",    icone: "🌭" },
        { nome: "Bacon",        icone: "🥓" },
        { nome: "Porco",        icone: "🥩" },
        { nome: "Atum",         icone: "🐟" },
        { nome: "Salmão",       icone: "🐟" },
    ],
    "Bebidas":          [
        { nome: "Água (6x1.5L)",    icone: "💧" },
        { nome: "Sumo de Laranja",  icone: "🍊" },
        { nome: "Refrigerante",     icone: "🥤" },
        { nome: "Cerveja",          icone: "🍺" },
        { nome: "Vinho",            icone: "🍷" },
        { nome: "Café",             icone: "☕" },
    ],
    "Outros":           [
        { nome: "Açúcar",     icone: "🍬" },
        { nome: "Sal",        icone: "🧂" },
        { nome: "Azeite",     icone: "🫙" },
        { nome: "Massa",      icone: "🍝" },
        { nome: "Arroz",      icone: "🍚" },
        { nome: "Detergente", icone: "🧴" },
    ],
};

const estadoBadge = {
    pendente:  { color: "warning", label: "Pendente"  },
    aprovado:  { color: "success", label: "Aprovado"  },
    recusado:  { color: "danger",  label: "Recusado"  },
};

const PedidosPage = () => {
    const { pedidos, criarPedido } = usePedidos();

    const [vista, setVista] = useState("categorias");
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);
    const [selecionados, setSelecionados] = useState(new Set());
    const [carrinho, setCarrinho] = useState([]);
    const [aSubmeter, setASubmeter] = useState(false);

    const abrirCategoria = (cat) => {
        // pré-selecionar o que já está no carrinho para esta categoria
        const jaNoCarrinho = new Set(
            carrinho.filter(i => i.categoria === cat.nome).map(i => i.nome)
        );
        setSelecionados(jaNoCarrinho);
        setCategoriaAtiva(cat);
        setVista("produtos");
    };

    const toggleProduto = (nome) => {
        setSelecionados(prev => {
            const next = new Set(prev);
            next.has(nome) ? next.delete(nome) : next.add(nome);
            return next;
        });
    };

    const adicionarAoCarrinho = () => {
        // remove itens desta categoria que foram desmarcados
        const semCategoria = carrinho.filter(i => i.categoria !== categoriaAtiva.nome);
        // adiciona os selecionados
        const novos = [...selecionados].map(nome => {
            const prod = (CATALOGO[categoriaAtiva.nome] || []).find(p => p.nome === nome);
            return { nome, icone: prod?.icone || "🛒", categoria: categoriaAtiva.nome };
        });
        setCarrinho([...semCategoria, ...novos]);
        setVista("categorias");
        setCategoriaAtiva(null);
    };

    const submeterPedido = () => {
        if (carrinho.length === 0 || aSubmeter) return;
        setASubmeter(true);
        criarPedido(carrinho)
            .then(() => setCarrinho([]))
            .catch(err => console.error('Erro ao criar pedido:', err))
            .finally(() => setASubmeter(false));
    };

    const itensNaCategoria = (nomeCategoria) =>
        carrinho.filter(i => i.categoria === nomeCategoria).length;

    // ── Vista: lista de produtos da categoria ──────────────────────────────────
    if (vista === "produtos" && categoriaAtiva) {
        const produtos = CATALOGO[categoriaAtiva.nome] || [];
        return (
            <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
                <button
                    onClick={() => setVista("categorias")}
                    style={{ background: "none", border: "none", color: "#45A293", fontWeight: "600", padding: 0, marginBottom: "16px", cursor: "pointer", fontSize: "14px" }}
                >
                    ← Voltar
                </button>

                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginBottom: "20px", padding: "12px 16px",
                    borderRadius: "12px", background: categoriaAtiva.cor,
                }}>
                    <span style={{ fontSize: "28px" }}>{categoriaAtiva.icone}</span>
                    <h5 style={{ margin: 0, color: categoriaAtiva.corTexto }}>{categoriaAtiva.nome}</h5>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {produtos.map(prod => {
                        const checked = selecionados.has(prod.nome);
                        return (
                            <div
                                key={prod.nome}
                                onClick={() => toggleProduto(prod.nome)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "14px",
                                    padding: "14px 16px", borderRadius: "12px", cursor: "pointer",
                                    background: checked ? categoriaAtiva.cor : "#fff",
                                    border: checked ? `2px solid ${categoriaAtiva.corTexto}` : "1px solid #e0e0e0",
                                    transition: "all 0.15s",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleProduto(prod.nome)}
                                    onClick={e => e.stopPropagation()}
                                    style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: categoriaAtiva.corTexto }}
                                />
                                <span style={{ fontSize: "22px" }}>{prod.icone}</span>
                                <span style={{ flex: 1, fontWeight: checked ? "600" : "400", color: checked ? categoriaAtiva.corTexto : "inherit" }}>
                                    {prod.nome}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <Button
                    style={{ width: "100%", background: "#45A293", border: "none", borderRadius: "12px", padding: "14px", fontWeight: "600", fontSize: "15px" }}
                    onClick={adicionarAoCarrinho}
                >
                    {selecionados.size > 0
                        ? `Adicionar ${selecionados.size} produto(s) ao pedido`
                        : "Confirmar (sem seleção)"}
                </Button>
            </div>
        );
    }

    // ── Vista: grelha de categorias ────────────────────────────────────────────
    return (
        <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
            <h4 style={{ marginBottom: "4px", color: "#1a1a2e", fontWeight: "700" }}>🙋 Fazer um Pedido</h4>
            <p style={{ color: "#1a1a2e", fontWeight: "600", marginBottom: "20px" }}>
                Escolhe as categorias e seleciona os produtos que precisas.
            </p>

            {/* Grelha de categorias */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                {CATEGORIAS.map(cat => {
                    const count = itensNaCategoria(cat.nome);
                    return (
                        <div
                            key={cat.nome}
                            onClick={() => abrirCategoria(cat)}
                            style={{
                                background: cat.cor,
                                borderRadius: "16px",
                                padding: "20px 16px",
                                cursor: "pointer",
                                border: count > 0 ? `2px solid ${cat.corTexto}` : "2px solid transparent",
                                position: "relative",
                                transition: "transform 0.1s",
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                        >
                            {count > 0 && (
                                <div style={{
                                    position: "absolute", top: "10px", right: "10px",
                                    background: cat.corTexto, color: "#fff",
                                    borderRadius: "50%", width: "22px", height: "22px",
                                    fontSize: "12px", fontWeight: "700",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    {count}
                                </div>
                            )}
                            <div style={{ fontSize: "32px", marginBottom: "8px" }}>{cat.icone}</div>
                            <div style={{ fontWeight: "600", color: cat.corTexto, fontSize: "14px" }}>{cat.nome}</div>
                        </div>
                    );
                })}
            </div>

            {/* Resumo do carrinho */}
            {carrinho.length > 0 && (
                <div style={{
                    background: "#f9f9f9", border: "1px solid #e0e0e0",
                    borderRadius: "12px", padding: "12px 16px", marginBottom: "16px",
                }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "8px" }}>
                        No pedido ({carrinho.length} produto{carrinho.length !== 1 ? "s" : ""})
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {carrinho.map((item, i) => (
                            <span key={i} style={{
                                background: "#fff", border: "1px solid #e0e0e0",
                                borderRadius: "20px", padding: "4px 10px", fontSize: "13px",
                            }}>
                                {item.icone} {item.nome}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <Button
                disabled={carrinho.length === 0 || aSubmeter}
                style={{
                    width: "100%", background: carrinho.length > 0 ? "#45A293" : "#ccc",
                    border: "none", borderRadius: "12px", padding: "14px",
                    fontWeight: "600", fontSize: "15px", cursor: carrinho.length > 0 ? "pointer" : "not-allowed",
                }}
                onClick={submeterPedido}
            >
                {aSubmeter ? "A enviar..." : "Criar Pedido"}
            </Button>

            {/* Histórico */}
            {pedidos.length > 0 && (
                <div style={{ marginTop: "28px" }}>
                    <h6 style={{ color: "#555", marginBottom: "12px" }}>Os meus pedidos</h6>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {pedidos.map(pedido => {
                            const badge = estadoBadge[pedido.estado];
                            return (
                                <div key={pedido.id} style={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden", background: "rgba(255,255,255,0.95)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "10px 14px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0",
                                    }}>
                                        <span style={{ fontWeight: "700", fontSize: "14px", color: "#333" }}>{pedido.numero}</span>
                                        <Badge color={badge.color} pill style={{ fontSize: "12px" }}>{badge.label}</Badge>
                                    </div>
                                    <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                        {pedido.itens.map((item, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
                                                <span>{item.icone}</span>
                                                <span>{item.nome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PedidosPage;
