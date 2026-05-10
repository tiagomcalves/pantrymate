import React from "react";
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";

const NavMenuItem = ({icon, string, href}) => {
        const navigate = useNavigate();

    return (
        <Button
              // className="flex-fill"
              // size="sm"
              style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  justifySelf: "center",
                  justifyItems: "center",
                  alignSelf: "center",
                  verticalAlign: "middle",
                  borderColor: "white",
                  height: "30px"
              }}
              onClick={() => navigate(href)}
          >
            <img src={icon} alt={{string}+"-icon"} style={{ maxHeight: "30px", marginRight: "15px"}} />
            <div style={{ alignSelf: "center" }}>{string}</div>
        </Button>
    )
}
export default NavMenuItem;