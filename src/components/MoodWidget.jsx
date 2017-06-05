'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import Tweet from "./Tweet.jsx";
import StoreState from "../constants/StoreState";
import {connect} from "react-redux";
import PanelInfoHeader from './PanelInfoHeader.jsx'
import PoweredByLink from './PoweredByLink.jsx'

function mapStateToProps(state) {
    return {
        storeState: state.MoodReducer.storeState,
        errorMessage: state.MoodReducer.errorMessage,
        mood: state.MoodReducer.mood,
        moodScore: state.MoodReducer.moodScore,
        tweet: state.MoodReducer.tweet
    };
}

@connect(mapStateToProps)

class MoodWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    getFormattedMoodScore(){
        return (this.props.moodScore * 100).toFixed(2);
    }

    render(){
        let title = "Mood";
        let tooltipText = "Trump's mood in the last Tweet he wrote (excludes retweets).";
        let panelInfoHeader = <PanelInfoHeader tooltipText={tooltipText} title={title} />

        let {storeState, mood, tweet} = this.props;
        let body;

        switch(storeState) {
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                body = <div>
                            <span style={{fontSize: "30px"}}>{mood}: {this.getFormattedMoodScore()}%</span>
                            <br />
                            <br />
                            <Tweet tweet={tweet} />
                        </div>;
                break;
            default:
                body = "Error: widget failed to load.";
                break;
        };
        return (
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

export default MoodWidget
