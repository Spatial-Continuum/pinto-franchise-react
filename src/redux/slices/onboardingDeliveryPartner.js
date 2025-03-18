import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../globalImport";

export const getOnboardingData = createAsyncThunk(
  "api/getOnboardingData",
  async ({ status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/delivery-partner/onboard/list?onboarding=${status}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOnboardingStatus = createAsyncThunk(
  "api/getOnboardingStatus",
  async ({ status_type, partner_type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/delivery-partner/partner-status/?current_status=${status_type}&employment_type=${partner_type}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    onboardingSuccess: [],
    loading: false,
    onboardingCount: [],
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOnboardingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnboardingData.fulfilled, (state, action) => {
        console.log("Fetched data onboarding:", action.payload);
        state.loading = false;
        state.onboardingSuccess = action.payload;
      })
      .addCase(getOnboardingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOnboardingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnboardingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.onboardingCount = action.payload;
      })
      .addCase(getOnboardingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});
export const selectOnboardingSuccess = (state) =>
  state.onboardingApis.onboardingSuccess;
export const selectOnboardingCount = (status) =>
  status.onboarding.onboardingCount;
export default onboardingSlice.reducer;
