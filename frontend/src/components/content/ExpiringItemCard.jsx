import {Badge, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";

const ExpiringItemCard = ({image, name, daysLeft}) => {

    const labelColor = (daysLeft > 1) ? "warning" : "danger";

    return (
        <>
            <Card
                style={{
                    minWidth: "150px",
                    flex: "0 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    height: "200px",
                    padding: "10px"
                }}
            >
                <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain"
                        }}
                        alt={name + " picture"}
                        src={image}
                    />
                </div>

                <div style={{textAlign: "center", paddingBottom: "8px"}}>
                    <CardTitle tag="h5">{name}</CardTitle>

                    <Badge color={labelColor} pill>
                        <CardText style={{margin: 0}}>
                            {daysLeft > 1 ? daysLeft + " dias" : "Expira hoje"}
                        </CardText>
                    </Badge>
                </div>
            </Card>
        </>
    )
}
export default ExpiringItemCard;
