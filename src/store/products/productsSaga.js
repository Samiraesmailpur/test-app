import { call, put, takeEvery } from "redux-saga/effects";
import {
    fetchProductsPending,
    fetchProductsFulfilled,
    fetchProductFulfilled,
    fetchProductsRejected,
} from "./productsActions";

async function fetchProductsApi() {
    const response = await fetch("/products.json")
    const products = await response.json();
    return products;

}

function* fetchProductsSaga() {
    yield put(fetchProductsPending());
    try {
        const data = yield call(fetchProductsApi);
        yield put(fetchProductsFulfilled(data.products));
    } catch (error) {
        yield put(fetchProductsRejected(error.message));
    }
}

function* fetchProductByAsinSaga(action) {
    yield put(fetchProductsPending());
    try {
        const data = yield call(fetchProductsApi);
        const product = data.products.find((product) => product.asin === action.payload);
        if (!product) {
            throw new Error("Product not found");
        }
        yield put(fetchProductFulfilled(product));
    } catch (error) {
        yield put(fetchProductsRejected(error.message));
    }
}

export default function* productsSaga() {
    yield takeEvery("PRODUCTS_FETCH_REQUESTED", fetchProductsSaga);
    yield takeEvery("PRODUCT_FETCH_REQUESTED", fetchProductByAsinSaga);
}
