import {useState} from "react";
import {Button, Form, FormGroup, Label, Input, Spinner} from "reactstrap";
import axios from "axios";
import {getCurrentSession} from "../SessionManager.jsx";
import {fetchAlerts} from "../../context/Alertas.js";

function AdicionarProdutoForm({products, toggle, getProducts}) {

    const URL_DISPENSADATA = "http://localhost:8000/products/api/items-dispensa/";

    const [selectedOption, setSelectedOption] = useState(-1);
    const [validityDate, setValidityDate] = useState("");
    const [unit, setUnit] = useState("un");
    const [quantity, setQuantity] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isFrozen, setIsFrozen] = useState(false);


    const {setAlertas} = getCurrentSession();

    const addAndCloseModal = async (event) => {
        event.preventDefault();
        setLoading(true)
        const selectedProduct = {...products[selectedOption]}
        const newItem = {
            produto: selectedProduct.id,
            quantidade: quantity,
            unidade: unit,
            data_validade: validityDate,
            congelado: isFrozen
        }

        const timeInicial = Date.now()

        axios.post(URL_DISPENSADATA, newItem, {withCredentials: true}).then(async r => {
            if (r.status === 201 || r.status === 200) {
                const dados = await fetchAlerts()
                setAlertas(dados)
                setTimeout(() => {
                        toggle();
                        if (getProducts) {
                            getProducts();
                        }
                    }
                    , Math.max(0, 2500 - (Date.now() - timeInicial))
                )
            }
        }).catch(() => {
            alert("Ocorreu um erro ao adicionar o produto")
        });
    };

    const optionChangeHandler = (event) => {
        const optionId = parseInt(event.target.value);
        setSelectedOption(optionId);
        const unidade = products[optionId]?.unidade_padrao;
        if (unidade) setUnit(unidade);
    };

    return (
        <>
            <Form onSubmit={addAndCloseModal} className="p-2">

                <FormGroup>
                    <Label className="fw-bold text-secondary mb-2" style={{fontSize: "0.9rem"}}>
                        Seleciona o Produto
                    </Label>
                    <div style={{
                        height: "220px",
                        overflowY: "auto",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "12px",
                        padding: "12px",
                        backgroundColor: "#f8f9fa",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                        gap: "10px"
                    }}>
                        {products.map((o, index) => {
                            const isSelected = selectedOption === index;
                            return (
                                <label
                                    key={o.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                        backgroundColor: isSelected ? "#f9fafb" : "#ffffff",
                                        border: isSelected ? "2px solid #4a5568" : "1px solid transparent",
                                        borderRadius: "10px",
                                        cursor: loading ? "not-allowed" : "pointer",
                                        boxShadow: isSelected ? "0 4px 6px rgba(34, 197, 94, 0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
                                        transition: "all 0.2s ease",
                                        textAlign: "center"
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="react-radio"
                                        checked={isSelected}
                                        value={index}
                                        required
                                        disabled={loading}
                                        onChange={optionChangeHandler}
                                        style={{display: "none"}}
                                    />
                                    <img
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            marginBottom: "8px",
                                            objectFit: "contain"
                                        }}
                                        src={"http://127.0.0.1:8000" + o.imagem}
                                        alt={o.nome}
                                    />
                                    <span style={{
                                        fontSize: "0.85rem",
                                        fontWeight: isSelected ? "600" : "500",
                                        color: isSelected ? "#000000" : "#908e8e"
                                    }}>
                                        {o.nome}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </FormGroup>

                <div style={{display: "flex", gap: "12px", marginBottom: "15px"}}>
                    <FormGroup style={{flex: 2, margin: 0}}>
                        <Label for="exampleDatetime" className="fw-bold text-secondary" style={{fontSize: "0.85rem"}}>
                            Data de Validade
                        </Label>
                        <Input
                            id="exampleDatetime"
                            name="datetime"
                            type="date"
                            required
                            disabled={loading}
                            style={{borderRadius: "8px", borderColor: "rgba(0,0,0,0.12)"}}
                            onChange={(e) => setValidityDate(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup style={{flex: 1, margin: 0}}>
                        <Label for="exampleNumber" className="fw-bold text-secondary" style={{fontSize: "0.85rem"}}>
                            Quant.
                        </Label>
                        <Input
                            id="exampleNumber"
                            name="quantidade"
                            min="1"
                            max="20"
                            type="number"
                            required
                            disabled={loading}
                            style={{borderRadius: "8px", borderColor: "rgba(0,0,0,0.12)"}}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup style={{flex: 1.2, margin: 0}}>
                        <Label for="exampleSelect" className="fw-bold text-secondary" style={{fontSize: "0.85rem"}}>
                            Unidade
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            required
                            value={unit}
                            disabled={loading || selectedOption !== -1}
                            style={{borderRadius: "8px", borderColor: "rgba(0,0,0,0.12)"}}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option value="un">UN</option>
                            <option value="cx">CX</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="L">L</option>
                            <option value="mL">mL</option>
                        </Input>
                    </FormGroup>
                </div>

                <hr style={{borderColor: "rgba(0,0,0,0.06)", margin: "20px 0"}}/>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    padding: "0 10px 10px 10px"
                }}>
                    <FormGroup check style={{margin: 0, padding: 0, display: "flex", alignItems: "center"}}>
                        <Label check style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "0.95rem",
                            color: isFrozen ? "#2563eb" : "#5a676d",
                            margin: 0,
                            userSelect: "none"
                        }}>
                            <Input
                                type="checkbox"
                                checked={isFrozen}
                                disabled={loading}
                                onChange={(e) => setIsFrozen(e.target.checked)}
                                style={{
                                    width: "19px",
                                    height: "19px",
                                    margin: 0,
                                    cursor: "pointer",
                                    position: "static"
                                }}
                            />
                            <span>Congelar produto</span>
                        </Label>
                    </FormGroup>

                    <Button
                        disabled={loading}
                        style={{
                            border: "none",
                            borderRadius: "10px",
                            padding: "10px 24px",
                            fontWeight: "600",
                            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            margin: 0
                        }}
                    >
                        {loading ? (
                            <>
                                <Spinner style={{width: '1rem', height: '1rem'}} color="light"/>
                                <span>A carregar...</span>
                            </>
                        ) : (
                            "Adicionar produto"
                        )}
                    </Button>
                </div>
            </Form>
        </>
    )

}

export default AdicionarProdutoForm;