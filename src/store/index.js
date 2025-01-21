import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { productsReducer } from "./products/productsReducer";
import productsSaga from "./products/productsSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Запуск саги
sagaMiddleware.run(productsSaga);

export default store;
