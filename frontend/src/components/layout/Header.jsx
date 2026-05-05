// import logo from "../src/assets/images/logo.png"
import React from "react";
import {Badge, Button, Input, InputGroup, InputGroupText, Table} from "reactstrap";
import bellIcon from '../../assets/bell.svg'

const Header = () => {
    return (
        <header>
            <div id="top-header">
                <Table>
                    <thead>
                        <tr>
                            <th style={{textAlign: "left"}}>
                                <h3>Bom dia,</h3>
                                <h4>Visitante!</h4>
                            </th>
                            <th style={{textAlign: "right"}}>
                                <div id="notification-area">
                                    <Button color="primary" outline>
                                        <img src={bellIcon} alt="Bell Icon" />{' '}
                                      <Badge>4</Badge>
                                    </Button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </div>
            <div id="searchbar">
              <SearchBox/>
            </div>
        </header>
    )
}

const SearchBox = () => {
    return (
        <InputGroup>
            <InputGroupText>
                <i className="bi bi-search"/>
            </InputGroupText>
            <Input placeholder="Search..."/>
        </InputGroup>
    );
}

export default Header;