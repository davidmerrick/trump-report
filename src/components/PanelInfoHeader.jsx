import React from 'react'
import {Glyphicon, OverlayTrigger, Tooltip} from "react-bootstrap";

class PanelInfoHeader extends React.Component {

    render() {
        let {tooltipText, title} = this.props;
        let tooltip = <Tooltip id="tooltip">
            <strong>About:</strong>&nbsp;{tooltipText}
        </Tooltip>;
        let infoOverlay = <OverlayTrigger placement="right" overlay={tooltip}>
            <Glyphicon glyph="info-sign" />
        </OverlayTrigger>;

        return(
            <span style={{fontSize: '14px'}}>
                {title}&nbsp;&nbsp;&nbsp;{infoOverlay}
            </span>);
    }
}

export default PanelInfoHeader
