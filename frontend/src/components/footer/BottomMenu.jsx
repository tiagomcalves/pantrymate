import { ButtonGroup } from "reactstrap";
import BottomMenuItem from "./BottomMenuItem.jsx";

import dashboardIcon from '../../assets/bottom-menu/dashboard.svg'
import familyIcon from '../../assets/bottom-menu/family.svg'
import pantryIcon from '../../assets/bottom-menu/pantry.svg'
import recipesIcon from '../../assets/bottom-menu/recipes.svg'
import scannerIcon from '../../assets/bottom-menu/scanner.svg'

const BottomMenu = () => {
    return (
        <ButtonGroup className="d-flex">
            <BottomMenuItem icon={dashboardIcon} string="Dashboard" href="/" />
            <BottomMenuItem icon={pantryIcon}    string="Dispensa"  href="/dispensa" />
            <BottomMenuItem icon={scannerIcon}   string="Scanner"   href="/scanner" />
            <BottomMenuItem icon={recipesIcon}   string="Receitas"  href="/receitas" />
            <BottomMenuItem icon={familyIcon}    string="Família"   href="/familia" />
        </ButtonGroup>
    );
};

export default BottomMenu;
