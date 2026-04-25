import {Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import ExpiringItemCard from "./ExpiringItemCard.jsx";

const GeneralView = () => {
    return (
        <>
            <h5>Visão Geral</h5>
            <div
                style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "10px",
                    padding: "10px"
                }}
            >


                <Card
                    className="my-2"
                    color="danger"
                    outline
                    style={{
                        width: '18rem'
                    }}
                >
                    <CardHeader>
                        Header
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">
                            Special Title Treatment
                        </CardTitle>
                        <CardText>
                            With supporting text below as a natural lead-in to additional content.
                        </CardText>
                    </CardBody>
                </Card>
                <Card
                    className="my-2"
                    color="light"
                    outline
                    style={{
                        width: '18rem'
                    }}
                >
                    <CardHeader>
                        Header
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">
                            Special Title Treatment
                        </CardTitle>
                        <CardText>
                            With supporting text below as a natural lead-in to additional content.
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
export default GeneralView;