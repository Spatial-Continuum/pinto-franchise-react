import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../globalImport.js';

// Async thunk for posting a new restaurant
export const postNewRestaurant = createAsyncThunk(
  'restaurant/postNewRestaurant',
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/restaurant/merchant`, dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);







// Slice name
const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurantData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(postNewRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postNewRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantData = action.payload;
      })
      .addCase(postNewRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectRestaurantData = (state) => state.restaurant.restaurantData;
export const selectRestaurantLoading = (state) => state.restaurant.loading;
export const selectRestaurantError = (state) => state.restaurant.error;


export default restaurantSlice.reducer;
