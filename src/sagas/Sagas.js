import ActionType from '../constants/ActionType'
import { call, put, takeEvery } from 'redux-saga/effects'
import TweetsUtils from '../utils/TweetsUtils'
import ClassifierUtils from '../utils/ClassifierUtils'
import regeneratorRuntime from 'regenerator-runtime' // Important! This needs to be imported here for Babel to transpile correctly.
import Classifiers from '../constants/Classifiers'
import NewsUtils from '../utils/NewsUtils'
import MoodUtils from '../utils/MoodUtils'

function* fetchTweets() {
    try {
        const tweets = yield call(TweetsUtils.fetchTweets);
        let payload = {
            tweets: tweets
        };
        yield put({type: ActionType.FETCH_TWEETS_FULFILLED, payload: payload});
    } catch(err) {
        let payload = {
            errorMessage: err.message
        };
        yield put({type: ActionType.FETCH_TWEETS_FAILED, payload: payload});
    }
}

function* fetchNews() {
    try {
        const articles = yield call(NewsUtils.fetchNews);
        let payload = {
            articles: articles
        };
        yield put({type: ActionType.FETCH_NEWS_FULFILLED, payload: payload});
    } catch(err) {
        let payload = {
            errorMessage: err.message
        };
        yield put({type: ActionType.FETCH_NEWS_FAILED, payload: payload});
    }
}

function* fetchMood(action) {
    try {
        let tweets = action.payload.tweets;
        let filtered = TweetsUtils.filterOutRetweets(tweets);
        let tweet = filtered[0];
        const response = yield call(MoodUtils.fetchMood, tweet.text);

        let payload = {
            mood: response.name,
            moodScore: response.score,
            tweet: tweet
        };
        yield put({type: ActionType.FETCH_MOOD_FULFILLED, payload: payload});
    } catch(err) {
        let payload = {
            errorMessage: err.message
        };
        yield put({type: ActionType.FETCH_MOOD_FAILED, payload: payload});
    }
}

function* fetchBashingMediaTweet() {
    try {
        let category = "news";
        let sentimentLabel = "negative";
        const tweet = yield call(ClassifierUtils.getClassifiedTweet, category, sentimentLabel);
        let payload = {
            tweet: tweet
        };
        yield put({type: ActionType.FETCH_BASHING_MEDIA_TWEET_FULFILLED, payload: payload});
    } catch(err) {
        let payload = {
            errorMessage: err.message
        };
        yield put({type: ActionType.FETCH_BASHING_MEDIA_TWEET_FAILED, payload: payload});
    }
}



function* mySaga() {
    yield takeEvery(ActionType.FETCH_TWEETS_REQUESTED, fetchTweets);
    yield takeEvery(ActionType.FETCH_BASHING_MEDIA_TWEET_REQUESTED, fetchBashingMediaTweet);
    yield takeEvery(ActionType.FETCH_TWEETS_FULFILLED, fetchMood);
    yield takeEvery(ActionType.FETCH_NEWS_REQUESTED, fetchNews);
}

export default mySaga;