import {Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from "reactstrap";
import {useState} from "react";

const ProductSort = ({productSorted, setProductSorted}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
            }}
        >
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                <DropdownToggle style={{height: "50px", margin: "5px"}}>
                    Ordenar por
                </DropdownToggle>
                <DropdownMenu container="body">
                    <DropdownItem header>Opções</DropdownItem>
                    <DropdownItem active={productSorted === 'dataValidade'} onClick={() => setProductSorted('dataValidade')}>Data de Validade (mais próxima)</DropdownItem>
                    <DropdownItem active={productSorted === 'nome'} onClick={() => setProductSorted('nome')}>Nome (A-Z)</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default ProductSort