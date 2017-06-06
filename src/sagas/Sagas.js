import ActionType from '../constants/ActionType'
import { call, put, takeEvery } from 'redux-saga/effects'
import TweetsUtils from '../utils/TweetsUtils'
import ClassifierUtils from '../utils/ClassifierUtils'
import regeneratorRuntime from 'regenerator-runtime' // Important! This needs to be imported here for Babel to transpile correctly.
import Classifiers from '../constants/Classifiers'
import NewsUtils from '../utils/NewsUtils'
import MoodUtils from '../utils/MoodUtils'

function* fetchData() {
    try {
        const data = yield call(TweetsUtils.fetchData);
        let payload = {
            data: data
        };
        yield put({type: ActionType.FETCH_DATA_FULFILLED, payload: payload});
    } catch(err) {
        let payload = {
            errorMessage: err.message
        };
        yield put({type: ActionType.FETCH_DATA_FAILED, payload: payload});
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

function* mySaga() {
    yield takeEvery(ActionType.FETCH_DATA_REQUESTED, fetchData);
    yield takeEvery(ActionType.FETCH_NEWS_REQUESTED, fetchNews);
}

export default mySaga;