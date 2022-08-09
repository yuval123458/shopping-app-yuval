import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "addToCart",
  async (body, thunkAPI) => {
    console.log(body);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "api/cart",
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);

      const errors = error.response.data.errors;

      return thunkAPI.rejectWithValue(errors);
    }
  }
);

export const getCart = createAsyncThunk("getCart", async (thunkAPI) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "api/cart",
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue(error);
  }
});

export const addToWishList = createAsyncThunk(
  "addToWishList",
  async (pId, thunkAPI) => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "api/cart",
        { pId },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const DeleteFromCart = createAsyncThunk(
  "DeleteFromCart",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `api/cart/${productId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cart: [],
  wishList: [],
  length: 0,
  errors: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state, action) {
      state.cart = null;
      state.errors = null;
      state.loading = false;
      state.wishList = [];
    },
  },

  extraReducers: {
    //  addToCart

    [addToCart.fulfilled]: (state, action) => {
      console.log("addToCart fulfilled");
      state.cart = action.payload;
      console.log(state.cart);
      state.loading = false;
    },
    [addToCart.pending]: (state, action) => {
      console.log("addToCart pending");
      state.loading = true;
    },
    [addToCart.rejected]: (state, action) => {
      console.log("addToCart rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //  getCart

    [getCart.fulfilled]: (state, action) => {
      console.log("getCart fulfilled");
      state.cart = action.payload.cart;
      state.wishList = action.payload.cart.wishlist;
      state.length = state.cart.products.length;
      state.loading = false;
    },
    [getCart.pending]: (state, action) => {
      console.log("getCart pending");
      state.loading = true;
    },
    [getCart.rejected]: (state, action) => {
      console.log("getCart rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //  addToWishList

    [addToWishList.fulfilled]: (state, action) => {
      console.log("addToWishList fulfilled");
      state.wishlist = action.payload;
      state.loading = false;
    },
    [addToWishList.pending]: (state, action) => {
      console.log("addToWishList pending");
    },
    [addToWishList.rejected]: (state, action) => {
      console.log("addToWishList rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //  DeleteFromCart

    [DeleteFromCart.fulfilled]: (state, action) => {
      console.log("DeleteFromCart fulfilled");
      state.cart = action.payload.cart;
      console.log(state.cart);
      state.loading = false;
    },
    [DeleteFromCart.pending]: (state, action) => {
      console.log("DeleteFromCart pending");
    },
    [DeleteFromCart.rejected]: (state, action) => {
      console.log("DeleteFromCart rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },
  },
});

export default cartSlice.reducer;
export const clearCart = cartSlice.actions.clearCart;
