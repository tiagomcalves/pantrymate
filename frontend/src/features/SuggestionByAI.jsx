import { Card, CardBody, CardText, CardTitle, CardHeader, ListGroup } from "reactstrap";
import ContentSection from "../components/common/ContentSection.jsx";

// TODO: connect to AI api later

const SuggestionByAI = () => {

    const suggestion = {
        name: "Pasta Pomodoro com Mozzarella",
        time: 20,
        img: "pasta.png"
    }

    console.log("suggestion:", suggestion)

    return (
        <ContentSection title={"Sugestão Inteligente"}>
            <Card style={{ borderRadius: "10px" }}>
                <CardBody>
                    <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                        Ideia para o Jantar? (IA)
                    </CardTitle>
                    <CardText style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                        Usando os teus Tomates e Queijo...
                    </CardText>

                    <div style={{ display: "flex", gap: "12px" }}>
                        <img
                            src={"/foods/" + suggestion.img}
                            alt="Sugestão de receita"
                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                            onError={e => { e.target.onerror = null; e.target.style.background = "#dee2e6"; e.target.src = ""; }}
                        />
                          <div>
                            <div style={{ fontWeight: "600" }}>{suggestion.name}</div>
                            <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>⏱ {suggestion.time} min</div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </ContentSection>
    );
};

export default SuggestionByAI;
