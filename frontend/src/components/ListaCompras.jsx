import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { useUser } from "../context/UserContext";
import axios from "axios";

const FAMILIA_ID = 1; // TODO: derivar do utilizador autenticado

const ListaCompras = () => {
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
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

    const visiveis = itens.slice(0, 4);
    const pendentes = itens.length;

    if (role === "junior") {
        return (
            <div style={{ marginBottom: "16px" }}>
                <h5>Os Meus Pedidos</h5>
                <div style={{
                    padding: "20px",
                    borderRadius: "12px",
                    background: "#fff8e1",
                    border: "1px solid #ffe082",
                    textAlign: "center",
                    color: "#888"
                }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
                    <p style={{ margin: 0 }}>Ainda não fizeste nenhum pedido.</p>
                    <Button
                        size="sm"
                        style={{ marginTop: "12px", background: "#45A293", border: "none", borderRadius: "8px" }}
                        onClick={() => navigate("/pedidos")}
                    >
                        Fazer Pedido
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h5 style={{ margin: 0 }}>Lista de Compras</h5>
                <Badge color="warning" pill>{pendentes} por comprar</Badge>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 12px", marginBottom: "4px" }}>
                <span style={{ width: "18px" }} />
                <span style={{ width: "20px" }} />
                <span style={{ flex: 1, fontSize: "11px", color: "#aaa", textTransform: "uppercase" }}>Produto</span>
                <span style={{ fontSize: "11px", color: "#aaa", minWidth: "32px", textAlign: "right", textTransform: "uppercase" }}>QTD</span>
                <span style={{ fontSize: "11px", color: "#aaa", minWidth: "28px", textTransform: "uppercase" }}>UF</span>
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
                            color: item.comprado ? "#aaa" : "inherit"
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={!!item.comprado}
                            onChange={() => toggleComprado(item.id)}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "20px" }}>{item.icone}</span>
                        <span style={{ flex: 1 }}>{item.nome}</span>
                        <span style={{ fontSize: "12px", color: "#888", minWidth: "32px", textAlign: "right" }}>{item.quantidade}</span>
                        <span style={{ fontSize: "12px", color: "#aaa", minWidth: "28px" }}>{item.unidade}</span>
                    </div>
                ))}
            </div>

            {itens.length === 0 && (
                <p style={{ textAlign: "center", color: "#aaa", marginTop: "12px", fontSize: "14px" }}>
                    Lista vazia.
                </p>
            )}

            <Button
                color="primary"
                outline
                size="sm"
                style={{ marginTop: "12px", width: "100%" }}
                onClick={() => navigate("/compras")}
            >
                Ver Lista Completa
            </Button>
        </div>
    );
};

export default ListaCompras;
