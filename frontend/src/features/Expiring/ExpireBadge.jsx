import {Badge, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import ProductCard from "../../components/common/ProductCard.jsx";
import {useEffect, useState} from "react";

const ExpireBadge = ({name, imageFile, daysLeft}) => {

    const imgPath = imageFile;
    const[tempo, setTempo] = useState({dias: 0, horas: 0, minutos:0, segundos: 0});
    let labelColor;
    let labelDays;


    useEffect(() => {
        const dataEvento = new Date(daysLeft).getTime();
        const interval = setInterval(() => {
            const agora = new Date().getTime();
            const dif = Math.floor( (dataEvento - agora) / 1000);
            const dias = Math.floor( dif / (60 * 60 * 24) );
            const horas = Math.floor( (dif % (60 * 60 * 24)) / (60 * 60) );
            const minutos = Math.floor( (dif % (60 * 60)) / 60 );
            const segundos = dif % 60;
            setTempo({dias, horas, minutos, segundos});
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [daysLeft]);

    if(tempo.dias < 1) {
        labelColor = 'danger';
        labelDays = "Expira hoje";
    } else if(tempo.dias < 3) {
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



    return (
        <ProductCard title={name} img={imgPath}>
            <Badge color={labelColor} pill>
                <CardText style={{margin: 0}}>
                    {labelDays}
                </CardText>
            </Badge>
        </ProductCard>
    )
}

export default ExpireBadge;

