// import logo from "../src/assets/images/logo.png"
import React from "react";
import {Badge, Button, Input, Table} from "reactstrap";
import bellIcon from '../assets/bell.svg'

const Header = () => {
    return (
        <header>
            <div id="top-header">
                <Table>
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
                </Table>
            </div>
            <div id="searchbar">
              <Input/>
            </div>
        </header>
    )
}
export default Header;