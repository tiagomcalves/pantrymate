import ExpireBadge from "./ExpireBadge.jsx";
// import axios from "axios";
import {useState} from "react";
import ContentSection from "../../components/common/ContentSection.jsx";
import produtosData from "../../data/produtos.json";

const CarrosselConsumir = () => {

    // const URL_PRODUCTDATA = "http://localhost:8000/products/api/products/";
    const [productsList, ] = useState(() => { //Todo Adicionar depois como segundo parametro setProductsList
        return [...produtosData].sort((a, b) => {
            return new Date(a.dataValidade).getTime() - new Date(b.dataValidade).getTime()
        });
    });

    // lesson learned:
    //  use useEffect() for a single API call on component mount
    //  otherwise React calls it on every Render

    // useEffect(() => {
    //     //     axios.get(URL_PRODUCTDATA)
    //     //         .then(response => {
    //     //             setProductsList(response.data);
    //     //         })
    //     //         .catch(error => console.error(error));
    // }, []);

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
                {productsList.map((produto) => (
                    <ExpireBadge
                        key={produto.id}
                        name={produto.nome}
                        imageFile={produto.imagemSrc || "diet.png"}
                        daysLeft={produto.dataValidade}
                    />
                ))}
            </div>
        </ContentSection>
    )
}

export default CarrosselConsumir;