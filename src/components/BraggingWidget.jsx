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

    getMaxConfidenceScore(moodItem){
        let maxConfidenceScore = 0;
        if(moodItem.sentences_tone){
            moodItem.sentences_tone.forEach(sentence => {
                if(sentence.tone_categories.length === 0){
                    return;
                }
                let languageTones = sentence.tone_categories.find(category => category.category_id === "language_tone").tones;
                let confidenceScore = languageTones.find(item => item.tone_id="confident").score;
                if(confidenceScore > maxConfidenceScore){
                    maxConfidenceScore = confidenceScore;
                };
            });
        } else {
            let languageTones = moodItem.document_tone.tone_categories.find(category => category.category_id === "language_tone").tones;
            maxConfidenceScore = languageTones.find(item => item.tone_id="confident").score;
        }
        return maxConfidenceScore;
    }

    getMaxSentimentScore(classificationItem){
        // Todo: this could be made much more accurate if I could get results for each sentence.
        return classificationItem.sentiment.document.score;
    }

    getBraggingTweet(){
        let {data} = this.props;
        let found = data.find(item => {
            const CONFIDENCE_THRESHOLD = .9;
            let mood = item.mood;
            let maxConfidenceScore = this.getMaxConfidenceScore(mood);
            let classification = item.classification;
            let maxSentimentScore = this.getMaxSentimentScore(classification);

            // Bragging tweets are likely to be confident and on the positive side of the sentiment spectrum
            return maxConfidenceScore > CONFIDENCE_THRESHOLD && maxSentimentScore > 0;
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
