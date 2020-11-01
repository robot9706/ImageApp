import { combineReducers, createStore } from "redux";
import { userReducer } from "./user";

const reducers = combineReducers({
    user: userReducer
});

export const store = createStore(reducers);