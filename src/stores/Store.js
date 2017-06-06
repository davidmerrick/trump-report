import NewsReducer from "../reducers/NewsReducer";
import DataReducer from "../reducers/DataReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/Sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
    DataReducer,
    NewsReducer
});
const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default Store

