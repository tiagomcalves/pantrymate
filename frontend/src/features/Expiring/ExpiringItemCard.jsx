import {Badge, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import ItemCard from "../../components/common/ItemCard.jsx";

const ExpiringItemCard = ({name, imageFile, daysLeft}) => {

    const foodImagePath = "/foods/";
    const imgPath= foodImagePath + imageFile;
    const labelColor = (daysLeft > 1) ? "warning" : "danger";

    return (
        <ItemCard title={name} img={imgPath}>
            <Badge color={labelColor} pill>
                <CardText style={{margin: 0}}>
                    {daysLeft > 1 ? daysLeft + " dias" : "Expira hoje"}
                </CardText>
            </Badge>
        </ItemCard>
    )
}

export default ExpiringItemCard;

