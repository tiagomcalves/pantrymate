import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import ContentSection from "../components/common/ContentSection.jsx";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = "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";

const SuggestionByAI = () => {
    const navigate = useNavigate();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProdutos = () => {
        setRecipe(null);
        setError(null);
        setLoading(true);
        axios.get("http://localhost:8000/products/api/itens/", { withCredentials: true })
            .then(response => {
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                setSelectedProducts(shuffled.slice(0, 3));
            })
            .catch(err => {
                console.error(err);
                setError("Não foi possível carregar os produtos.");
                setLoading(false);
            });
    };

    useEffect(() => { fetchProdutos(); }, []);

    useEffect(() => {
        if (selectedProducts.length === 0) return;

        setError(null);
        setLoading(true);
        const names = selectedProducts.map(p => p.nome).join(", ");

        axios.post(GROQ_API_URL, {
            model: "llama-3.1-8b-instant",
            messages: [{
                role: "user",
                content: `Sugere uma receita de jantar portuguesa que use estes ingredientes: ${names}. Usa terminologia de Portugal (ex: chávena, tacho, frigorífico) e não termos brasileiros. Responde APENAS com JSON válido, sem markdown, sem texto extra: {"name": "nome da receita", "time": "X min"}`
            }],
            temperature: 0.7,
        }, {
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            let content = response.data.choices[0].message.content.trim();
            const match = content.match(/\{[\s\S]*\}/);
            if (match) content = match[0];
            const parsed = JSON.parse(content);
            if (!parsed.name) throw new Error("Resposta inválida da IA.");
            setRecipe(parsed);
        })
        .catch(err => {
            console.error("Groq error:", err);
            setError(err.message ?? "Erro desconhecido");
        })
        .finally(() => setLoading(false));
    }, [selectedProducts]);

    const names = selectedProducts.map(p => p.nome);
    const usingText = names.length > 0
        ? `Utilizando ${names.join(", ")}...`
        : "A carregar produtos...";

    const recipeImage = "/foods/diet.png";

    // so funciona quando o backend ta ligado
    return (
        <ContentSection title={"Sugestão Inteligente"}>
            <Card
                style={{ borderRadius: "12px", width: "100%", cursor: recipe && !loading ? "pointer" : "default" }}
                onClick={() => recipe && !loading && navigate("/suggestions", { state: { recipe, selectedProducts } })}
            >
                <CardBody>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <CardTitle tag="h6" style={{ fontWeight: "bold", margin: 0 }}>
                            Ideia para o Jantar? (IA)
                        </CardTitle>
                        <Button size="sm" disabled={loading}
                            onClick={e => { e.stopPropagation(); fetchProdutos(); }}
                            style={{ background: "#45A293", border: "none" }}
                        >
                            ↻ Alternativa
                        </Button>
                    </div>
                    <CardText style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                        {usingText}
                    </CardText>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
                        <img
                            src={recipeImage}
                            alt="Sugestão de receita"
                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                            onError={e => { e.target.onerror = null; e.target.style.background = "#dee2e6"; e.target.src = ""; }}
                        />
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                                {loading ? "A gerar receita..." : error ? `Erro: ${error}` : (recipe?.name ?? "—")}
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "#6c757d", marginTop: "4px" }}>
                                {!loading && !error && recipe?.time ? `⏱ ${recipe.time}` : ""}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </ContentSection>
    );
};

export default SuggestionByAI;