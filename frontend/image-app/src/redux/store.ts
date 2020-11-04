import { combineReducers, createStore } from "redux";
import { dialogReducer } from "./imageDialog";
import { userReducer } from "./user";

const reducers = combineReducers({
    user: userReducer,
    imageDialog: dialogReducer
});

export const store = createStore(reducers);