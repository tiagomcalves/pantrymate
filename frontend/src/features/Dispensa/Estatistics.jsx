import {Card, CardText, CardTitle} from "reactstrap";

const Estatistics = ({productsList}) => {

    const total = productsList.length.toString();
    const totalCloseToExpire = productsList.filter(produto => {
        const daysLeft = new Date(produto.dataValidade).getTime() - new Date().getTime();
        return daysLeft < 3
    }).length.toString()

    return (
        <>
            <Card
                style={{
                    width: "40%",
                    height: "550px",
                    flex: "0 0 auto",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px"
                }}
            >
                <div style={{textAlign: "left", paddingBottom: "10px"}}>
                    <CardTitle tag="h5">
                        {"Painel de análise da dispensa"}
                    </CardTitle>
                    <Card
                        style={{
                            width: "50%",
                            height: "100%",
                            flex: "0 0 auto",
                            flexShrink: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}
                    >
                        <div style={{
                            textAlign: "center", paddingBottom: "10px", width: "100%", height: "100%" ,fontWeight: "bold"
                        }}>
                            <CardTitle tag="h7">
                                {"Total de produtos:"}
                            </CardTitle>
                            <CardText>
                                {total}
                            </CardText>
                        </div>
                    </Card>
                    <div style={{
                        textAlign: "left", paddingBottom: "10px", width: "100%", height: "100%", fontWeight: "bold"
                    }}>
                        <CardTitle tag="h7">
                            {"Perto da validade:"}
                        </CardTitle>
                        <CardText>
                            {totalCloseToExpire}
                        </CardText>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Estatistics