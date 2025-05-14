import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../globalImport";

// Async thunk for posting a new restaurant
export const postNewRestaurant = createAsyncThunk(
  "restaurant/postNewRestaurant",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/restaurant/merchant`,
        dataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("newrestaurant error", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Async thunk for get restaurant by ID
export const getRestaurantById = createAsyncThunk(
  "restaurant/getRestaurantById",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateRestaurantDetails = createAsyncThunk(
  "restaurant/updateRestaurantDetails",
  async (restaurantId, dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/restaurant/merchant/${restaurantId}`,
        dataToSubmit,
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

//Async for get all restaurant
export const getRestaurantList = createAsyncThunk(
  "restaurant/getRestaurantsList",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/restaurant/merchant`);
      return response.data;
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//getMenuBy restaurantId
export const getMenuByRestaurant = createAsyncThunk(
  "restaurant/getMenuByRestayrant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/menucategory?restaurant_id=${restaurantId}`
      );
      console.log("itemapi", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Async for get new restaurants
export const getNewRestaurants = createAsyncThunk(
  "restaurant/getNewRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/newonboarded`
      );
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  })

export const getAllMostLovedRestaurant = createAsyncThunk('restaurant/getAllMostLovedRestaurant', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/restaurant/most-loved-restaurants`);
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
})

export const AddMostLovedRestaurant = createAsyncThunk(
  'restaurant/AddMostLovedRestaurant',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/restaurant/most-loved-restaurants`, restaurantId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMostLovedRestaurant = createAsyncThunk('api/deleteMostLovedRestaurant', async (restaurantId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/restaurant/most-loved-restaurants/${restaurantId}`);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
})

export const getAllRestaurantPending = createAsyncThunk(
  "restaurant/getAllRestaurantPendeing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/list?onboarding=Pending`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllRestaurantRejected = createAsyncThunk(
  "restaurant/getAllRestaurantRejected",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/list?onboarding=Rejected`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllRestaurantSuccess = createAsyncThunk(
  "restaurant/getAllRestaurantSuccess",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/list?onboarding=Success`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchRestaurantByName = createAsyncThunk(
  "restaurant/searchRestaurantByName",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/restaurant/merchant/search?name=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const PostUpdateRestaurantRanking = createAsyncThunk(
  "data/sendData",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("other data here and there", formData);
      const response = await axios.put(
        `${API_URL}/restaurant/merchant/toprestaurants`,
        formData
      );
      return response.data; // return what you want to save in the store
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const getAllMostLovedRestaurant = createAsyncThunk('restaurant/getAllMostLovedRestaurant', async(_, { rejectWithValue }) =>{
//   try{
//     const response = await axios.get(`${API_URL}/restaurant/most-loved-restaurants`);
//     return response.data
//   }catch(error){
//     return rejectWithValue(error.response?.data || error.message);
//   }
// })

// export const AddMostLovedRestaurant = createAsyncThunk(
//   'restaurant/AddMostLovedRestaurant',
//   async (restaurantId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/restaurant/most-loved-restaurants`, restaurantId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteMostLovedRestaurant = createAsyncThunk('api/deleteMostLovedRestaurant', async (restaurantId, { rejectWithValue }) => {
//   try {
//     const response = await axios.delete(
//       `${API_URL}/restaurant/most-loved-restaurants/${restaurantId}`);
//     return response;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// })
export const DeleteRestaurant = createAsyncThunk(
  "data/sendData",
  async (res_id, { rejectWithValue }) => {
    console.log("aklsdjfoe22333", res_id);
    try {
      const response = await axios.delete(
        `${API_URL}/restaurant/merchant/toprestaurants/${res_id?.ranking_updates}`
      );
      return response.data; // return what you want to save in the store
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Slice name
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantData: [],
    selectedRestaurant: [],
    restaurantList: [],
    allNewRestaurants: [],
    pendingRestaurants: [],
    updatedRestaurant: null,
    successRestaurants: [],
    rejectedRestaurants: [],
    searchNameResults: [],
    menuCategory: [],
    mostLovedRestaurant: [],
    loading: false,
    error: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllRestaurantSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.successRestaurants = action.payload;
      })
      .addCase(getAllRestaurantSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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

      .addCase(getAllRestaurantPending.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantPending.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRestaurants = action.payload;
      })
      .addCase(getAllRestaurantPending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllRestaurantRejected.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantRejected.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectedRestaurants = action.payload;
      })
      .addCase(getAllRestaurantRejected.rejected, (state, action) => {
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
      .addCase(getNewRestaurants.fulfilled, (state, action) => {
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


      .addCase(searchRestaurantByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRestaurantByName.fulfilled, (state, action) => {
        state.loading = false;
        state.searchNameResults = action.payload; // Store search results
      })
      .addCase(searchRestaurantByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllMostLovedRestaurant.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMostLovedRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.mostLovedRestaurant = action.payload;
      })
      .addCase(getAllMostLovedRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(AddMostLovedRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddMostLovedRestaurant.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AddMostLovedRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMostLovedRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMostLovedRestaurant.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMostLovedRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const selectRestaurantData = (state) => state.restaurant.restaurantData;
export const selectSearchResults = (state) => {
  return state.restaurant?.searchNameResults || [];
};

export const selectSelectedRestaurant = (state) =>
  state.restaurant.selectedRestaurant;
export const selectUpdatedRestaurant = (state) =>
  state.restaurant.updatedRestaurant;

export const selectAllNewRestaurants = (state) =>
  state.restaurant.allNewRestaurants;

export const selectMenuCategory = (state) => state.restaurant.menuCategory;
export const selectRejectedRestaurants = (state) =>
  state.restaurant.rejectedRestaurants;
export const selectSuccessRestaurants = (state) =>
  state.restaurant.successRestaurants;
export const selectPendingRestaurants = (state) =>
  state.restaurant.pendingRestaurants;
export const selectRestaurantList = (state) => state.restaurant.restaurantList;
export const selectApiLoading = (state) => state.restaurant.loading;
export const selectApiError = (state) => state.restaurant.error;
export const selectMostLovedrestaurant = (state) => state.restaurant.mostLovedRestaurant;

export const { resetRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;
