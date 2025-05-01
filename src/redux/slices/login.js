import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../globalImport";

export const getLoginAdmin = createAsyncThunk(
  "login/getLoginAdmin",
  async (userdetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/franchises/login`,
        userdetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const GenerateOtp = createAsyncThunk(
  "login/GenerateOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/franchises/generate-otp`,
        phone,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("askdfjlwke", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const SetNewPassword = createAsyncThunk(
  "login/SetNewPassword",
  async (newpassword, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/franchises/reset-password`,
        newpassword,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginDetails: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginDetails = action.payload;
      })
      .addCase(getLoginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetLogin } = loginSlice.actions;
export const selectLoginDetails = (state) => state.login.loginDetails;
export default loginSlice.reducer;
