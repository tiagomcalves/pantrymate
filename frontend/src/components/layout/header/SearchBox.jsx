import {Input, InputGroup, InputGroupText} from "reactstrap";
import React from "react";


const SearchBox = () => {
    return (
        <InputGroup className="w-50">   {/* style={{ width: "300px" }}>*/}
            <InputGroupText>
                <i className="bi bi-search"/>
            </InputGroupText>
            <Input placeholder="O que procura?"/>
        </InputGroup>
    );
}

export default SearchBox;