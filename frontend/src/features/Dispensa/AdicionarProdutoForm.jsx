import {useState} from "react";
import {Button, Form, FormGroup, Table, Label, Input} from "reactstrap";
import axios from "axios";

function AdicionarProdutoForm({products, toggle, getProducts}) {

    const URL_DISPENSADATA = "http://localhost:8000/products/api/items-dispensa/";

    const [selectedOption, setSelectedOption] = useState(-1);
    const [validityDate, setValidityDate] = useState("");
    const [unit, setUnit] = useState("un");
    const [quantity, setQuantity] = useState(0)

    const addAndCloseModal = (event) => {
        event.preventDefault();
        const selectedProduct = {...products[selectedOption]}
        const newItem = {
            familia: 1,
            produto: selectedProduct.id,
            quantidade: quantity,
            unidade: unit,
            data_validade: validityDate
        }
        axios.post(URL_DISPENSADATA, newItem).then(r => {
            if(r.status === 201 || r.status === 200) {
                console.log("oi")
                toggle();
                if (getProducts) {
                    console.log("dn fdnjdnj")
                    getProducts();
                }
            }
            alert("Produto adicionado com sucesso à dispensa!")
        }).catch(() => {
            alert("Ocorreu um erro ao adicionar o produto")
        });
    };

    const optionChangeHandler = (event) => { // (4)
        const optionId = parseInt(event.target.value);
        setSelectedOption(optionId);
    };

    return (
        <>
            <Form onSubmit={addAndCloseModal}>
                <FormGroup>
                    <div style={{
                        height: "230px",
                        overflowY: "scroll",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}
                    >
                        <Table>
                            <thead style={{
                                position: "sticky",
                                top: 0
                            }}
                            >
                            <tr>
                                <th align="left">Opção</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((o, index) => ( // (6)
                                <tr key={o.id}>
                                    <td align="left">
                                        <FormGroup check>
                                            <Label style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="react-radio"
                                                    checked={selectedOption === index}
                                                    value={index}
                                                    className="form-check-input"
                                                    onChange={optionChangeHandler}
                                                />
                                                <img
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        margin: "0px 10px 0px 10px",
                                                        objectFit: "contain"
                                                    }}
                                                    src={"http://127.0.0.1:8000" + o.imagem}
                                                    alt={o.nome}/>
                                                {o.nome}
                                            </Label>
                                        </FormGroup>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </FormGroup>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <FormGroup style={{width: "50%"}}>
                        <Label for="exampleDatetime">
                            Data de Validade
                        </Label>
                        <Input
                            id="exampleDatetime"
                            name="datetime"
                            placeholder="datetime placeholder"
                            type="date"
                            onChange={(e) => setValidityDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup style={{width: "50%"}}>
                        <Label for="exampleNumber">
                            Quantidade
                        </Label>
                        <Input
                            id="exampleNumber"
                            name="quantidade"
                            min="0"
                            max="20"
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <FormGroup>
                    <Label for="exampleSelect">
                        Seleciona
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="un">
                            Unidade
                        </option>
                        <option value={"cx"}>
                            Caixa
                        </option>
                        <option value={"kg"}>
                            Quilograma
                        </option>
                        <option value={"g"}>
                            Grama
                        </option>
                        <option value={"L"}>
                            Litro
                        </option>
                        <option value={"mL"}>
                            Mililitro
                        </option>
                    </Input>
                </FormGroup>
                <Button>Adicionar</Button>
            </Form>
        </>

    )
}

export default AdicionarProdutoForm;