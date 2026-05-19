import {useState} from "react";
import axios from "axios";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import AdicionarProdutoForm from "./AdicionarProdutoForm.jsx";

const AdicionarProdutoModal = ({getDispensa}) => {

    const URL_PRODUCTDATA = "http://localhost:8000/products/api/products/";

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        axios.get(URL_PRODUCTDATA)
            .then(request => {
                setProducts(request.data);
            });
    };

    const toggleModal = () => {
        if (!showModal) getProducts();
        setShowModal(showModal => !showModal);
    };

    return (
        <>
            <Button onClick={toggleModal} color="success">
                Adicionar produto
            </Button>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Adicionar produto à dispensa
                </ModalHeader>
                <ModalBody>
                    <AdicionarProdutoForm
                        products={products}
                        toggle={toggleModal}
                        getProducts={getDispensa}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}

export default AdicionarProdutoModal