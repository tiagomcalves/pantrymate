import {Badge, Button} from "reactstrap";
import React, {useEffect, useState} from "react";
import bellIcon from '../../../assets/bell.svg'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Notifications = () => {

    const URL_DISPENSAALERTASDATA = "http://localhost:8000/products/api/items-dispensa/alertas/";

    const [alertProducts,setAlertProducts] = useState(0)
    const navigate = useNavigate();

    const getProducts = () => {
        axios.get(URL_DISPENSAALERTASDATA)
            .then((request) => {
                setAlertProducts(request.data)
            }).catch(error => console.error(error));
    };

    useEffect(() => {
        getProducts();
    }, []);

    console.log(alertProducts)

    const size = alertProducts.length

    return (
        <Button color="secondary" outline onClick={() => navigate("/alertas")}>
            <img src={bellIcon} alt="Bell Icon" />{' '}
          <Badge>{size}</Badge>
        </Button>
    );
}

export default Notifications;