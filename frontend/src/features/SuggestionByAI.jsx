import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import ContentSection from "../components/common/ContentSection.jsx";

const SuggestionByAI = () => {
    return (
        <ContentSection title={"Sugestão Inteligente"}>
            <Card style={{ borderRadius: "12px", width: "100%" }}>
                <CardBody>
                    <CardTitle tag="h6" style={{ fontWeight: "bold", marginBottom: "2px" }}>
                        Ideia para o Jantar? (IA)
                    </CardTitle>
                    <CardText style={{ fontSize: "0.85rem", color: "#6c757d", marginBottom: "12px" }}>
                        Usando os teus Tomates e Queijo...
                    </CardText>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                            src="/foods/pasta.png"
                            alt="Sugestão de receita"
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                flexShrink: 0,
                                background: "#e9ecef"
                            }}
                            onError={e => { e.target.style.background = "#e9ecef"; e.target.src = ""; }}
                        />
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                                Pasta Pomodoro com Mozzarella
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "#6c757d", marginTop: "4px" }}>
                                ⏱ 20 min
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </ContentSection>
    );
};

export default SuggestionByAI;
