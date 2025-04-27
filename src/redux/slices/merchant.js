import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchMerchantSearchApi = createAsyncThunk(
  "api/fetchMerchantsearch",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/search`,
        {
          params: { name },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAllRestaurantPending = createAsyncThunk(
  "restaurant/getAllRestaurantPendeing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/restaurant/merchant/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchMerchantListOnboarding = createAsyncThunk(
  "api/fetchMerchnatListOnboarding",
  async ({ onboarding }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/restaurant/merchant/list`, {
        params: { onboarding },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    merchantData: [],
    successMerchantData: [],
    allRestaurantPending: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchantSearchApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchantSearchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.merchantData = action.payload;
      })
      .addCase(fetchMerchantSearchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMerchantListOnboarding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchantListOnboarding.fulfilled, (state, action) => {
        state.loading = false;
        state.successMerchantData = action.payload;
      })
      .addCase(fetchMerchantListOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllRestaurantPending.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantPending.fulfilled, (state, action) => {
        state.loading = false;
        state.allRestaurantPending = action.payload;
      })
      .addCase(getAllRestaurantPending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectMerchantData = (state) => state.merchant.merchantData;
export const selectMerchantListOnboarding = (state) =>
  state.merchant.successMerchantData;
export const selectAllRestaurantsPending = (state) =>
  state.merchant.allRestaurantPending;
export const selectMerchantLoading = (state) => state.merchant.loading;
export const selectMerchantError = (state) => state.merchant.error;

export default merchantSlice.reducer;
