'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import StoreState from "../constants/StoreState";
import Tweet from "./Tweet.jsx";
import {connect} from "react-redux";
import PanelInfoHeader from "./PanelInfoHeader.jsx";
import PoweredByLink from './PoweredByLink.jsx'
import ActionType from '../constants/ActionType'

function mapStateToProps(state) {
    return {
        storeState: state.BashingMediaReducer.storeState,
        tweet: state.BashingMediaReducer.tweet
    };
}

@connect(mapStateToProps)

class BashingMediaWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch({type: ActionType.FETCH_BASHING_MEDIA_TWEET_REQUESTED});
    }

    getBody(){
        let {tweet} = this.props;
        let body;
        if(!tweet){
            body = <div>
                No recent Tweets found bashing the media.
            </div>
        } else {
            body = <div>
                <Tweet tweet={tweet}/>
            </div>;
        }
        return body;
    }

    render() {
        let body;
        let {errorMessage, storeState} = this.props;
        switch(storeState){
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                body = this.getBody();
                break;
            default:
                body = errorMessage || "Error: widget failed to load.";
                break;
        };

        let tooltipText = "Uses artificial intelligence to analyze Trump's recent tweets " +
                "and find the first one that's likely to be negative about the media.";
        let panelInfoHeader = <PanelInfoHeader tooltipText={tooltipText} title="Media-Bashing" />

        return(
            <Panel header={panelInfoHeader} bsStyle="primary">
                {body}
                <br />
                <PoweredByLink
                    anchorText="IBM Watson"
                    href="https://www.ibm.com/cloud-computing/bluemix/watson"
                />
            </Panel>
        );
    }
}

export default BashingMediaWidget
