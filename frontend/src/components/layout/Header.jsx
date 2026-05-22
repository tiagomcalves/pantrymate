import React from "react";
import SearchBox from "./header/SearchBox.jsx";
import Notifications from "./header/Notifications.jsx";
import WelcomeUser from "./header/WelcomeUser.jsx";
import Logout from "./header/Logout.jsx";

const Header = () => {

    return (
        <header style={{margin: "1rem", marginBottom: "1rem"}}>
            <div id="top-header" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div id="left-header" style={{textAlign: "left"}}>
                    <WelcomeUser/>
                </div>

                <div id="right-header" style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <div>
                        <Notifications/>
                    </div>
                    <div>
                        <Logout/>
                    </div>
                </div>
            </div>
            <div id="searchbar" style={{display: "flex", flexDirection: "row", justifyContent: "end"}}>
                <SearchBox/>
            </div>
        </header>
    )
}

export default Header;