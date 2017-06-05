import StoreState from "../constants/StoreState";
import ActionType from "../constants/ActionType";

const initialState = {
    storeState: StoreState.EMPTY,
    articles: null,
    error: null
};

const NewsReducer = (state = initialState, action) => {
    let newState = {...state};
    let actionType = action.type;
    switch(actionType) {
        case ActionType.FETCH_NEWS_FULFILLED:
            newState.storeState = StoreState.READY;
            newState.articles = action.payload.articles;
            break;
        case ActionType.FETCH_NEWS_FAILED:
            newState.storeState = StoreState.ERROR;
            break;
    }
    return newState;
};

export default NewsReducer