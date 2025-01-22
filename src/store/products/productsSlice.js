import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductByAsin } from "./productsOperations";

const handlePending = (state) => {
    state.products = [];
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, handlePending)
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload.products;
            })
            .addCase(getProducts.rejected, handleRejected)
            .addCase(getProductByAsin.pending, handlePending)
            .addCase(getProductByAsin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.product = action.payload;
            })
            .addCase(getProductByAsin.rejected, handleRejected);
    },
});

export const productsReducer = productsSlice.reducer;