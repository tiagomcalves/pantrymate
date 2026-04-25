import React from "react";
import {Button, ButtonGroup} from "reactstrap";
import BottomMenuItem from "./BottomMenuItem.jsx";

import dashboardIcon from '../../assets/bottom-menu/dashboard.svg'
import familyIcon from '../../assets/bottom-menu/family.svg'
import pantryIcon from '../../assets/bottom-menu/pantry.svg'
import recipesIcon from '../../assets/bottom-menu/recipes.svg'
import scannerIcon from '../../assets/bottom-menu/scanner.svg'

//  svg icons from
//  https://www.untitledui.com/free-icons
//  https://www.svgrepo.com/svg/524002/chef-hat

const BottomMenu = () => {
    return (
        <ButtonGroup className="d-flex">
            <BottomMenuItem icon={dashboardIcon} string={"Dashboard"}/>
            <BottomMenuItem icon={pantryIcon} string={"Dispensa"}/>
            <BottomMenuItem icon={scannerIcon} string={"Scanner"}/>
            <BottomMenuItem icon={recipesIcon} string={"Receitas"}/>
            <BottomMenuItem icon={familyIcon} string={"Familia"}/>
        </ButtonGroup>
    )
}
export default BottomMenu;