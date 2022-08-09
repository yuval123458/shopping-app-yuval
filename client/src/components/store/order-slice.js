import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: null,
  token: null,
  loading: false,
  errors: null,
};

export const sendOrder = createAsyncThunk(
  "sendOrder",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "api/orders",
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    //  sendOrder

    [sendOrder.fulfilled]: (state, action) => {
      console.log("sendOrder fulfilled");
      state.order = action.payload.order;
      state.loading = false;
    },
    [sendOrder.pending]: (state, action) => {
      console.log("sendOrder pending");
      state.loading = true;
    },
    [sendOrder.rejected]: (state, action) => {
      console.log("sendOrder rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },
  },
});

export default orderSlice.reducer;
