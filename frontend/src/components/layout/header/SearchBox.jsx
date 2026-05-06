import {Input, InputGroup, InputGroupText} from "reactstrap";
import React, {useState} from "react";


const SearchBox = () => {

    const [searchText, setSearchText] = useState("");

    if(searchText === "keyword")
    {
        console.log("special keyword");
    }

    return (
        <InputGroup className="w-50">   {/* style={{ width: "300px" }}>*/}
            <InputGroupText>
                <i className="bi bi-search"/>
            </InputGroupText>
            <Input placeholder="O que procura?" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        </InputGroup>
    );
}

export default SearchBox;