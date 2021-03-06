'use strict'

import React from "react";
import {Panel, ProgressBar} from "react-bootstrap";
import StoreState from "../constants/StoreState";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        storeState: state.DataReducer.storeState,
        errorMessage: state.DataReducer.errorMessage,
        data: state.DataReducer.data
    };
}

@connect(mapStateToProps)

class MoodGraphWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    mapColorToMood(toneId){
        switch(toneId){
            case "anger":
                return "danger";
                break;
            case "disgust":
                return "success";
                break;
            case "fear":
                return "warning";
                break;
            case "joy":
                return "info";
                break;
            case "sadness":
                return "primary";
                break;
        }
    }

    getGraphJsx(score, tone_name, tone_id){
        let bsStyle = this.mapColorToMood(tone_id);
        let scorePercent = score * 100;
        let label = scorePercent.toFixed(0) + "%";
        const MIN_SCORE_LABEL_THRESHOLD = 5;
        if(scorePercent < MIN_SCORE_LABEL_THRESHOLD){
            return <div>{tone_name}: <ProgressBar now={scorePercent} bsStyle={bsStyle} /></div>;
        }
        return <div>{tone_name}: <ProgressBar now={scorePercent} label={label} bsStyle={bsStyle} /></div>;
    }

    render(){
        let title = "Mood Graph";

        let {storeState, data} = this.props;
        let body;

        switch(storeState) {
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                let dataItem = data[0];
                let tones = dataItem.mood.document_tone.tone_categories[0].tones;
                let graphs = [];
                tones.forEach(toneObject => {
                    let {score, tone_name, tone_id} = toneObject;
                    let graph = this.getGraphJsx(score, tone_name, tone_id);
                    graphs.push(graph);
                });
                body = <div>
                            {graphs}
                       </div>;
                break;
            default:
                body = "Error: widget failed to load.";
                break;
        };
        return (
            <Panel header={title} bsStyle="primary">
                {body}
            </Panel>
        );
    }
}

export default MoodGraphWidget
