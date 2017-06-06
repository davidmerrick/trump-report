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
        storeState: state.DataReducer.storeState,
        errorMessage: state.DataReducer.errorMessage,
        data: state.DataReducer.data
    };
}

@connect(mapStateToProps)

class MoodWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    getFormattedMoodScore(moodScore){
        return (moodScore * 100).toFixed(2);
    }

    getMoodObject(dataItem){
        let tones = dataItem.mood.document_tone.tone_categories[0].tones;
        let sorted = tones.sort((a,b) => b.score - a.score);
        return sorted[0];
    }

    render(){
        let title = "Mood";
        let tooltipText = "Trump's mood in the last Tweet he wrote (excludes retweets).";
        let panelInfoHeader = <PanelInfoHeader tooltipText={tooltipText} title={title} />

        let {storeState, data} = this.props;
        let body;

        switch(storeState) {
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                let dataItem = data[0];
                let moodObject = this.getMoodObject(dataItem);
                let mood = moodObject.tone_name;
                let moodScore = moodObject.score;
                body = <div>
                            <span style={{fontSize: "30px"}}>{mood}: {this.getFormattedMoodScore(moodScore)}%</span>
                            <br />
                            <br />
                            <Tweet tweet={dataItem.tweet} />
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
