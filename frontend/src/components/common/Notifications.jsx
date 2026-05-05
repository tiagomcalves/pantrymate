import {Badge, Button} from "reactstrap";
import React from "react";
import bellIcon from '../../assets/bell.svg'

const Notifications = () => {
    return (
        <Button color="primary" outline>
            <img src={bellIcon} alt="Bell Icon" />{' '}
          <Badge>4</Badge>
        </Button>
    );
}

export default Notifications;