import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "reactstrap";
import Header from "./Header";
import Content from "./Content.jsx";
import Footer from "./Footer.jsx";

function Home() {
    return (
        <Container style={{marginTop: "20px", marginBottom: "20px", maxWidth: "800px"}}>
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