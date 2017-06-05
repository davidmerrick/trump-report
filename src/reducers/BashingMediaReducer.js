import ClassifierState from "../constants/ClassifierState";
import ActionType from "../constants/ActionType";
import StoreState from '../constants/StoreState'

const initialState = {
    classifierState: ClassifierState.NOT_SUBMITTED,
    errorMessage: null,
    classifier: null,
    storeState: StoreState.EMPTY
};

const BashingMediaReducer = (state = initialState, action) => {
    let newState = {...state};
    let actionType = action.type;
    switch(actionType) {
        case ActionType.CLASSIFIER_SUBMIT_FULFILLED:
            newState.classifierState = ClassifierState.SUBMITTED;
            break;
        case ActionType.FETCH_BASHING_MEDIA_TWEET_FULFILLED:
            let {tweet} = action.payload;
            newState.tweet = tweet;
            newState.storeState = StoreState.READY;
            break;
        case ActionType.FETCH_BASHING_MEDIA_TWEET_FAILED:
            let {error} = action.payload;
            newState.error = error;
            break;
    }
    return newState;
};

export default BashingMediaReducer