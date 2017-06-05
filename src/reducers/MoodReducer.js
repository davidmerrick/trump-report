import StoreState from "../constants/StoreState";
import ActionType from "../constants/ActionType";

const initialState = {
    storeState: StoreState.EMPTY,
    tweet: null,
    mood: null,
    moodScore: null,
    error: null
};

const MoodReducer = (state = initialState, action) => {
    let newState = {...state};
    let actionType = action.type;
    switch(actionType) {
        case ActionType.FETCH_MOOD_FULFILLED:
            newState.storeState = StoreState.READY;
            newState.tweet = action.payload.tweet;
            newState.mood = action.payload.mood;
            newState.moodScore = action.payload.moodScore;
            break;
    }
    return newState;
};

export default MoodReducer