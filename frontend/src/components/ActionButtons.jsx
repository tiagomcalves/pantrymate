import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useUser } from "../context/UserContext";

const ActionButtons = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const role = currentUser?.role;

    if (role === "junior") {
        return (
            <div style={{ marginBottom: "16px" }}>
                <Button
                    style={{ width: "100%", background: "#45A293", border: "none", borderRadius: "12px", padding: "14px", fontSize: "15px" }}
                    onClick={() => navigate("/compras")}
                >
                    <i className="bi bi-hand-index" style={{ marginRight: "8px" }} />
                    Fazer um Pedido
                </Button>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            {role === "admin" && (
                <Button
                    color="success"
                    style={{ flex: 1, borderRadius: "12px", padding: "12px" }}
                    onClick={() => navigate("/scanner")}
                >
                    <i className="bi bi-receipt" style={{ marginRight: "6px" }} />
                    Ler Fatura
                </Button>
            )}
            <Button
                color="primary"
                style={{ flex: 1, borderRadius: "12px", padding: "12px" }}
                onClick={() => navigate("/adicionar-produto")}
            >
                <i className="bi bi-plus-circle" style={{ marginRight: "6px" }} />
                Adicionar Manual
            </Button>
        </div>
    );
};

export default ActionButtons;
