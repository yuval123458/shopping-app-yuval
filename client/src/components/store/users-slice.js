import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newsletterSignUp = createAsyncThunk(
  "newsletter",
  async (body, thunkAPI) => {
    try {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "api/users/newsletter",
        body,
        {
          headers: {
            "x-auth-token": thunkAPI.getState().users.token,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const autoSignIn = createAsyncThunk("autoSignIn", async (thunkAPI) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "api/users",
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const SignUp = createAsyncThunk("signup", async (body, thunkAPI) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "api/users",
      body
    );

    return response.data;
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);

    return thunkAPI.rejectWithValue(errors);
  }
});

export const SignIn = createAsyncThunk("signin", async (body, thunkAPI) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "api/users/sign-in",
      body
    );

    return response.data;
  } catch (error) {
    const errors = error.response.data;
    console.log(errors);

    return thunkAPI.rejectWithValue(errors);
  }
});

const initialState = {
  loading: false,
  token: null,
  errors: [],
  newsletter: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    Logout(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.errors = [];
      state.loading = false;
    },
  },
  extraReducers: {
    //   register new user

    [SignUp.fulfilled]: (state, action) => {
      console.log("SignUp fulfilled");
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
      state.loading = false;
    },
    [SignUp.pending]: (state, action) => {
      console.log("SignUp pending");
      state.loading = true;
    },
    [SignUp.rejected]: (state, action) => {
      console.log("SignUp rejected");
      state.token = null;
      state.loading = false;
      state.errors = action.payload;
    },

    //   Login user

    [SignIn.fulfilled]: (state, action) => {
      console.log("SignIn fulfilled");
      state.token = action.payload.token;
      console.log(state.token);
      localStorage.setItem("token", state.token);
      state.loading = false;
    },
    [SignIn.pending]: (state, action) => {
      console.log("SignIn pending");
      state.loading = true;
    },
    [SignIn.rejected]: (state, action) => {
      console.log("SignIn rejected");
      state.token = null;
      state.errors = action.payload;
      console.log(action.payload);
      state.loading = false;
    },

    //   autoSignIn

    [autoSignIn.fulfilled]: (state, action) => {
      console.log("autoSignIn fulfilled");
      state.token = localStorage.getItem("token");
      state.newsletter = action.payload;
      state.loading = false;
    },
    [autoSignIn.pending]: (state, action) => {
      console.log("autoSignIn pending");
      state.loading = true;
    },
    [autoSignIn.rejected]: (state, action) => {
      console.log("autoSignIn rejected");
      state.loading = false;
    },

    [newsletterSignUp.fulfilled]: (state, action) => {
      console.log("newsletterSignUp.fulfilled");
      state.newsletter = true;
    },
  },
});

export default usersSlice.reducer;

export const Logout = usersSlice.actions.Logout;
