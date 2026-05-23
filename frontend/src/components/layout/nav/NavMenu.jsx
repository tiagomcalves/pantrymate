import React from "react";
import {ButtonGroup} from "reactstrap";
import NavMenuItem from "./NavMenuItem.jsx";
import { getCurrentSession } from "../../../features/SessionManager.jsx";

import dashboardIcon from '../../../assets/bottom-menu/dashboard.svg'
import familyIcon from '../../../assets/bottom-menu/family.svg'
import pantryIcon from '../../../assets/bottom-menu/pantry.svg'
import recipesIcon from '../../../assets/bottom-menu/recipes.svg'
import scannerIcon from '../../../assets/bottom-menu/scanner.svg'

//  svg icons from
//  https://www.untitledui.com/free-icons
//  https://www.svgrepo.com/svg/524002/chef-hat

const NavMenu = () => {
    const { currentUser } = getCurrentSession();
    const role = currentUser?.role;

    return (
        <ButtonGroup
            className="d-flex"
            size="sm"
            style={{ height: "30px" }}
        >
            <NavMenuItem icon={dashboardIcon} string={"Dashboard"} href={"/"}/>
            <NavMenuItem icon={pantryIcon} string={"Despensa"} href={"/dispensa"}/>
            {role !== "junior" && (
                <NavMenuItem icon={scannerIcon} string={"Scanner"} href={"/scanner"}/>
            )}
            <NavMenuItem icon={recipesIcon} string={"Receitas"} href={"/recipes"}/>
            <NavMenuItem icon={familyIcon} string={"Familia"} href={"/family"}/>
        </ButtonGroup>
    )
}
export default NavMenu;