export const fetchProductsPending = () => ({
    type: "FETCH_PRODUCTS_PENDING",
});

export const fetchProductsFulfilled = (products) => ({
    type: "FETCH_PRODUCTS_FULFILLED",
    payload: products,
});

export const fetchProductFulfilled = (product) => ({
    type: "FETCH_PRODUCT_FULFILLED",
    payload: product,
});

export const fetchProductsRejected = (error) => ({
    type: "FETCH_PRODUCTS_REJECTED",
    payload: error,
});

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsPending());
        try {
            const response = await fetch("/products.json");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            dispatch(fetchProductsFulfilled(data.products));
        } catch (error) {
            dispatch(fetchProductsRejected(error.message));
        }
    };
};


export const fetchProductByAsin = (asin) => {
    return async (dispatch) => {
        dispatch(fetchProductsPending());
        try {
            const response = await fetch("/products.json");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            const product = data.products.find(product => product.asin === asin);
            dispatch(fetchProductFulfilled(product));
        } catch (error) {
            dispatch(fetchProductsRejected(error.message));
        }
    };
};

