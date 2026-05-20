import { useState, useRef } from "react";
import { Button } from "reactstrap";
import { getCurrentSession } from "../features/SessionManager.jsx";
import { useProdutos } from "../context/ProdutosContext";
import axios from "axios";

const PRODUTOS_DETETADOS = [
    { nome: "Leite",  quantidade: 6, unidade: "L",  categoria_nome: "Laticínios", dataValidade: "2026-07-20", imagemSrc: "/foods/diet.png" },
    { nome: "Porco",  quantidade: 3, unidade: "kg", categoria_nome: "Carnes",     dataValidade: "2026-05-25", imagemSrc: "/foods/diet.png" },
    { nome: "Arroz",  quantidade: 2, unidade: "kg", categoria_nome: "Outros",     dataValidade: "2027-06-01", imagemSrc: "/foods/diet.png" },
];

const ScannerPage = () => {
    const { currentUser } = getCurrentSession();
    const { adicionarProdutos } = useProdutos();
    const role = currentUser?.role;
    const inputRef = useRef(null);

    const [imagemPreview, setImagemPreview] = useState(null);
    const [estado, setEstado] = useState(null); // null | 'resultado' | 'adicionando' | 'adicionado' | 'erro'

    if (role === "junior") {
        return (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#888" }}>
                <h5>Acesso restrito</h5>
                <p>Não tens permissão para usar o scanner.<br />Pede ao teu responsável.</p>
            </div>
        );
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImagemPreview(URL.createObjectURL(file));
        setEstado("resultado");
    };

    const handleAdicionar = async () => {
        setEstado("adicionando");
        try {
            await Promise.all(
                PRODUTOS_DETETADOS.map(p =>
                    axios.post(
                        "http://localhost:8000/products/api/itens/",
                        { nome: p.nome, quantidade: p.quantidade, unidade: p.unidade, categoria_nome: p.categoria_nome },
                        { withCredentials: true }
                    )
                )
            );
        } catch {
            // backend indisponível — continua com contexto local
        }
        adicionarProdutos(
            PRODUTOS_DETETADOS.map(p => ({
                nome: p.nome,
                categoria: p.categoria_nome,
                dataValidade: p.dataValidade,
                imagemSrc: p.imagemSrc,
                quantidade: p.quantidade,
            }))
        );
        setEstado("adicionado");
    };

    const handleReset = () => {
        setImagemPreview(null);
        setEstado(null);
        inputRef.current.value = "";
    };

    return (
        <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h4 style={{ marginBottom: "4px" }}>Scanner</h4>
            <p style={{ color: "#1a1a2e", fontWeight: "600", marginBottom: "24px" }}>
                Carrega uma foto de uma fatura para adicionar os respetivos produtos à dispensa.
            </p>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            {/* Preview da imagem selecionada */}
            {imagemPreview && (
                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <img
                        src={imagemPreview}
                        alt="preview"
                        style={{
                            width: "100%",
                            maxHeight: "220px",
                            objectFit: "cover",
                            borderRadius: "16px",
                            border: "2px solid #45A293",
                        }}
                    />
                    {estado !== "adicionado" && (
                        <button
                            onClick={handleReset}
                            style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                background: "rgba(0,0,0,0.5)",
                                border: "none",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "14px",
                                lineHeight: "28px",
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            )}

            {/* Produtos detetados */}
            {estado === "resultado" && (
                <div style={{ textAlign: "left", marginBottom: "20px" }}>
                    <p style={{ color: "#1a1a2e", fontWeight: "600", marginBottom: "10px", textAlign: "center" }}>
                        <i className="bi bi-check-circle-fill" style={{ color: "#45A293", marginRight: "6px" }} />
                        {PRODUTOS_DETETADOS.length} produtos detetados:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                        {PRODUTOS_DETETADOS.map((p, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 14px",
                                    background: "#f0faf8",
                                    borderRadius: "10px",
                                    border: "1px solid #b2dfdb",
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>{p.nome}</span>
                                <span style={{ color: "#888", fontSize: "13px" }}>
                                    {p.categoria_nome} · {p.quantidade}{p.unidade}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button
                        style={{
                            width: "100%",
                            background: "#45A293",
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px",
                            fontSize: "15px",
                        }}
                        onClick={handleAdicionar}
                    >
                        <i className="bi bi-plus-circle" style={{ marginRight: "8px" }} />
                        Adicionar à Dispensa
                    </Button>
                </div>
            )}

            {/* A adicionar */}
            {estado === "adicionando" && (
                <div style={{ color: "#45A293", marginBottom: "20px" }}>
                    <span className="spinner-border spinner-border-sm" role="status" style={{ marginRight: "8px" }} />
                    A guardar na base de dados...
                </div>
            )}

            {/* Sucesso */}
            {estado === "adicionado" && (
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "48px", marginBottom: "8px" }}>✅</div>
                    <p style={{ color: "#1a1a2e", fontWeight: "600", marginBottom: "16px" }}>
                        {PRODUTOS_DETETADOS.length} produtos adicionados à dispensa!
                    </p>
                    <Button
                        style={{
                            background: "#fff",
                            border: "2px solid #45A293",
                            color: "#45A293",
                            borderRadius: "12px",
                            padding: "10px 20px",
                            fontWeight: "600",
                        }}
                        onClick={handleReset}
                    >
                        Carregar outra imagem
                    </Button>
                </div>
            )}

            {/* Botão principal de upload (quando não há imagem) */}
            {!imagemPreview && (
                <Button
                    style={{
                        width: "100%",
                        background: "#45A293",
                        border: "none",
                        borderRadius: "12px",
                        padding: "14px",
                        fontSize: "16px",
                    }}
                    onClick={() => inputRef.current.click()}
                >
                    <i className="bi bi-upload" style={{ marginRight: "8px" }} />
                    Carregar Imagem
                </Button>
            )}
        </div>
    );
};

export default ScannerPage;
