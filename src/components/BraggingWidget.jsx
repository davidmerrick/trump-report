'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import StoreState from "../constants/StoreState";
import Tweet from "./Tweet.jsx";
import {connect} from "react-redux";
import PanelInfoHeader from "./PanelInfoHeader.jsx";

function mapStateToProps(state) {
    return {
        storeState: state.DataReducer.storeState,
        errorMessage: state.DataReducer.errorMessage,
        data: state.DataReducer.data
    };
}

@connect(mapStateToProps)

class BraggingWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    getBraggingTweet(){
        let {data} = this.props;
        let found = data.find(item => {
            let threshold = .9;
            let mood = item.mood;
            let maxConfidenceScore = 0;
            let maxExtraversionScore = 0;
            if(mood.sentences_tone){
                mood.sentences_tone.forEach(sentence => {
                    let languageTones = sentence.tone_categories.find(category => category.category_id === "language_tone").tones;
                    let confidenceScore = languageTones.find(item => item.tone_id="confident").score;
                    if(confidenceScore > maxConfidenceScore){
                        maxConfidenceScore = confidenceScore;
                    };
                    let socialTones = sentence.tone_categories.find(category => category.category_id === "social_tone").tones;
                    let extraversionScore = socialTones.find(item => item.tone_id="extraversion_big5").score;
                    if(extraversionScore > maxExtraversionScore){
                        maxExtraversionScore = extraversionScore;
                    };
                });
            } else {
                let languageTones = item.mood.document_tone.tone_categories.find(category => category.category_id === "language_tone").tones;
                maxConfidenceScore = languageTones.find(item => item.tone_id="confident").score;
                let socialTones = item.mood.document_tone.tone_categories.find(category => category.category_id === "social_tone").tones;
                maxExtraversionScore = socialTones.find(item => item.tone_id="extraversion_big5").score;
            }

            return maxConfidenceScore > threshold && maxExtraversionScore > threshold;
        });

        if(found){
            return found.tweet;
        }
        return null;
    }

    getBody(){
        let tweet = this.getBraggingTweet();
        let body;
        if(!tweet){
            body = <div>
                No recent Tweets found containing bragging.
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
                "and find the first one that's likely to be bragging.";
        let panelInfoHeader = <PanelInfoHeader tooltipText={tooltipText} title="Bragging" />

        return(
            <Panel header={panelInfoHeader} bsStyle="primary">
                {body}
            </Panel>
        );
    }
}

export default BraggingWidget
