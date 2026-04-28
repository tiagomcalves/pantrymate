import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "reactstrap";
import Header from "../components/layout/Header.jsx";
import Content from "../components/layout/Content.jsx";
import Footer from "../components/layout/Footer.jsx";

function Home() {
    return (
        <Container style={{marginTop: "50px", marginBottom: "50px", maxWidth: "2560px"}}>
            <Header/>
            <hr/>
            <Content/>
            <div className="position-fixed bottom-0 start-0 w-100">
                <Footer/>
            </div>
        </Container>
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