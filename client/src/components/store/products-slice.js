import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProductsBySeason = createAsyncThunk(
  "GetProductsBySeason",
  async (season, thunkAPI) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `api/products/${season}`
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetPopularProducts = createAsyncThunk(
  "GetPopularProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "api/products/popular/true"
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetProductById = createAsyncThunk(
  "GetProductById",
  async (pId, thunkAPI) => {
    console.log(pId);
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `api/products/product/${pId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  product: null,
  products: [],
  errors: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    //  GetProductsBySeason

    [GetProductsBySeason.fulfilled]: (state, action) => {
      console.log("GetProductsBySeason fulfilled");
      state.products = action.payload.map((prod) => prod);
      state.loading = false;
    },
    [GetProductsBySeason.pending]: (state, action) => {
      console.log("GetProductsBySeason pending");
      state.loading = true;
    },
    [GetProductsBySeason.rejected]: (state, action) => {
      console.log("GetProductsBySeason rejected");
      state.loading = false;
      state.errors = action.payload;
    },

    //  GetProductById

    [GetProductById.fulfilled]: (state, action) => {
      console.log("GetProductById fulfilled");
      state.product = action.payload;
      console.log(state.product);
      state.loading = false;
    },
    [GetProductById.pending]: (state, action) => {
      console.log("GetProductById pending");
      state.loading = true;
    },
    [GetProductById.rejected]: (state, action) => {
      console.log("GetProductById rejected");
      state.loading = false;
      state.errors = action.payload;
    },

    //  GetPopularProducts

    [GetPopularProducts.fulfilled]: (state, action) => {
      console.log("GetPopularProducts fulfilled");
      state.products = action.payload;
      state.loading = false;
    },
    [GetPopularProducts.pending]: (state, action) => {
      console.log("GetPopularProducts pending");
      state.loading = true;
    },
    [GetPopularProducts.rejected]: (state, action) => {
      console.log("GetPopularProducts rejected");
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default productsSlice.reducer;
