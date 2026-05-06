// import ExpiringItemCard from "./ExpiringItemCard.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import ContentSection from "../../components/common/ContentSection.jsx";

const ExpiringBelt = () => {

    const URL_PRODUCTDATA = "http://localhost:8000/products/api/products/";
    const [productsList, setProductsList] = useState([]);

    // lesson learned:
    //  use useEffect() for a single API call on component mount
    //  otherwise React calls it on every Render

    useEffect(() => {
        axios.get(URL_PRODUCTDATA)
            .then(response => {
                setProductsList(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <ContentSection title={"Consumir Brevemente"} w={1024} h={250}>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "10px",
                // padding: "10px 0px 15px",
                paddingBottom: "15px"
              }}
            >
                <ExpiringItemCard
                    name="Peitos de frango"
                    imageFile={findProductImage(productsList, "FRANGO")}
                    daysLeft={1}
                />
                <ExpiringItemCard
                          key={99}
                          name="Queijo"
                    imageFile={findProductImage(productsList, "queiJO")}
                    daysLeft={2}
                />
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <ExpiringItemCard
                          key={i}
                          name={"item" + i}
                          imageFile={findProductImage(productsList, "test")}
                          daysLeft={i}/>
                    ))}
            </div>
        </ContentSection>
    )
}


function findProductImage(fetchedData, productString){

   const result = fetchedData.find(item =>
        item.name.toLowerCase().includes(productString.toLowerCase())
    );

    if (result)
    {
        console.log(result.img);
    }

    return result ? result.img : "diet.png";
}

export default ExpiringBelt;