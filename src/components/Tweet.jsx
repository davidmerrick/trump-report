'use strict'

import React from 'react'
import moment from 'moment'

class Tweet extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        let tweet = this.props.tweet;
        let tweetText = tweet.text;
        let tweetDate = moment(tweet.created_at).fromNow();
        let tweetUrl = `https://twitter.com/realDonaldTrump/status/${tweet.id_str}`;
        return(
            <div>
                {tweetText}
                <br />
                <a href={tweetUrl} target="_blank">{tweetDate}</a>
            </div>
        );
    }
}

export default Tweet