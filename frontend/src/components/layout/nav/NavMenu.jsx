import React from "react";
import {Button, ButtonGroup} from "reactstrap";
import NavMenuItem from "./NavMenuItem.jsx";

import dashboardIcon from '../../../assets/bottom-menu/dashboard.svg'
import familyIcon from '../../../assets/bottom-menu/family.svg'
import pantryIcon from '../../../assets/bottom-menu/pantry.svg'
import recipesIcon from '../../../assets/bottom-menu/recipes.svg'
import scannerIcon from '../../../assets/bottom-menu/scanner.svg'
import {Route} from "react-router-dom";
import Scanner from "../../../pages/Scanner.jsx";

//  svg icons from
//  https://www.untitledui.com/free-icons
//  https://www.svgrepo.com/svg/524002/chef-hat

const NavMenu = () => {
    return (
        <ButtonGroup
            className="d-flex"  //  make navmenu stretch horizontally
            size="sm"
            style={{
              height: "30px"}}
        >
            <NavMenuItem icon={dashboardIcon} string={"Dashboard"} href={"/"}/>
            <NavMenuItem icon={pantryIcon} string={"Dispensa"} href={"/dispensa"}/>
            <NavMenuItem icon={scannerIcon} string={"Scanner"} href={"/scanner"}/>
            <NavMenuItem icon={recipesIcon} string={"Receitas"} href={"/recipes"}/>
            <NavMenuItem icon={familyIcon} string={"Familia"} href={"/family"}/>
        </ButtonGroup>
    )
}
export default NavMenu;