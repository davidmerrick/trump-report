'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import StoreState from "../constants/StoreState";
import {connect} from "react-redux";
import PoweredByLink from "./PoweredByLink.jsx";

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
                            Primary mood of latest Tweet:
                            <br />
                            <span style={{fontSize: "30px"}}>{mood}: {this.getFormattedMoodScore(moodScore)}%</span>
                        </div>;
                break;
            default:
                body = "Error: widget failed to load.";
                break;
        };
        return (
            <Panel header={title} bsStyle="primary">
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
