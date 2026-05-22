import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container } from 'reactstrap'
import pantryBg from '../assets/pantry.png'
import Footer from '../components/layout/Footer.jsx'

const Recipes = () => {
    const [receitas, setReceitas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/recipes/api/receitas/', { withCredentials: true })
            .then(response => setReceitas(response.data.slice(0, 12)))
            .catch(err => console.error('erro ao carregar receitas:', err))
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

            <Container style={{ marginTop: '30px', marginBottom: '100px', maxWidth: '2560px', position: 'relative', zIndex: 1 }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Receitas</h4>

                {receitas.length === 0 ? (
                    <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Ainda não há receitas guardadas. Experimenta a sugestão da IA!</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {receitas.map(receita => (
                            <div key={receita.id} onClick={() => navigate(`/recipes/${receita.id}`, { state: { receita } })} style={{ borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', background: 'rgba(255,255,255,0.8)', padding: '16px', cursor: 'pointer' }}>
                                <h6 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{receita.nome}</h6>

                                <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '6px' }}>
                                    <strong>Ingredientes:</strong> {receita.ingredientes_usados.join(', ')}
                                </div>

                                <div style={{ fontSize: '0.8rem', color: '#45A293', fontWeight: '600' }}>
                                    ⏱ {receita.tempo_preparacao} min
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>

            <div className="position-fixed bottom-0 start-0 w-100">
                <Footer />
            </div>
        </div>
    )
}

export default Recipes
