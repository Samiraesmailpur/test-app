const fetchProductsPending = () => ({
    type: "FETCH_PRODUCTS_PENDING",
});

const fetchProductsFulfilled = (products) => ({
    type: "FETCH_PRODUCTS_FULFILLED",
    payload: products,
});

const fetchProductFulfilled = (product) => ({
    type: "FETCH_PRODUCT_FULFILLED",
    payload: product,
});

const fetchProductsRejected = (error) => ({
    type: "FETCH_PRODUCTS_REJECTED",
    payload: error,
});

export {fetchProductsPending, fetchProductsFulfilled, fetchProductsRejected, fetchProductFulfilled};





