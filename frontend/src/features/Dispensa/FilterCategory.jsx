import ContentSection from "../../components/common/ContentSection.jsx";
import {Button} from "reactstrap";

const FilterCategory = ({categorys, setFilteredCategory}) => {
    return (
        <div
            style={{
                display: "flex",
                overflowX: "auto",
                gap: "10px",
                paddingBottom: "15px"

            }}
        >
            {categorys.map((c) => (
                <Button key={c} onClick={() => setFilteredCategory(c)}>
                    {c}
                </Button>
            ))}
        </div>
    )
}

export default FilterCategory
