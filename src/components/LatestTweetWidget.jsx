'use strict'

import React from "react";
import {Panel} from "react-bootstrap";
import Tweet from "./Tweet.jsx";
import StoreState from "../constants/StoreState";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        storeState: state.TweetsReducer.storeState,
        errorMessage: state.TweetsReducer.errorMessage,
        tweets: state.TweetsReducer.tweets
    };
}

@connect(mapStateToProps)

class LatestTweet extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        let title = "Latest Tweet";
        let {tweets, storeState} = this.props;
        let body;

        switch(storeState){
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                if (!tweets || tweets.length === 0) {
                    body = "Sorry, no Tweets found.";
                } else {
                    let tweet = tweets[0];
                    body = <Tweet tweet={tweet}/>
                }
                break;
        };
        return (
            <Panel header={title} bsStyle="primary">
                {body}
            </Panel>
        );
    }
}

LatestTweet.defaultProps = {
    tweets: null,
    storeState: StoreState.EMPTY
};

export default LatestTweet
