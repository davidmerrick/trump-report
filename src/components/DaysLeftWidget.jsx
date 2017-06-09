import React from "react"
import moment from "moment"
import {Panel} from 'react-bootstrap'

class DaysLeft extends React.Component {

    constructor(props) {
        super(props);
    }

    getDaysLeft(){
        return moment("2021-01-21", "YYYY-MM-DD").diff(moment().today, 'days');
    }

    render(){
        let daysLeft = this.getDaysLeft();
        let title = "Days Left In Office";
        return(
            <Panel header={title} bsStyle="primary">
                {daysLeft.toLocaleString()}
            </Panel>
        );
    }
}

export default DaysLeft
