import StoreState from "../constants/StoreState";
import ActionType from "../constants/ActionType";

const initialState = {
    storeState: StoreState.EMPTY,
    data: null,
    error: null
};

const TweetsReducer = (state = initialState, action) => {
    let newState = {...state};
    let actionType = action.type;
    switch(actionType) {
        case ActionType.FETCH_DATA_FAILED:
            newState.errorMessage = action.payload.errorMessage;
            newState.storeState = StoreState.ERROR;
            break;
        case ActionType.FETCH_DATA_FULFILLED:
            newState.storeState = StoreState.READY;
            newState.data = action.payload.data;
            break;
    }
    return newState;
};

export default TweetsReducer