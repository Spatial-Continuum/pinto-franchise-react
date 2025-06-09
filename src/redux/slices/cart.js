import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../globalImport";


export const CreateCustomerCart = createAsyncThunk(
  "api/CreateCustomerCart",
  async (val) => {
    try {
         const token = localStorage.getItem("access_token");
      const response = await axios.post(`${API_URL}/cart/franchise-cart`,val,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return response;
    } catch (error) {      
      return error.response?.data || error.message;
    }
  }
);
export const UpdateCustomerCart = createAsyncThunk(
  "api/UpdateCustomerCart",
  async (val) => {
    try {
         const token = localStorage.getItem("access_token");
      const response = await axios.patch(`${API_URL}/cart/franchise-cart/details/${val?.userId}`,val?.order,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return response;
    } catch (error) {      
      return error.response?.data || error.message;
    }
  }
);

export const getCartPresentOrder = createAsyncThunk(
  "api/getCartPresentOrder",
  async (userid, { rejectWithValue }) => {
    try {
         const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/cart/franchise-cart/details/${userid}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cartorder",
  initialState: {
    cartOrderList: [],
    loading: false,
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartPresentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartPresentOrder.fulfilled, (state, action) => {
        console.log("Fetched data onboarding:", action.payload);
        state.loading = false;
        state.cartOrderList = action.payload;
      })
      .addCase(getCartPresentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const GetCartorderList= (state) => state.cart.cartOrderList;
export const Searchloading = (state) => state.manageOrderApis.loading;
export const CreateCustomerOrder = (state) => state.manageOrderApis.error;
export default cartSlice.reducer;