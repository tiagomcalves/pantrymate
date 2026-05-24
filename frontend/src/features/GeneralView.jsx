import { useEffect, useState } from "react";
import axios from "axios";
import PieChartDispensa from "./Dispensa/PieChartDispensa.jsx";
import ContentSection from "../components/common/ContentSection.jsx";

const classificarItem = (item) => {
    if (item.congelado) return "Congelados";
    if (!item.data_validade) return "Ok";
    const validade = new Date(item.data_validade);
    const agora = new Date();
    agora.setHours(0, 0, 0, 0);
    const em3Dias = new Date(agora);
    em3Dias.setDate(agora.getDate() + 3);
    if (validade < agora) return "Expirado";
    if (validade <= em3Dias) return "A expirar";
    return "Ok";
};

const COLORS_CATEGORIAS = ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055', '#74B9FF', '#A29BFE', '#FD79A8'];
const COLORS_ESTADO = ['#4CAF50', '#FF9800', '#F44336', '#2196F3'];

const GeneralView = () => {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/products/api/items-dispensa/", { withCredentials: true })
            .then(res => setItens(res.data))
            .catch(() => {});
    }, []);

    const itensPorCategoria = itens.map(item => ({ categoria: item.categoria || "Outros" }));
    const itensPorEstado = itens.map(item => ({ categoria: classificarItem(item) }));

    const semDados = (
        <p style={{ textAlign: "center", color: "#aaa", fontSize: "13px", marginTop: "40px" }}>
            Sem dados
        </p>
    );

    return (
        <ContentSection title="Visão Geral" w="100%" h="auto">
            <div style={{ display: "flex", gap: "16px", width: "100%", flexWrap: "wrap", paddingBottom: "12px" }}>
                <div style={{ flex: 1, minWidth: "260px" }}>
                    <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "700", color: "#222", marginBottom: "8px" }}>
                        Categorias na Dispensa
                    </p>
                    {itens.length === 0 ? semDados : <PieChartDispensa productsList={itensPorCategoria} colors={COLORS_CATEGORIAS} />}
                </div>
                <div style={{ width: "1px", background: "#e0e0e0", alignSelf: "stretch", margin: "8px 0" }} />
                <div style={{ flex: 1, minWidth: "260px" }}>
                    <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "700", color: "#222", marginBottom: "8px" }}>
                        Estado dos Produtos
                    </p>
                    {itens.length === 0 ? semDados : <PieChartDispensa productsList={itensPorEstado} colors={COLORS_ESTADO} />}
                </div>
            </div>
        </ContentSection>
    );
};

export default GeneralView;
