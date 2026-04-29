import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";

const BottomMenuItem = ({ icon, string, href }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Button
            className="flex-fill"
            onClick={() => navigate(href)}
            style={{
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                borderColor: '#45A293',
                backgroundColor: isActive ? '#45A293' : '#DDDDDD',
                color: isActive ? '#fff' : '#000000'
            }}
        >
            <div>
                <img src={icon} alt={string + "-icon"} style={{ maxHeight: "20px" }} />
            </div>
            <div style={{ fontSize: "11px" }}>
                {string}
            </div>
        </Button>
    );
};

export default BottomMenuItem;
