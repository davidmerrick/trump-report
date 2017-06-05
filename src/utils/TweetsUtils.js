import Endpoints from '../constants/Endpoints'

class TweetsUtils {

    static fetchTweets(){
        return fetch(Endpoints.TWEETS).then(response => response.json());
    }

    static filterOutRetweets(tweets){
        return tweets.filter(tweet => !tweet.retweeted_status);
    }
}

export default TweetsUtils