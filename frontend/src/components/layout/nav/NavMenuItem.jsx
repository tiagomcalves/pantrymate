import React from "react";
import {Button} from "reactstrap";

const NavMenuItem = ({icon, string}) => {
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
          >
            <img src={icon} alt={{string}+"-icon"} style={{ maxHeight: "30px", marginRight: "15px"}} />
            <div style={{ alignSelf: "center" }}>{string}</div>
        </Button>
    )
}
export default NavMenuItem;