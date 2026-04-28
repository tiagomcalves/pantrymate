import {Card, CardTitle} from "reactstrap";

const ItemCard = ({title, img, children}) => {
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
                        alt={title + "??img"}
                        src={img}
                    />
                </div>

                <div style={{textAlign: "center", paddingBottom: "8px"}}>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    {children}
                </div>
            </Card>
        </>
    )
}
export default ItemCard;
