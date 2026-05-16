import ExpireBadge from "./ExpireBadge.jsx";
import {useEffect, useState} from "react";
import ContentSection from "../../components/common/ContentSection.jsx";
import axios from "axios";

const CarrosselConsumir = () => {

    const URL_DISPENSADATA = "http://localhost:8000/products/api/items-dispensa/";
    const [itemList, setItemList] = useState([]);

    // lesson learned:
    //  use useEffect() for a single API call on component mount
    //  otherwise React calls it on every Render
    const getProducts = () => {
        axios.get(URL_DISPENSADATA)
            .then((request) => {
                setItemList(request.data)
            }).catch(error => console.error(error));
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ContentSection title={"Consumir Brevemente"} w={"100%"} h={350}>
            <div
                style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "10px",
                    padding: "10px 0px 30px",
                    paddingBottom: "15px"

                }}
            >
                {itemList.map((produto) => (
                    <ExpireBadge
                        key={produto.id}
                        name={produto.nome}
                        imageFile={"http://127.0.0.1:8000" + produto.imagem}
                        daysLeft={produto.data_validade}
                    />
                ))}
            </div>
        </ContentSection>
    )
}

export default CarrosselConsumir;