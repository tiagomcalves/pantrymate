import ContentSection from "../../components/common/ContentSection.jsx";
import {Button} from "reactstrap";

const FilterCategory = ({categorys, setFilteredCategory}) => {
    return (
        <div className="d-flex flex-wrap">
            {categorys.map((c) => (
                <Button key={c} onClick={() => setFilteredCategory(c)} style={{height: "50px", margin: "5px"}}>
                    {c}
                </Button>
            ))}
        </div>
    )
}

export default FilterCategory
