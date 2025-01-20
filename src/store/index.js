import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from 'redux-thunk';
import { productsReducer } from "./products/productsReducer";

const rootReducer = combineReducers({
    products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
