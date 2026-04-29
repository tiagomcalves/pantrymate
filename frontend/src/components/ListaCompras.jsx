import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { useUser } from "../context/UserContext";
import comprasData from "../data/compras.json";

const ListaCompras = () => {
    const [itens, setItens] = useState(comprasData.slice(0, 4));
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const role = currentUser?.role;

    const toggleComprado = (id) => {
        setItens(prev =>
            prev.map(item => item.id === id ? { ...item, comprado: !item.comprado } : item)
        );
    };

    const pendentes = itens.filter(i => !i.comprado).length;

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
                        onClick={() => navigate("/compras")}
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

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {itens.map(item => (
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
                            checked={item.comprado}
                            onChange={() => toggleComprado(item.id)}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "20px" }}>{item.icone}</span>
                        <span style={{ flex: 1 }}>{item.nome}</span>
                        <span style={{ fontSize: "12px", color: "#888" }}>{item.categoria}</span>
                    </div>
                ))}
            </div>

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
