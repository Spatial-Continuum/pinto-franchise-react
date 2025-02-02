import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCategoryApi = createAsyncThunk(
  "api/fetchFirstApi",
  async (_, { rejectWithValue }) => {
    console.log("asdfasdfasdf", `${API_URL}/menu/category`);
    try {
      const response = await axios.get(`${API_URL}/menu/category`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchQuickFilterApi = createAsyncThunk(
  "api/fetchQuickFilter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/quick_filters`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCitySpotApi = createAsyncThunk(
  "api/fetchCitySpot",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/cityspotlights`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchPopularDishApi = createAsyncThunk(
  "api/fetchPopularDish",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/cityspotlights`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchCuisineApi = createAsyncThunk(
  "api/fetchCuisine",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/cuisine`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchCuisineAllApi = createAsyncThunk(
  "api/fetchCuisineAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/cuisines/nested`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchSubCategoryApi = createAsyncThunk(
  "api/fetchSubCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menu/subcategory`); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchTopBrandApi = createAsyncThunk(
  "api/fetchTopBrand",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/toprestaurants`
      ); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchAuthenticateApi = createAsyncThunk(
  "api/fetchAuthenticate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/authentic-restaurants`
      ); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchQuickRestaurantApi = createAsyncThunk(
  "api/fetchQuickRestaurant",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/menu/quickfilterrestaurant`
      ); // Replace with your first API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const menuSlice = createSlice({
  name: "api",
  initialState: {
    fetchCategoryApi: [],
    fetchQuickFilter: [],
    fetchSpotCity: [],
    fetchCuisine: [],
    fetchCuisineAll: [],
    fetchSubCategory: [],
    fetchTopBrand: [],
    fetchAuthenticate: [],
    loading: false,
    error: null,
    fetchQuickRestaturant: [],
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
        console.log("Fetched data:", action.payload);
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
        console.log("Fetched data:", action.payload);
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
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchSpotCity = action.payload;
      })
      .addCase(fetchCitySpotApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCuisineApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCuisineApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchCuisine = action.payload;
      })
      .addCase(fetchCuisineApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCuisineAllApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCuisineAllApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchCuisineAll = action.payload;
      })
      .addCase(fetchCuisineAllApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubCategoryApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoryApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchSubCategory = action.payload;
      })
      .addCase(fetchSubCategoryApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTopBrandApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopBrandApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchTopBrand = action.payload;
      })
      .addCase(fetchTopBrandApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthenticateApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthenticateApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchAuthenticate = action.payload;
      })
      .addCase(fetchAuthenticateApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuickRestaurantApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickRestaurantApi.fulfilled, (state, action) => {
        console.log("Fetched data:", action.payload);
        state.loading = false;
        state.fetchQuickRestaturant = action.payload;
      })
      .addCase(fetchQuickRestaurantApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCategoryApiData = (state) => state.menu.fetchCategoryApi;
export const selectQuickFilterApiData = (state) => state.menu.fetchQuickFilter;
export const selectCitySpotData = (state) => state.menu.fetchSpotCity;
export const selectCuisine = (state) => state.menu.fetchCuisine;
export const selectCuisineAll = (state) => state.menu.fetchCuisineAll;
export const selectSubCategory = (state) => state.menu.fetchSubCategory;
export const selectTopBrand = (state) => state.menu.fetchTopBrand;
export const selectApiLoading = (state) => state.menu.loading;
export const selectApiError = (state) => state.menu.error;
export const selectAutheticate = (state) => state.menu.fetchAuthenticate;
export const selectQuickRestaurant = (state) =>
  state.menu.fetchQuickRestaturant;
export default menuSlice.reducer;
