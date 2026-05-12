import {Card, CardTitle} from "reactstrap";

const ProductCard = ({title, img, children}) => {
    return (
        <>
            <Card
                style={{
                    width: "180px",
                    minHeight: "200px",
                    flex: "0 0 auto",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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

                <div style={{textAlign: "center", paddingBottom: "10px"}}>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    {children}
                </div>
            </Card>
        </>
    )
}
export default ProductCard;
