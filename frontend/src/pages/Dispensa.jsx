import GeneralView from "../features/GeneralView.jsx";
import ContentSection from "../components/common/ContentSection.jsx";
import ExpireBadge from "../features/Expiring/ExpireBadge.jsx";
import {useState} from "react";
import FilterCategory from "../features/Dispensa/FilterCategory.jsx";
import ProductSort from "../features/Dispensa/ProductSort.jsx";
import Estatistics from "../features/Dispensa/Estatistics.jsx";
import { useProdutos } from "../context/ProdutosContext.jsx";


const Dispensa = () => {

    const { produtos: productsList } = useProdutos();//Todo Adicionar depois como segundo parametro setProductsList
    const [filteredCategory,  setFilteredCategory] = useState('Todos');
    const [productSorted, setProductSorted] = useState('dataValidade')

    let filteredProducts = [...productsList];

    if (filteredCategory !== 'Todos') {
        filteredProducts = filteredProducts.filter(product => product.categoria === filteredCategory);
    }

    if (productSorted === 'dataValidade') {
        filteredProducts.sort((a, b) => new Date(a.dataValidade).getTime() - new Date(b.dataValidade).getTime());
    } else if (productSorted === 'nome') {
        filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            height: "650px"
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
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                height: "100%",
                                maxWidth: "100%",
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
                                    imageFile={produto.imagemSrc || "diet.png"}
                                    daysLeft={produto.dataValidade}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ContentSection>
            <Estatistics/>
        </div>
    )
}

export default Dispensa