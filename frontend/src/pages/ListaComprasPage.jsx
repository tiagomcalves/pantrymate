import { useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { useUser } from "../context/UserContext";
import comprasData from "../data/compras.json";

const CATEGORIAS = ["Laticínios", "Padaria", "Frutas e Legumes", "Carnes", "Bebidas", "Outros"];

const ListaComprasPage = () => {
    const [itens, setItens] = useState(comprasData);
    const [novoNome, setNovoNome] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("Outros");
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const { currentUser } = useUser();
    const role = currentUser?.role;

    const toggleComprado = (id) => {
        setItens(prev =>
            prev.map(item => item.id === id ? { ...item, comprado: !item.comprado } : item)
        );
    };

    const removerItem = (id) => {
        setItens(prev => prev.filter(item => item.id !== id));
    };

    const adicionarItem = () => {
        const nome = novoNome.trim();
        if (!nome) return;
        setItens(prev => [
            ...prev,
            { id: Date.now(), nome, icone: "🛒", comprado: false, categoria: novaCategoria }
        ]);
        setNovoNome("");
    };

    const enviarPedido = () => {
        const nome = novoNome.trim();
        if (!nome) return;
        setPedidoEnviado(true);
        setNovoNome("");
        setTimeout(() => setPedidoEnviado(false), 3000);
    };

    const itensPorCategoria = CATEGORIAS.reduce((acc, cat) => {
        const grupo = itens.filter(i => i.categoria === cat);
        if (grupo.length > 0) acc[cat] = grupo;
        return acc;
    }, {});

    const pendentes = itens.filter(i => !i.comprado).length;

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
                        placeholder="O que precisas? ex: Sumo de laranja..."
                        value={novoNome}
                        onChange={e => setNovoNome(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && enviarPedido()}
                    />
                    <Input
                        type="select"
                        value={novaCategoria}
                        onChange={e => setNovaCategoria(e.target.value)}
                        style={{ maxWidth: "140px" }}
                    >
                        {CATEGORIAS.map(cat => <option key={cat}>{cat}</option>)}
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

            {/* Adicionar item — Membro e Admin */}
            <div style={{ marginBottom: "20px" }}>
                <InputGroup>
                    <Input
                        placeholder="Nome do produto..."
                        value={novoNome}
                        onChange={e => setNovoNome(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && adicionarItem()}
                    />
                    <Input
                        type="select"
                        value={novaCategoria}
                        onChange={e => setNovaCategoria(e.target.value)}
                        style={{ maxWidth: "140px" }}
                    >
                        {CATEGORIAS.map(cat => <option key={cat}>{cat}</option>)}
                    </Input>
                    <Button color="success" onClick={adicionarItem}>
                        <i className="bi bi-plus-lg" />
                    </Button>
                </InputGroup>
            </div>

            {/* Itens agrupados por categoria */}
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
                                    checked={item.comprado}
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
                                {/* Só o Admin pode remover */}
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
