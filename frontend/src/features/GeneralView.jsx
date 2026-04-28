import {Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import ExpiringItemCard from "./Expiring/ExpiringItemCard.jsx";
import ContentSection from "../components/common/ContentSection.jsx";

const GeneralView = () => {
    return (
        <>
            <ContentSection title={"Visão Geral"} w={400} h={500}>
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
            </ContentSection>
        </>
    )
}
export default GeneralView;