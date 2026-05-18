import { useState } from "react";
import { Button } from "reactstrap";
import { useUser } from "../context/UserContext";

const ScannerPage = () => {
    const [mensagem, setMensagem] = useState(null);
    const { currentUser } = useUser();
    const role = currentUser?.role;

    const mostrarMensagem = (texto) => {
        setMensagem(texto);
        setTimeout(() => setMensagem(null), 3000);
    };

    if (role === "junior") {
        return (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#888" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
                <h5>Acesso Restrito</h5>
                <p>Não tens permissão para usar o scanner.<br />Pede ao teu responsável.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h4 style={{ marginBottom: "4px" }}>📷 Scanner</h4>
            <p style={{ color: "#888", marginBottom: "24px" }}>
                {role === "admin"
                    ? "Digitaliza faturas ou códigos de barras para adicionar produtos automaticamente."
                    : "Faz scan de um código de barras para adicionar um produto à despensa."}
            </p>

            {/* Viewfinder visual */}
            <div style={{
                width: "100%",
                height: "220px",
                border: "3px dashed #45A293",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#f9f9f9",
                marginBottom: "28px",
                gap: "10px"
            }}>
                <i className="bi bi-camera" style={{ fontSize: "48px", color: "#45A293" }} />
                <span style={{ color: "#aaa", fontSize: "13px" }}>Câmara não disponível nesta versão</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Ler Fatura — só Admin */}
                {role === "admin" && (
                    <Button
                        style={{ background: "#45A293", border: "none", borderRadius: "12px", padding: "14px", fontSize: "16px" }}
                        onClick={() => mostrarMensagem("Funcionalidade de leitura de faturas disponível em breve! 🚀")}
                    >
                        <i className="bi bi-receipt" style={{ marginRight: "8px" }} />
                        Ler Fatura
                    </Button>
                )}

                {/* Scan Código — Admin e Membro */}
                <Button
                    outline
                    style={{ borderColor: "#45A293", color: "#45A293", borderRadius: "12px", padding: "14px", fontSize: "16px" }}
                    onClick={() => mostrarMensagem("Funcionalidade de scan de código de barras disponível em breve! 🚀")}
                >
                    <i className="bi bi-upc-scan" style={{ marginRight: "8px" }} />
                    Scan Código de Barras
                </Button>
            </div>

            {mensagem && (
                <div style={{
                    marginTop: "24px",
                    padding: "14px",
                    borderRadius: "12px",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    border: "1px solid #a5d6a7",
                    fontSize: "14px"
                }}>
                    {mensagem}
                </div>
            )}
        </div>
    );
};

export default ScannerPage;
