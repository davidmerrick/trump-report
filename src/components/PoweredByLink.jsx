import React from 'react'

class PoweredByLink extends React.Component {

    render(){
        let {anchorText, href} = this.props;

        return(
            <span style={{fontSize: "12px"}}>
                Powered by <a href={href} target="_blank">{anchorText}</a>
            </span>
        );
    }
}

export default PoweredByLink