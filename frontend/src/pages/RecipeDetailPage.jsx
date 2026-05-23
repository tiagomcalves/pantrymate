import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import pantryBg from '../assets/pantry.png'
import Footer from '../components/layout/Footer.jsx'

const RecipeDetailPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const receita = state?.receita

    if (!receita) {
        return (
            <Container style={{ marginTop: '50px' }}>
                <Button onClick={() => navigate(-1)} style={{ marginBottom: 20, background: "#45A293", border: "none", borderRadius: "12px", padding: "8px 18px", fontWeight: "600", color: "#fff" }}>← Voltar</Button>
                <p>Receita não encontrada.</p>
            </Container>
        )
    }

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

                <Button onClick={() => navigate(-1)} style={{ marginBottom: 20, background: "#45A293", border: "none", borderRadius: "12px", padding: "8px 18px", fontWeight: "600", color: "#fff" }}>
                    ← Voltar
                </Button>

                <section style={{
                    border: '2px solid lightgrey',
                    borderStyle: 'groove',
                    borderRadius: '5px',
                    padding: '20px',
                    backgroundColor: 'rgba(255,255,255,0.45)'
                }}>
                    <div style={{ textAlign: 'left', marginBottom: 15 }}>
                        <h5 style={{ fontWeight: 'bold' }}>{receita.nome}</h5>
                        <p style={{ color: '#6c757d', fontSize: '0.85rem' }}>⏱ {receita.tempo_preparacao} min</p>
                    </div>

                    <hr />

                    <div style={{ textAlign: 'left' }}>
                        <h6 style={{fontWeight: 'bold', marginBottom: 8}}>Ingredientes</h6>
                        <ul>
                            {receita.ingredientes_usados.map((ing, i) => (
                                <li key={i}>{ing}</li>
                            ))}
                        </ul>

                        <h6 style={{fontWeight: 'bold', marginTop: 20, marginBottom: 8}}>Preparação</h6>
                        <ol>
                            {receita.passos.map((passo, i) => (
                                <li key={i} style={{marginBottom: 6}}>{passo}</li>
                            ))}
                        </ol>
                    </div>
                </section>
            </Container>
            <div className="position-fixed bottom-0 start-0 w-100">
                <Footer />
            </div>
        </div>
    )
}

export default RecipeDetailPage
