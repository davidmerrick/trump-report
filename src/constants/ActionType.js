import keyMirror from 'keymirror'

const ActionType = keyMirror({
    FETCH_TWEETS_REQUESTED: null,
    FETCH_TWEETS_FULFILLED: null,
    FETCH_TWEETS_FAILED: null,
    FETCH_NEWS_REQUESTED: null,
    FETCH_NEWS_FULFILLED: null,
    FETCH_NEWS_FAILED: null,
    FETCH_BASHING_MEDIA_TWEET_REQUESTED: null,
    FETCH_BASHING_MEDIA_TWEET_FULFILLED: null,
    FETCH_BASHING_MEDIA_TWEET_FAILED: null,
    FETCH_MOOD_FULFILLED: null,
    FETCH_MOOD_FAILED: null
});

export default ActionType