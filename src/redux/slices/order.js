import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../globalImport";

export const getManageOrder = createAsyncThunk(
  "api/getManageOrder",
  async (_, { rejectWithValue }) => {
    try {
      const resposne = await axios.get(`${API_URL}/order/list-order`);
      return resposne.data;
    } catch (error) {
      return rejectWithValue(error.resposne?.data || error.message);
    }
  }
);

export const getPresentOrder = createAsyncThunk(
  "api/getPresentOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/order/present-day-order`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const manageOrderSlice = createSlice({
  name: "manageorder",
  initialState: {
    manageOrder: [],
    presentOrder: [],
    loading: false,
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManageOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManageOrder.fulfilled, (state, action) => {
        console.log("Fetched data onboarding:", action.payload);
        state.loading = false;
        state.manageOrder = action.payload;
      })
      .addCase(getManageOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPresentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresentOrder.fulfilled, (state, action) => {
        console.log("Fetched data onboarding78777:", action.payload);
        state.loading = false;
        state.presentOrder = action.payload;
      })
      .addCase(getPresentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectManageOrder = (state) => state.manageOrderApis.manageOrder;
export const selectPresentOrder = (state) => state.manageOrderApis.presentOrder;
export default manageOrderSlice.reducer;
