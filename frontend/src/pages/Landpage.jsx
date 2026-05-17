import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "reactstrap";
import Header from "../components/layout/Header.jsx";
import Content from "../components/layout/Content.jsx";
import Footer from "../components/layout/Footer.jsx";
import pantryBg from "../assets/pantry.png";

function Home() {
    return (
        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${pantryBg})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: "none"
            }}/>
            <Container style={{marginTop: "50px", marginBottom: "50px", maxWidth: "2560px", position: "relative", zIndex: 1}}>
                <Header/>
                <hr/>
                <Content/>
                <div className="position-fixed bottom-0 start-0 w-100">
                    <Footer/>
                </div>
            </Container>
        </div>
    );
}

// function Content() {
//     return (
//         <Container style={{marginTop: "20px", maxWidth: "800px"}}>
//             <Row>
//                 <Content/>
//             </Row>
//             <Row>
//                 <Footer/>
//             </Row>
//         </Container>
//     );
// }

export default Home;