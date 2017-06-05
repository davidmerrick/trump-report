import StoreState from "../constants/StoreState";
import ActionType from "../constants/ActionType";

const initialState = {
    storeState: StoreState.EMPTY,
    tweets: null,
    error: null
};

const TweetsReducer = (state = initialState, action) => {
    let newState = {...state};
    let actionType = action.type;
    switch(actionType) {
        case ActionType.FETCH_TWEETS_FAILED:
            newState.errorMessage = action.payload.errorMessage;
            newState.storeState = StoreState.ERROR;
            break;
        case ActionType.FETCH_TWEETS_FULFILLED:
            newState.storeState = StoreState.READY;
            newState.tweets = action.payload.tweets;
            break;
    }
    return newState;
};

export default TweetsReducer