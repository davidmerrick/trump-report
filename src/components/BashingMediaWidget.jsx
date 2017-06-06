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
        storeState: state.DataReducer.storeState,
        errorMessage: state.DataReducer.errorMessage,
        data: state.DataReducer.data
    };
}

@connect(mapStateToProps)

class BashingMediaWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    getBashingMediaTweet(){
        let {data} = this.props;
        let found = data.find(item => {
            let categories = item.classification.categories;
            let foundCategory = categories.find(item => item.label.indexOf("news") != -1);
            let sentimentLabel = item.classification.sentiment.document.label;
            return foundCategory && sentimentLabel === "negative";
        });

        if(found){
            return found.tweet;
        }
        return null;
    }

    getBody(){
        let tweet = this.getBashingMediaTweet();
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
        let panelInfoHeader = <PanelInfoHeader tooltipText={tooltipText} title="Negative Tone about Media" />

        return(
            <Panel header={panelInfoHeader} bsStyle="primary">
                {body}
            </Panel>
        );
    }
}

export default BashingMediaWidget
