import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchCategoryApi = createAsyncThunk('api/fetchFirstApi', async ( _,{ rejectWithValue }) => { 
  console.log("asdfasdfasdf",`${API_URL}/menu/category`)
    try {
      const response = await axios.get(`${API_URL}/menu/category`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  });

  export const fetchQuickFilterApi = createAsyncThunk('api/fetchQuickFilter', async ( _,{ rejectWithValue }) => { 
  
      try {
        const response = await axios.get(`${API_URL}/menu/quick_filters`); // Replace with your first API URL
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    });

    export const fetchCitySpotApi = createAsyncThunk('api/fetchCitySpot', async ( _,{ rejectWithValue }) => { 
  
      try {
        const response = await axios.get(`${API_URL}/menu/cityspotlights`); // Replace with your first API URL
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    });
    export const fetchPopularDishApi = createAsyncThunk('api/fetchPopularDish', async ( _,{ rejectWithValue }) => { 
  
      try {
        const response = await axios.get(`${API_URL}/menu/cityspotlights`); // Replace with your first API URL
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }); 


  const menuSlice = createSlice({
    name: 'api',
    initialState: {
      fetchCategoryApi: [],
      fetchQuickFilter:[],
      fetchSpotCity:[],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // First API
        .addCase(fetchCategoryApi.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategoryApi.fulfilled, (state, action) => { 
          console.log('Fetched data:', action.payload);
          state.loading = false;
          state.fetchCategoryApi = action.payload;
        })
        .addCase(fetchCategoryApi.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchQuickFilterApi.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuickFilterApi.fulfilled, (state, action) => { 
          console.log('Fetched data:', action.payload);
          state.loading = false;
          state.fetchQuickFilter = action.payload;
        })
        .addCase(fetchQuickFilterApi.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchCitySpotApi.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCitySpotApi.fulfilled, (state, action) => { 
          console.log('Fetched data:', action.payload);
          state.loading = false;
          state.fetchSpotCity = action.payload;
        })
        .addCase(fetchCitySpotApi.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        
    },
  });
  
  export const selectCategoryApiData = (state) => state.menu.fetchCategoryApi; 
  export const selectQuickFilterApiData = (state) => state.menu.fetchQuickFilter;
  export const selectCitySpotData = (state)=> state.menu.fetchSpotCity;
  export const selectApiLoading = (state) => state.menu.loading;
  export const selectApiError = (state) => state.menu.error;
  
  export default menuSlice.reducer;

