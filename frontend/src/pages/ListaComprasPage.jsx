import { useState, useEffect } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { useUser } from "../context/UserContext";
import axios from "axios";

const FAMILIA_ID = 1; // TODO: derivar do utilizador autenticado

const CATEGORIAS = ["Laticínios", "Padaria", "Frutas e Legumes", "Carnes", "Bebidas", "Outros"];

const CATALOGO = {
    "Laticínios": [
        { nome: "Leite", icone: "🥛", uf: "L" },
        { nome: "Queijo", icone: "🧀", uf: "KG" },
        { nome: "Ovos", icone: "🥚", uf: "EA" },
        { nome: "Manteiga", icone: "🧈", uf: "EA" },
        { nome: "Iogurte", icone: "🥛", uf: "EA" },
        { nome: "Natas", icone: "🥛", uf: "EA" },
    ],
    "Padaria": [
        { nome: "Pão", icone: "🍞", uf: "EA" },
        { nome: "Croissant", icone: "🥐", uf: "EA" },
        { nome: "Tostas", icone: "🍞", uf: "PCT" },
        { nome: "Bolo", icone: "🎂", uf: "EA" },
    ],
    "Frutas e Legumes": [
        { nome: "Maçã", icone: "🍎", uf: "KG" },
        { nome: "Tomate", icone: "🍅", uf: "KG" },
        { nome: "Banana", icone: "🍌", uf: "KG" },
        { nome: "Laranja", icone: "🍊", uf: "KG" },
        { nome: "Alface", icone: "🥬", uf: "EA" },
        { nome: "Cenoura", icone: "🥕", uf: "KG" },
        { nome: "Batata", icone: "🥔", uf: "KG" },
        { nome: "Cebola", icone: "🧅", uf: "KG" },
        { nome: "Alho", icone: "🧄", uf: "EA" },
    ],
    "Carnes": [
        { nome: "Frango", icone: "🍗", uf: "KG" },
        { nome: "Carne Picada", icone: "🥩", uf: "KG" },
        { nome: "Salsichas", icone: "🌭", uf: "PCT" },
        { nome: "Bacon", icone: "🥓", uf: "PCT" },
        { nome: "Porco", icone: "🥩", uf: "KG" },
        { nome: "Atum", icone: "🐟", uf: "EA" },
        { nome: "Salmão", icone: "🐟", uf: "KG" },
    ],
    "Bebidas": [
        { nome: "Água (6x1.5L)", icone: "💧", uf: "CX" },
        { nome: "Sumo de Laranja", icone: "🍊", uf: "L" },
        { nome: "Refrigerante", icone: "🥤", uf: "L" },
        { nome: "Cerveja", icone: "🍺", uf: "CX" },
        { nome: "Vinho", icone: "🍷", uf: "EA" },
        { nome: "Café", icone: "☕", uf: "PCT" },
    ],
    "Outros": [
        { nome: "Açúcar", icone: "🍬", uf: "KG" },
        { nome: "Sal", icone: "🧂", uf: "KG" },
        { nome: "Azeite", icone: "🫙", uf: "L" },
        { nome: "Massa", icone: "🍝", uf: "PCT" },
        { nome: "Arroz", icone: "🍚", uf: "KG" },
        { nome: "Detergente", icone: "🧴", uf: "EA" },
    ],
};

const ListaComprasPage = () => {
    const [itens, setItens] = useState([]);
    const [novoNome, setNovoNome] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("Outros");
    const [novaQtd, setNovaQtd] = useState(1);
    const [novaUf, setNovaUf] = useState("EA");
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const { currentUser } = useUser();
    const role = currentUser?.role;

    useEffect(() => {
        axios.get(`/shopping/api/lista/?familia_id=${FAMILIA_ID}`)
            .then(res => setItens(res.data))
            .catch(err => console.error('Erro ao carregar lista de compras:', err));
    }, []);

    const toggleComprado = (id) => {
        setItens(prev => prev.map(item => item.id === id ? { ...item, comprado: true } : item));
        setTimeout(() => {
            axios.delete(`/shopping/api/lista/${id}/`)
                .then(() => setItens(prev => prev.filter(item => item.id !== id)))
                .catch(err => console.error('Erro ao remover item:', err));
        }, 600);
    };

    const removerItem = (id) => {
        axios.delete(`/shopping/api/lista/${id}/`)
            .then(() => setItens(prev => prev.filter(item => item.id !== id)))
            .catch(err => console.error('Erro ao remover item:', err));
    };

    const handleCategoriaChange = (e) => {
        setNovaCategoria(e.target.value);
        setNovoNome("");
    };

    const handleProdutoChange = (e) => {
        const nome = e.target.value;
        setNovoNome(nome);
        const produto = (CATALOGO[novaCategoria] || []).find(p => p.nome === nome);
        if (produto) setNovaUf(produto.uf);
    };

    const adicionarItem = () => {
        if (!novoNome) return;
        const produto = (CATALOGO[novaCategoria] || []).find(p => p.nome === novoNome);
        const payload = {
            nome: novoNome,
            icone: produto?.icone || "🛒",
            categoria: novaCategoria,
            quantidade: novaQtd,
            unidade: novaUf,
            familia_id: FAMILIA_ID,
        };
        axios.post('/shopping/api/lista/', payload)
            .then(res => {
                setItens(prev => [...prev, res.data]);
                setNovoNome("");
                setNovaQtd(1);
            })
            .catch(err => console.error('Erro ao adicionar item:', err));
    };

    const enviarPedido = () => {
        if (!novoNome) return;
        // TODO: integrar com endpoint de PedidoCompra quando disponível
        setPedidoEnviado(true);
        setNovoNome("");
        setTimeout(() => setPedidoEnviado(false), 3000);
    };

    const itensPorCategoria = CATEGORIAS.reduce((acc, cat) => {
        const grupo = itens.filter(i => i.categoria === cat);
        if (grupo.length > 0) acc[cat] = grupo;
        return acc;
    }, {});

    const pendentes = itens.length;

    // Vista do Júnior — só pode fazer pedidos
    if (role === "junior") {
        return (
            <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
                <h4 style={{ marginBottom: "4px" }}>🙋 Fazer um Pedido</h4>
                <p style={{ color: "#888", marginBottom: "20px" }}>
                    Pede um produto ao teu responsável. Ele irá aprovar o pedido.
                </p>
                <InputGroup style={{ marginBottom: "12px" }}>
                    <Input
                        type="select"
                        value={novaCategoria}
                        onChange={handleCategoriaChange}
                        style={{ maxWidth: "150px" }}
                    >
                        {CATEGORIAS.map(cat => <option key={cat}>{cat}</option>)}
                    </Input>
                    <Input
                        type="select"
                        value={novoNome}
                        onChange={handleProdutoChange}
                    >
                        <option value="">Selecionar Produto</option>
                        {(CATALOGO[novaCategoria] || []).map(p => (
                            <option key={p.nome} value={p.nome}>{p.icone} {p.nome}</option>
                        ))}
                    </Input>
                    <Button
                        style={{ background: "#45A293", border: "none" }}
                        onClick={enviarPedido}
                    >
                        Pedir
                    </Button>
                </InputGroup>
                {pedidoEnviado && (
                    <div style={{
                        padding: "14px", borderRadius: "12px",
                        background: "#e8f5e9", color: "#2e7d32",
                        border: "1px solid #a5d6a7", textAlign: "center"
                    }}>
                        Pedido enviado! O teu responsável irá ver em breve. 🎉
                    </div>
                )}
            </div>
        );
    }

    // Vista do Membro e Admin
    return (
        <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
            <h4 style={{ marginBottom: "4px" }}>🛒 Lista de Compras</h4>
            <p style={{ color: "#888", marginBottom: "16px" }}>{pendentes} item(s) por comprar</p>

            <div style={{ marginBottom: "20px" }}>
                <InputGroup>
                    <Input
                        type="select"
                        value={novaCategoria}
                        onChange={handleCategoriaChange}
                        style={{ maxWidth: "150px" }}
                    >
                        {CATEGORIAS.map(cat => <option key={cat}>{cat}</option>)}
                    </Input>
                    <Input
                        type="select"
                        value={novoNome}
                        onChange={handleProdutoChange}
                    >
                        <option value="">Selecionar Produto</option>
                        {(CATALOGO[novaCategoria] || []).map(p => (
                            <option key={p.nome} value={p.nome}>{p.icone} {p.nome}</option>
                        ))}
                    </Input>
                    <Input
                        type="number"
                        min={1}
                        value={novaQtd}
                        onChange={e => setNovaQtd(Number(e.target.value))}
                        style={{ maxWidth: "64px" }}
                    />
                    <Input
                        type="select"
                        value={novaUf}
                        onChange={e => setNovaUf(e.target.value)}
                        disabled={!!novoNome}
                        style={{ maxWidth: "80px" }}
                    >
                        {["EA", "KG", "G", "L", "CX", "PCT"].map(u => <option key={u}>{u}</option>)}
                    </Input>
                    <Button color="success" onClick={adicionarItem}>
                        <i className="bi bi-plus-lg" />
                    </Button>
                </InputGroup>
            </div>

            {Object.entries(itensPorCategoria).map(([categoria, grupo]) => (
                <div key={categoria} style={{ marginBottom: "20px" }}>
                    <h6 style={{
                        color: "#45A293",
                        borderBottom: "1px solid #e0e0e0",
                        paddingBottom: "4px",
                        marginBottom: "10px"
                    }}>
                        {categoria}
                    </h6>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 12px", marginBottom: "4px" }}>
                        <span style={{ width: "18px" }} />
                        <span style={{ width: "20px" }} />
                        <span style={{ flex: 1, fontSize: "11px", color: "#aaa", textTransform: "uppercase" }}>Produto</span>
                        <span style={{ fontSize: "11px", color: "#aaa", minWidth: "32px", textAlign: "right", textTransform: "uppercase" }}>QTD</span>
                        <span style={{ fontSize: "11px", color: "#aaa", minWidth: "36px", textTransform: "uppercase" }}>UF</span>
                        {role === "admin" && <span style={{ width: "24px" }} />}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {grupo.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "10px 12px",
                                    borderRadius: "10px",
                                    background: item.comprado ? "#f5f5f5" : "#fff",
                                    border: "1px solid #e0e0e0",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!item.comprado}
                                    onChange={() => toggleComprado(item.id)}
                                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                />
                                <span style={{ fontSize: "20px" }}>{item.icone}</span>
                                <span style={{
                                    flex: 1,
                                    textDecoration: item.comprado ? "line-through" : "none",
                                    color: item.comprado ? "#aaa" : "inherit"
                                }}>
                                    {item.nome}
                                </span>
                                <span style={{ fontSize: "12px", color: "#888", minWidth: "32px", textAlign: "right" }}>{item.quantidade}</span>
                                <span style={{ fontSize: "12px", color: "#aaa", minWidth: "36px" }}>{item.unidade}</span>
                                {role === "admin" && (
                                    <Button
                                        close
                                        size="sm"
                                        onClick={() => removerItem(item.id)}
                                        style={{ color: "#ccc" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {itens.length === 0 && (
                <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
                    Lista vazia. Adiciona produtos acima!
                </p>
            )}
        </div>
    );
};

export default ListaComprasPage;
