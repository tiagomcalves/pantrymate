import React from "react";
import {Button, ButtonGroup} from "reactstrap";
import NavMenuItem from "./NavMenuItem.jsx";

import dashboardIcon from '../../../assets/bottom-menu/dashboard.svg'
import familyIcon from '../../../assets/bottom-menu/family.svg'
import pantryIcon from '../../../assets/bottom-menu/pantry.svg'
import recipesIcon from '../../../assets/bottom-menu/recipes.svg'
import scannerIcon from '../../../assets/bottom-menu/scanner.svg'

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
            <NavMenuItem icon={dashboardIcon} string={"Dashboard"}/>
            <NavMenuItem icon={pantryIcon} string={"Dispensa"}/>
            <NavMenuItem icon={scannerIcon} string={"Scanner"}/>
            <NavMenuItem icon={recipesIcon} string={"Receitas"}/>
            <NavMenuItem icon={familyIcon} string={"Familia"}/>
        </ButtonGroup>
    )
}
export default NavMenu;