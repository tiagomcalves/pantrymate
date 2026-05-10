import GeneralView from "../features/GeneralView.jsx";
import ContentSection from "../components/common/ContentSection.jsx";
import ExpireBadge from "../features/Expiring/ExpireBadge.jsx";
import produtosData from "../data/produtos.json";
import {useState} from "react";
import FilterCategory from "../features/Dispensa/FilterCategory.jsx";
import ProductSort from "../features/Dispensa/ProductSort.jsx";


const Dispensa = () => {

    const [productsList] = useState([...produtosData])//Todo Adicionar depois como segundo parametro setProductsList
    const [filteredCategory, setFilteredCategory] = useState('Todos');
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
        <ContentSection title={"Gestão da dispensa"} w={1024} h={250}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    height: "100%"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        height: "100%"
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
                        overflowX: "auto",
                        gap: "10px",
                        paddingBottom: "15px"

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
        </ContentSection>
    )
}

export default Dispensa