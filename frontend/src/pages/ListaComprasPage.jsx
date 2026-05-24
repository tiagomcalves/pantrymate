import { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { getCurrentSession } from "../features/SessionManager.jsx";
import axios from "axios";

const FAMILIA_ID = 1; // TODO: derivar do utilizador autenticado

const UNIDADES_LABELS = { un: "UN", cx: "CX", kg: "kg", g: "g", L: "L", mL: "mL" };

const ListaComprasPage = () => {
    const [itens, setItens] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [novoNome, setNovoNome] = useState("");
    const [novaQtd, setNovaQtd] = useState(1);
    const [novaUf, setNovaUf] = useState("un");
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const { currentUser } = getCurrentSession();
    const role = currentUser?.role;

    useEffect(() => {
        axios.get('/products/api/products/')
            .then(res => {
                setProdutos(res.data);
                if (res.data.length > 0) {
                    const primeiraCategoria = res.data[0].categoria_nome || "";
                    setNovaCategoria(primeiraCategoria);
                }
            })
            .catch(err => console.error('Erro ao carregar produtos:', err));
    }, []);

    useEffect(() => {
        axios.get(`/shopping/api/lista/`, { withCredentials: true})
            .then(res => setItens(res.data))
            .catch(err => console.error('Erro ao carregar lista de compras:', err));
    }, []);

    useEffect(() => {
        axios.get(`/shopping/api/pedidos/`, { withCredentials: true})
            .then(res => setPedidos(res.data.filter(p => p.estado === 'pendente')))
            .catch(err => console.error('Erro ao carregar pedidos:', err));
    }, []);

    // Dados derivados dos produtos carregados da API
    const categorias = [...new Set(produtos.map(p => p.categoria_nome).filter(Boolean))];
    const produtosDaCategoria = produtos.filter(p => p.categoria_nome === novaCategoria);

    const handleCategoriaChange = (e) => {
        setNovaCategoria(e.target.value);
        setNovoNome("");
        setNovaUf("un");
    };

    const handleProdutoChange = (e) => {
        const nome = e.target.value;
        setNovoNome(nome);
        const produto = produtosDaCategoria.find(p => p.nome === nome);
        if (produto) setNovaUf(produto.unidade_padrao);
    };

    const adicionarItem = () => {
        if (!novoNome) return;
        const payload = {
            nome: novoNome,
            icone: "",
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

    const aceitarPedido = (id) => {
        axios.patch(`/shopping/api/pedidos/${id}/`, { estado: "aprovado" })
            .then(() => {
                setPedidos(prev => prev.filter(p => p.id !== id));
                axios.get(`/shopping/api/lista/?familia_id=${FAMILIA_ID}`)
                    .then(res => setItens(res.data));
            })
            .catch(err => console.error('Erro ao aceitar pedido:', err));
    };

    const recusarPedido = (id) => {
        axios.patch(`/shopping/api/pedidos/${id}/`, { estado: "recusado" })
            .then(() => setPedidos(prev => prev.filter(p => p.id !== id)))
            .catch(err => console.error('Erro ao recusar pedido:', err));
    };

    const enviarPedido = () => {
        if (!novoNome) return;
        setPedidoEnviado(true);
        setNovoNome("");
        setTimeout(() => setPedidoEnviado(false), 3000);
    };

    // Agrupar itens da lista por categoria para exibição
    const itensPorCategoria = itens.reduce((acc, item) => {
        const cat = item.categoria || "Outros";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    const pendentes = itens.length;

    const seletoresCategoriaProduto = (onProdutoChange) => (
        <div style={{ display: "flex", gap: "8px" }}>
            <Input type="select" value={novaCategoria} onChange={handleCategoriaChange}>
                <option value="">Categoria</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Input>
            <Input type="select" value={novoNome} onChange={onProdutoChange}>
                <option value="">Selecionar Produto</option>
                {produtosDaCategoria.map(p => (
                    <option key={p.id} value={p.nome}>{p.nome}</option>
                ))}
            </Input>
        </div>
    );

    // Vista do Júnior — só pode fazer pedidos
    if (role === "junior") {
        return (
            <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
                <div style={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "14px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                    padding: "20px"
                }}>
                    <h4 style={{ marginBottom: "4px", color: "#1a1a2e", fontWeight: "650" }}>🙋 Fazer um Pedido</h4>
                    <p style={{ color: "#555", marginBottom: "20px" }}>
                        Pede um produto ao teu responsável. Ele irá aprovar o pedido.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                        {seletoresCategoriaProduto(handleProdutoChange)}
                        <Button
                            style={{ background: "#45A293", border: "none", borderRadius: "6px" }}
                            onClick={enviarPedido}
                        >
                            Pedir
                        </Button>
                    </div>
                    {pedidoEnviado && (
                        <div style={{
                            padding: "14px", borderRadius: "12px",
                            background: "#e8f5e9", color: "#2e7d32",
                            border: "1px solid #a5d6a7", textAlign: "center"
                        }}>
                            Pedido enviado! O teu responsável irá ver em breve.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Vista do Membro e Admin
    return (
        <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "14px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                padding: "20px"
            }}>
                <h4 style={{ marginBottom: "4px", color: "#1a1a2e", fontWeight: "650" }}>🛒 Lista de Compras</h4>
                <p style={{ color: "#555", marginBottom: "16px" }}>{pendentes} item(s) por comprar</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <Input type="select" value={novaCategoria} onChange={handleCategoriaChange}>
                            <option value="">Categoria</option>
                            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Input>
                        <Input type="select" value={novoNome} onChange={handleProdutoChange}>
                            <option value="">Selecionar Produto</option>
                            {produtosDaCategoria.map(p => (
                                <option key={p.id} value={p.nome}>{p.nome}</option>
                            ))}
                        </Input>
                        <Input
                            type="number"
                            min={1}
                            value={novaQtd}
                            onChange={e => setNovaQtd(Number(e.target.value))}
                            style={{ width: "70px", flexShrink: 0 }}
                        />
                        <Input
                            type="select"
                            value={novaUf}
                            disabled={!!novoNome}
                            onChange={e => setNovaUf(e.target.value)}
                            style={{ width: "110px", flexShrink: 0 }}
                        >
                            {Object.entries(UNIDADES_LABELS).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </Input>
                    </div>
                    <Button color="success" onClick={adicionarItem} style={{ width: "100%" }}>
                        <i className="bi bi-plus-lg" /> Adicionar
                    </Button>
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
                            <span style={{ flex: 1, fontSize: "11px", color: "#555", fontWeight: "600", textTransform: "uppercase" }}>Produto</span>
                            <span style={{ fontSize: "11px", color: "#555", fontWeight: "600", minWidth: "32px", textAlign: "right", textTransform: "uppercase" }}>QTD</span>
                            <span style={{ fontSize: "11px", color: "#555", fontWeight: "600", minWidth: "36px", textTransform: "uppercase" }}>UF</span>
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
                                    <span style={{
                                        flex: 1,
                                        textDecoration: item.comprado ? "line-through" : "none",
                                        color: item.comprado ? "#aaa" : "#1a1a2e"
                                    }}>
                                        {item.nome}
                                    </span>
                                    <span style={{ fontSize: "12px", color: "#555", minWidth: "32px", textAlign: "right" }}>{item.quantidade}</span>
                                    <span style={{ fontSize: "12px", color: "#777", minWidth: "36px" }}>{item.unidade}</span>
                                    {role === "admin" && (
                                        <Button
                                            close
                                            size="sm"
                                            onClick={() => removerItem(item.id)}
                                            style={{ color: "#999" }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {itens.length === 0 && (
                    <p style={{ textAlign: "center", color: "#555", marginTop: "40px" }}>
                        Lista vazia. Adiciona produtos acima!
                    </p>
                )}
            </div>

            {/* Pedidos Pendentes — só admin */}
            {role === "admin" && (
                <div style={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "14px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                    padding: "20px",
                    marginTop: "16px",
                }}>
                    <h5 style={{ marginBottom: "4px", color: "#1a1a2e", fontWeight: "650" }}>Pedidos Pendentes</h5>
                    <p style={{ color: "#555", marginBottom: "16px", fontSize: "14px" }}>
                        {pedidos.length === 0 ? "Sem pedidos pendentes." : `${pedidos.length} pedido(s) a aguardar aprovação.`}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {pedidos.map(pedido => (
                            <div key={pedido.id} style={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                                <div style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "10px 14px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0",
                                }}>
                                    <span style={{ fontWeight: "700", fontSize: "14px", color: "#333" }}>{pedido.numero}</span>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <Button
                                            size="sm"
                                            style={{ background: "#45A293", border: "none", borderRadius: "8px", padding: "4px 12px", fontSize: "13px" }}
                                            onClick={() => aceitarPedido(pedido.id)}
                                        >
                                            ✓ Aceitar
                                        </Button>
                                        <Button
                                            size="sm"
                                            style={{ background: "#fff", border: "1px solid #e57373", color: "#e57373", borderRadius: "8px", padding: "4px 12px", fontSize: "13px" }}
                                            onClick={() => recusarPedido(pedido.id)}
                                        >
                                            ✕ Recusar
                                        </Button>
                                    </div>
                                </div>
                                <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                    {pedido.itens.map((item, i) => (
                                        <div key={i} style={{ fontSize: "14px" }}>
                                            {item.nome}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaComprasPage;
