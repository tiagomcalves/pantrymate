import ContentSection from "../components/common/ContentSection.jsx";
import ExpireBadge from "../features/Expiring/ExpireBadge.jsx";
import {useEffect, useState} from "react";
import FilterCategory from "../features/Dispensa/FilterCategory.jsx";
import ProductSort from "../features/Dispensa/ProductSort.jsx";
import Estatistics from "../features/Dispensa/Estatistics.jsx";
import axios from "axios";


const Dispensa = () => {

    const URL_DISPENSADATA = "http://localhost:8000/products/api/items-dispensa/";
    const [itemsList, setItemsList] = useState([])
    const [filteredCategory, setFilteredCategory] = useState('Todos');
    const [productSorted, setProductSorted] = useState('dataValidade')

    const getProducts = () => {
        axios.get(URL_DISPENSADATA, { withCredentials: true})
            .then((request) => {
                setItemsList(request.data)
            }).catch(error => console.error(error));
    };

    useEffect(() => {
        getProducts();
    }, []);

    let filteredProducts = [...itemsList];

    if (filteredCategory !== 'Todos') {
        filteredProducts = filteredProducts.filter(product => product.categoria === filteredCategory);
    }

    if (productSorted === 'dataValidade') {
        filteredProducts.sort((a, b) => new Date(a.data_validade).getTime() - new Date(b.data_validade).getTime());
    } else if (productSorted === 'nome') {
        filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            height: "650px",
        }}>
            <ContentSection title={"Gestão da dispensa"} w={"60%"} h={"550px"}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        height: "100%"
                    }}
                >
                    <div>
                        <div style={{
                            display: "flex",
                            gap: 2,
                            margin: "0 0 10px 0",
                            flexWrap: "wrap"
                        }}
                        >
                            <FilterCategory
                                categorys={['Todos', 'Frescos', 'Congelados', 'Mercearia']}
                                setFilteredCategory={setFilteredCategory}
                            />
                            <ProductSort
                                productSorted={productSorted}
                                setProductSorted={setProductSorted}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignContent: "flex-start",
                                gap: "20px",
                                width: "100%",
                                height: "400px",
                                overflowX: "hidden",
                                overflowY: "auto"
                            }}
                        >
                            {filteredProducts.map((produto) => (
                                <ExpireBadge
                                    key={produto.id}
                                    name={produto.nome}
                                    imageFile={"http://127.0.0.1:8000" + produto.imagem}
                                    daysLeft={produto.data_validade}
                                    congelado={produto.congelado}
                                    quantidade={produto.quantidade}
                                    unidade={produto.unidade}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ContentSection>
            <Estatistics
                productsList={itemsList}
                atualProductsList={getProducts}
            />
        </div>
    )
}

export default Dispensa