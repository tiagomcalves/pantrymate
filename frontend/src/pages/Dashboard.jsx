import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import GeneralView from "../features/GeneralView.jsx";
import SuggestionByAI from "../features/SuggestionByAI.jsx";
import CarrosselConsumir from "../features/Expiring/CarrosselConsumir.jsx";
import ListaCompras from "../components/ListaCompras.jsx";

function Dashboard() {
    return (
        <section>
            <GeneralView/>
            <hr/>
            <CarrosselConsumir/>
            <hr/>
            <ListaCompras/>
            <hr/>
            <SuggestionByAI/>
            <hr/>
        </section>
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

export default Dashboard;