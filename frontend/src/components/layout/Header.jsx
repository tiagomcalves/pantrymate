// import logo from "../src/assets/images/logo.png"
import React from "react";
import SearchBox from "../common/SearchBox.jsx";
import Notifications from "../common/Notifications.jsx";

const Header = () => {

    const mock_user = {'username': 'Moita'}

    return (
        <header>
            <div id="top-header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div id="left-header" style={{textAlign: "left"}}>
                    <h3>Bom dia,</h3>
                    <h4>Visitante!</h4>
                </div>

                <div id="right-header">
                    <Notifications/>
                </div>
            </div>
            <div id="searchbar" style={{ display: "flex", flexDirection: "row", justifyContent: "end"}}>
              <SearchBox/>
            </div>
        </header>
    )
}

export default Header;