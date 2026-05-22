import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Button, Spinner } from 'reactstrap'
import pantryBg from '../assets/pantry.png'
import Footer from '../components/layout/Footer.jsx'

// TODO meter isto numa config ou .env ou qualquer coisa
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = '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'

const SuggestionPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [fullRecipe, setFullRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    console.log("state recebido:", state)

    const recipe = state?.recipe
    const selectedProducts = state?.selectedProducts ?? []

    // so usa a imagem do primeiro produto, nao temos mais
    const recipeImage = selectedProducts.length > 0 && selectedProducts[0].imagem
        ? selectedProducts[0].imagem
        : "/foods/diet.png"

    useEffect(() => {
        if (!recipe?.name) {
            setLoading(false)
            return
        }

        const names = selectedProducts.map(p => p.nome).join(', ')

        axios.post(GROQ_API_URL, {
            model: 'llama-3.1-8b-instant',
            messages: [{
                role: 'user',
                // prompt testado manualmente, nao mexer
                content: `Dá-me a receita completa de "${recipe.name}" que usa ${names}. Usa terminologia de Portugal (ex: chávena, tacho, frigideira, frigorífico) e não termos brasileiros. Responde APENAS com JSON válido, sem markdown, sem texto extra: {"ingredients": ["ingrediente 1", "ingrediente 2"], "steps": ["passo 1", "passo 2"]}`
            }],
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            let content = response.data.choices[0].message.content.trim()
            // as vezes a IA mete markdown mesmo dizendo para nao meter
            const match = content.match(/\{[\s\S]*\}/)
            if (match) content = match[0]
            const parsed = JSON.parse(content)
            setFullRecipe(parsed)

            const tempoMin = parseInt(recipe.time) || 0
            axios.post('http://localhost:8000/recipes/api/receitas/', {
                nome: recipe.name,
                descricao: '',
                tempo_preparacao: tempoMin,
                ingredientes_usados: parsed.ingredients ?? [],
                passos: parsed.steps ?? [],
            }, { withCredentials: true }).catch(err => console.error('erro ao guardar receita:', err))
        })
        .catch(err => {
            console.error('erro groq:', err)
            setError("Erro ao gerar receita :(")
        })
        .finally(() => setLoading(false))
    }, [])

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${pantryBg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <Container style={{ marginTop: '50px', marginBottom: '100px', maxWidth: '2560px', position: 'relative', zIndex: 1 }}>

                <Button color="secondary" outline size="sm" onClick={() => navigate(-1)} style={{marginBottom: 20}}>
                    ← Voltar
                </Button>

                <section style={{
                    border: '2px solid lightgrey',
                    borderStyle: 'groove',
                    borderRadius: '5px',
                    padding: '20px',
                    backgroundColor: 'rgba(255,255,255,0.45)'
                }}>
                    {/* header da receita */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: 15 }}>
                        {recipeImage && (
                            <img
                                src={recipeImage}
                                alt="imagem receita"
                                style={{
                                    width: '130px',
                                    height: '130px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    background: '#e9ecef'
                                }}
                                onError={e => { e.target.src = '' }}
                            />
                        )}
                        <div style={{ textAlign: 'left' }}>
                            <h5 style={{ fontWeight: 'bold' }}>
                                {recipe?.name ?? 'Receita'}
                            </h5>
                            {recipe?.time && (
                                <p style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                                    ⏱ {recipe.time}
                                </p>
                            )}
                            <p style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: 4 }}>
                                Ingredientes: {selectedProducts.map(p => p.nome).join(', ')}
                            </p>
                        </div>
                    </div>

                    <hr />

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <Spinner />
                            <p style={{ marginTop: 10, color: '#888' }}>A carregar...</p>
                        </div>
                    )}

                    {error && (
                        <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>
                    )}

                    {!loading && !error && fullRecipe && (
                        <div style={{ textAlign: 'left' }}>
                            <h6 style={{fontWeight: 'bold', marginBottom: 8}}>Ingredientes</h6>
                            <ul>
                                {fullRecipe.ingredients?.map((ing, i) => (
                                    <li key={i}>{ing}</li>
                                ))}
                            </ul>

                            <h6 style={{fontWeight: 'bold', marginTop: 20, marginBottom: 8}}>Preparação</h6>
                            <ol>
                                {fullRecipe.steps?.map((step, i) => (
                                    <li key={i} style={{marginBottom: 6}}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </section>
            </Container>
            <div className="position-fixed bottom-0 start-0 w-100">
                <Footer />
            </div>
        </div>
    )
}

export default SuggestionPage