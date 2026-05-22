import {Card, CardText, CardTitle} from "reactstrap";
import AdicionarProdutoModal from "./AdicionarProdutoModal.jsx";
import PieChartDispensa from "./PieChartDispensa.jsx";

const Estatistics = ({productsList, atualProductsList}) => {

    const total = productsList.length.toString();
    const totalCloseToExpire = productsList.filter(produto => {
        const timeleft = new Date(produto.data_validade).getTime() - new Date().getTime();
        const daysLeft = Math.ceil(timeleft / (1000 * 3600 * 24));
        return daysLeft <= 3
    }).length.toString()

    return (
        <Card
            style={{
                width: "40%",
                height: "550px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                marginLeft: "15px"
            }}
        >
            <div style={{padding: "20px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <h5 style={{textAlign: "center", fontWeight: "bold", marginBottom: "15px", color: "#333"}}>
                    Painel de análise
                </h5>
                <div style={{display: "flex", gap: "10px", marginBottom: "15px"}}>
                    <div style={{
                        flex: 1,
                        padding: "10px 0",
                        textAlign: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        borderRadius: "10px"
                    }}>
                    <span style={{fontSize: "0.75rem", color: "#555", fontWeight: "bold", textTransform: "uppercase"}}>
                        Total Produtos
                    </span>
                        <h4 style={{margin: "2px 0 0 0", fontWeight: "bold", color: "#333"}}>
                            {total}
                        </h4>
                    </div>
                    <div style={{
                        flex: 1,
                        padding: "10px 0",
                        textAlign: "center",
                        backgroundColor: "rgba(220, 53, 69, 0.08)",
                        border: "1px solid rgba(220, 53, 69, 0.15)",
                        borderRadius: "10px"
                    }}>
                    <span
                        style={{fontSize: "0.75rem", color: "#dc3545", fontWeight: "bold", textTransform: "uppercase"}}>
                        A expirar
                    </span>
                        <h4 style={{margin: "2px 0 0 0", fontWeight: "bold", color: "#dc3545"}}>
                            {totalCloseToExpire}
                        </h4>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "200px",
                    marginBottom: "15px"
                }}>
                    <PieChartDispensa productsList={productsList}/>
                </div>
                <div style={{textAlign: "center"}}>
                    <AdicionarProdutoModal
                        getDispensa={atualProductsList}
                    />
                </div>

            </div>
        </Card>
    );
}

export default Estatistics