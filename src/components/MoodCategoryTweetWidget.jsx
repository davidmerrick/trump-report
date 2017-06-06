'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import Tweet from "./Tweet.jsx";
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

class MoodCategoryTweetWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    getFormattedMoodScore(moodScore){
        return (moodScore * 100).toFixed(2);
    }

    getDataItem(){
        let {data, mood} = this.props;
        let moodId = mood.toLowerCase();
        let sorted = data.sort((a,b) => {
            let aMoodObject = this.getMoodObject(a);
            let bMoodObject = this.getMoodObject(b);
            return bMoodObject.score - aMoodObject.score;
        });

        return sorted[0];
    }

    getMoodObject(dataItem){
        let {mood} = this.props;
        let moodId = mood.toLowerCase();
        let moodObject = dataItem.mood.document_tone.tone_categories[0].tones.find(item => item.tone_id === moodId);
        return moodObject;
    }

    render(){
        let {storeState, mood} = this.props;
        let title = mood;

        let body;

        switch(storeState) {
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                let dataItem = this.getDataItem();
                let moodObject = this.getMoodObject(dataItem);
                body = <div>
                            {mood}: {this.getFormattedMoodScore(moodObject.score)}%
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
            <Panel header={title} bsStyle="primary">
                {body}
            </Panel>
        );
    }
}

MoodCategoryTweetWidget.defaultProps = {
    mood: "Anger"
}

export default MoodCategoryTweetWidget
