import {Badge, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";

const ExpiringItemCard = ({image, name, daysLeft}) => {

    const labelColor = (daysLeft > 1) ? "warning" : "danger";

    return (
        <>
          <Card style={{textAlign: "center", minWidth: "150px",
        flex: "0 0 auto"   }}>
          <img style={{ fontSize: "4px" }}
            alt={name +" picture"}
            src={image}
          />
          <CardBody>
            <CardTitle tag="h6" style={{ fontSize: "12px" }}>{name}</CardTitle>
              <Badge color={ labelColor }
                     pill>
                <CardText>
                  {daysLeft > 1 ? daysLeft + " dias" : "Expira hoje"}
                </CardText>
              </Badge>

          </CardBody>
        </Card>
      </>
    )
}
export default ExpiringItemCard;
