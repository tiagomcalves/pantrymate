import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import {getCurrentSession, SessionContext} from "../features/SessionManager.jsx";
import axios from "axios";


const ListaCompras = () => {
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const { currentUser, pedidos, setPedidos, criarPedido } = getCurrentSession();
    const role = currentUser?.role;

    useEffect(() => {
        axios.get(`/shopping/api/lista/`)
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

    const visiveis = itens.slice(0, 4);
    const pendentes = itens.length;

    if (role === "junior") {
        const ultimoPedido = pedidos[0] ?? null;
        return (
            <div style={{
                marginBottom: "16px",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "14px",
                boxShadow: "0 2px 16px rgba(0, 0, 0, 0.10)",
                padding: "16px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h5 style={{ margin: 0, fontWeight: "650", color: "#1a1a2e" }}>Os Meus Pedidos</h5>
                    {pedidos.length > 0 && (
                        <Badge color="warning" pill>{pedidos.length} pedido{pedidos.length !== 1 ? "s" : ""}</Badge>
                    )}
                </div>

                {pedidos.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#888", padding: "12px 0" }}>
                        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
                        <p style={{ margin: 0 }}>Ainda não fizeste nenhum pedido.</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "4px" }}>
                        {ultimoPedido.itens.slice(0, 4).map((item, i) => (
                            <div key={i} style={{
                                padding: "8px 12px", borderRadius: "10px",
                                background: "#f9f9f9", border: "1px solid #e0e0e0", fontSize: "14px"
                            }}>
                                {item.nome}
                            </div>
                        ))}
                        {ultimoPedido.itens.length > 4 && (
                            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#888", textAlign: "right" }}>
                                +{ultimoPedido.itens.length - 4} mais
                            </p>
                        )}
                    </div>
                )}

                <Button
                    size="sm"
                    style={{
                        marginTop: "12px", width: "100%",
                        background: "#45A293", border: "none", color: "#fff",
                        fontWeight: "600", borderRadius: "8px"
                    }}
                    onClick={() => navigate("/pedidos")}
                >
                    {pedidos.length === 0 ? "Fazer Pedido" : "Ver Pedidos"}
                </Button>
            </div>
        );
    }

    return (
        <div style={{
            marginBottom: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "14px",
            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.10)",
            padding: "16px"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h5 style={{ margin: 0, fontWeight: "650", color: "#1a1a2e" }}>Lista de Compras</h5>
                <Badge color="warning" pill>{pendentes} por comprar</Badge>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 12px", marginBottom: "4px" }}>
                <span style={{ width: "18px" }} />
                <span style={{ flex: 1, fontSize: "11px", color: "#555", fontWeight: "600", textTransform: "uppercase" }}>Produto</span>
                <span style={{ fontSize: "11px", color: "#555", fontWeight: "600", minWidth: "32px", textAlign: "right", textTransform: "uppercase" }}>QTD</span>
                <span style={{ fontSize: "11px", color: "#555", fontWeight: "600", minWidth: "28px", textTransform: "uppercase" }}>UF</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {visiveis.map(item => (
                    <div
                        key={item.id}
                        onClick={() => toggleComprado(item.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: item.comprado ? "#f0f0f0" : "#fff",
                            border: "1px solid #e0e0e0",
                            cursor: "pointer",
                            textDecoration: item.comprado ? "line-through" : "none",
                            color: item.comprado ? "#aaa" : "#1a1a2e"
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={!!item.comprado}
                            onChange={() => toggleComprado(item.id)}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <span style={{ flex: 1 }}>{item.nome}</span>
                        <span style={{ fontSize: "12px", color: "#555", minWidth: "32px", textAlign: "right" }}>{item.quantidade}</span>
                        <span style={{ fontSize: "12px", color: "#777", minWidth: "28px" }}>{item.unidade}</span>
                    </div>
                ))}
            </div>

            {itens.length === 0 && (
                <p style={{ textAlign: "center", color: "#555", marginTop: "12px", fontSize: "14px" }}>
                    Lista vazia.
                </p>
            )}

            <Button
                size="sm"
                style={{
                    marginTop: "12px",
                    width: "100%",
                    background: "#45A293",
                    border: "none",
                    color: "#fff",
                    fontWeight: "600",
                    borderRadius: "8px"
                }}
                onClick={() => navigate("/compras")}
            >
                Ver Lista Completa
            </Button>
        </div>
    );
};

export default ListaCompras;
