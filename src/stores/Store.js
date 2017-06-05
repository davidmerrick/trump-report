import BashingMediaReducer from "../reducers/BashingMediaReducer";
import MoodReducer from "../reducers/MoodReducer";
import NewsReducer from "../reducers/NewsReducer";
import TweetsReducer from "../reducers/TweetsReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/Sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
    BashingMediaReducer,
    TweetsReducer,
    MoodReducer,
    NewsReducer
});
const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default Store

