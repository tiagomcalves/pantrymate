import {Badge, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import ProductCard from "../../components/common/ProductCard.jsx";
import {useEffect, useState} from "react";

const ExpireBadge = ({name, imageFile, daysLeft, congelado, quantidade, unidade}) => {

    const imgPath = imageFile;
    const [tempo, setTempo] = useState({dias: 0, horas: 0, minutos: 0, segundos: 0});
    let labelColor;
    let labelDays;
    let styleBadge = {};


    useEffect(() => {
        const dataEvento = new Date(daysLeft).getTime();
        const interval = setInterval(() => {
            const agora = new Date().getTime();
            const dif = Math.floor((dataEvento - agora) / 1000);
            const dias = Math.floor(dif / (60 * 60 * 24));
            const horas = Math.floor((dif % (60 * 60 * 24)) / (60 * 60));
            const minutos = Math.floor((dif % (60 * 60)) / 60);
            const segundos = dif % 60;
            setTempo({dias, horas, minutos, segundos});
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [daysLeft]);

    if (congelado) {
        labelColor = 'info';
        labelDays = 'Congelado'
    } else {
        if (tempo.dias <= 0 && tempo.horas <= 0 && tempo.minutos <= 0 && tempo.segundos <= 0) {
            labelColor = '';
            styleBadge = {backgroundColor: '#7F14A3', color: 'white'};
            labelDays = "Expirou";
        } else if (tempo.dias < 1) {
            labelColor = 'danger';
            labelDays = "Expira hoje";
        } else if (tempo.dias < 3) {
            if (tempo.dias === 1) {
                labelDays = "Expira em " + tempo.dias + " dia";
            } else {
                labelDays = "Expira em " + tempo.dias + " dias";
            }
            labelColor = 'warning';
        } else {
            labelColor = 'success';
            labelDays = "Dentro da validade";
        }
    }


    const dataFormatada = daysLeft
        ? new Date(daysLeft).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : null;

    return (
        <ProductCard title={name} img={imgPath}>
            <Badge color={labelColor} style={styleBadge} pill>
                <CardText>
                    {labelDays}
                </CardText>
            </Badge>
            {quantidade != null && (
                <CardText style={{ fontSize: '0.78rem', color: '#555', marginTop: '6px', marginBottom: 0 }}>
                    {quantidade} {unidade}
                </CardText>
            )}
            {!congelado && dataFormatada && quantidade != null && (
                <CardText style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px', marginBottom: 0 }}>
                    Val: {dataFormatada}
                </CardText>
            )}
        </ProductCard>
    )
}

export default ExpireBadge;

