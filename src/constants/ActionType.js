import keyMirror from 'keymirror'

const ActionType = keyMirror({
    FETCH_DATA_REQUESTED: null,
    FETCH_DATA_FULFILLED: null,
    FETCH_DATA_FAILED: null,
    FETCH_NEWS_REQUESTED: null,
    FETCH_NEWS_FULFILLED: null,
    FETCH_NEWS_FAILED: null
});

export default ActionType