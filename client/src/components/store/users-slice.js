import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const autoSignIn = createAsyncThunk("autiSignIn", async (thunkAPI) => {
//   try {
//     const response = await axios.get(
//       process.env.REACT_APP_BACKEND_URL + "api/users",
//       {
//         headers: {
//           "x-auth-token": localStorage.getItem("token"),
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     const errors = error.response.data;
//     console.log(errors);

//     return thunkAPI.rejectWithValue(errors);
//   }
// });

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
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    autoSignIn(state, action) {
      console.log("autoSignUp");
      state.token = localStorage.getItem("token");
    },
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

    // //   get user with refreshed page

    // [autoSignIn.fulfilled]: (state, action) => {
    //   console.log("autoSignIn fulfilled");
    //   state.token = localStorage.getItem("token");
    //   state.loading = false;
    // },
    // [autoSignIn.pending]: (state, action) => {
    //   console.log("autoSignIn pending");
    //   state.loading = true;
    // },
    // [autoSignIn.rejected]: (state, action) => {
    //   console.log("autoSignIn rejected");
    //   state.token = null;
    //   state.loading = false;
    //   state.errors = action.payload;
    // },
  },
});

export default usersSlice.reducer;

export const Logout = usersSlice.actions.Logout;

export const autoSignIn = usersSlice.actions.autoSignIn;
