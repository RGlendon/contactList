import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import contactsReducer from "./contactsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'


let reducers = combineReducers({
    contactsPage: contactsReducer,
    auth: authReducer,
    form: formReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;
export default store;
