import {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "reactstrap";

const AlertasPage = () => {

    const URL_DISPENSAALERTASDATA = "http://localhost:8000/products/api/items-dispensa/alertas/";

    const [alertas, setAlertas] = useState([]);

    const fetchAlertas = () => {
        axios.get(URL_DISPENSAALERTASDATA, { withCredentials: true})
            .then((request) => {
                setAlertas(request.data)
            }).catch(error => console.error(error));
    }

    useEffect(() => {
        fetchAlertas()
    }, []);

    return (
        <div className="container mt-4" style={{maxWidth: "800px"}}>
            <h2 className="mb-4 text-center">Lista de Alertas</h2>
            <div style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <Table responsive striped size="sm" className="text-center m-0">
                    <thead>
                    <tr style={{backgroundColor: "#5a676d", color: "#f8f9fa"}}>
                        <th className="py-2" style={{border: "none"}}>Produto</th>
                        <th className="py-2" style={{border: "none"}}>Categoria</th>
                        <th className="py-2" style={{border: "none"}}>Quantidade</th>
                        <th className="py-2" style={{border: "none"}}>Validade</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
                    {Array.isArray(alertas) && alertas.map((item) => (
                        <tr key={item.id} style={{borderBottom: "1px solid rgba(0,0,0,0.05)"}}>
                            <td className="fw-bold py-2">{item.nome}</td>
                            <td className="py-2 text-secondary">{item.categoria}</td>
                            <td className="py-2">{parseFloat(item.quantidade)} {item.unidade}</td>
                            <td className="text-danger fw-bold py-2">
                                {item.data_validade}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default AlertasPage