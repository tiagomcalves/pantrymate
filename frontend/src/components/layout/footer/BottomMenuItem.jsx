import React from "react";
import {Button} from "reactstrap";

const BottomMenuItem = ({icon, string}) => {
    return (
          <Button className="flex-fill"
                  style={
              {borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  borderColor: '#45A293',
                  backgroundColor: '#DDDDDD',
                  color: '#000000'
              }
          }>
              <div>
                    <img src={icon} alt={{string}+"-icon"} style={{ maxHeight: "20px"}} />
              </div>
              <div>
                    {string}
              </div>
          </Button>
    )
}
export default BottomMenuItem;