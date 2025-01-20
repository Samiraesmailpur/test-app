const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS_PENDING":
            return { ...state, loading: true, error: null };
        case "FETCH_PRODUCTS_FULFILLED":
            return { ...state, loading: false, products: action.payload };
        case "FETCH_PRODUCT_FULFILLED":
            return { ...state, loading: false, product: action.payload };
        case "FETCH_PRODUCTS_REJECTED":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
