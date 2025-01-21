import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';

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
//Async thunk for get restaurant by ID
export const getRestaurantById = createAsyncThunk(
  'restaurant/getRestaurantById',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/restaurant/merchant/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateRestaurantDetails = createAsyncThunk(
  'restaurant/updateRestaurantDetails',
  async (restaurantId, dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/restaurant/merchant/${restaurantId}`, dataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

//Async for get all restaurant
export const getRestaurantList = createAsyncThunk(  
  'restaurant/getRestaurantsList',
  async (restaurantId, { rejectWithValue })  =>{
    try{
      const response = await axios.get(`${API_URL}/restaurant/merchant`);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
//getMenuBy restaurantId
export const getMenuByRestaurant = createAsyncThunk( 
  'restaurant/getMenuByRestayrant',
  async (restaurantId, { rejectWithValue }) =>{
    try{
      const response = await axios.get(`${API_URL}/restaurant/menucategory?restaurant_id=${restaurantId}`);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
})

//Async for get new restaurants
export const getNewRestaurants = createAsyncThunk(
  'restaurant/getNewRestaurants',
  async (_, { rejectWithValue })  =>{
    try{
      const response = await axios.get(`${API_URL}/restaurant/merchant/newonboarded`);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAllRestaurantPending = createAsyncThunk('restaurant/getAllRestaurantPendeing', async(_, { rejectWithValue }) =>{
  try{
    const response = await axios.get(`${API_URL}/restaurant/merchant/list?onboarding=Pending`);
    return response.data
  }catch(error){
    return rejectWithValue(error.response?.data || error.message);
  }
})




// Slice name
const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurantData: [],
    selectedRestaurant: [],
    restaurantList:[],
    allNewRestaurants:[],
    updatedRestaurant:null,
    menuCategory:[],
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
      })



      .addCase(getRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRestaurant = action.payload;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getRestaurantList.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantList.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantList = action.payload;
      })
      .addCase(getRestaurantList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getNewRestaurants.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewRestaurants.fulfilled, (state,action)=>{
        state.loading = false;
        state.allNewRestaurants = action.payload; 
      })
      .addCase(getNewRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming updated data is in action.payload
        state.updatedRestaurant = action.payload;
        state.error = null;
      })
      .addCase(updateRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      

      .addCase(getMenuByRestaurant.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.menuCategory = action.payload;
      })
      .addCase(getMenuByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export const selectRestaurantData = (state) => state.restaurant.restaurantData;


export const selectSelectedRestaurant = (state) => state.restaurant.selectedRestaurant;
export const selectUpdatedRestaurant = (state) => state.restaurant.updatedRestaurant;

export const selectAllNewRestaurants = (state) => state.restaurant.allNewRestaurants;

export const selectMenuCategory = (state) => state.restaurant.menuCategory;


export const selectRestaurantList = (state) => state.restaurant.restaurantList;
export const selectApiLoading = (state) => state.restaurant.loading; 
export const selectApiError = (state) => state.restaurant.error;



export default restaurantSlice.reducer;
