import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (page, thunkAPI) => {
        try {
            const res = await axios.get("/products.json");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getProductByAsin = createAsyncThunk(
    "products/getProductByAsin",
    async (asin, thunkAPI) => {
        try {
            const resp = await axios.get("/products.json");
            const product = resp.data.products.find(prod => prod.asin === asin);
            return product;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);