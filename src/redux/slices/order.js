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

export const SearchMobileNumber = createAsyncThunk(
  "api/SearchMobileNumber",
  async (number) => {
    try {
      const response = await axios.get(`${API_URL}/users/customer-details-number/?phone=${number}`);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }
);

export const CreateNewCustomer = createAsyncThunk(
  "api/CreateNewCustomer",
  async (val) => {
    try {
      const response = await axios.post(`${API_URL}/users/create-customer`,val);
      return response;
    } catch (error) {      
      return error.response?.data || error.message;
    }
  }
);

export const CreateNewAddress = createAsyncThunk(
  "api/CreateNewAddress",
  async (val) => {
    try {
      const response = await axios.post(`${API_URL}/users/customer/create-address/${val?.id}`,val?.values);
      return response;
    } catch (error) {      
      return error.response?.data || error.message;
    }
  }
);

export const UpdateCustomerPrimaryAddress = createAsyncThunk(
  "api/UpdateCustomerPrimaryAddress",
  async (val) => {
    try {
      const response = await axios.put(`${API_URL}/users/customer-primary-address/?phone=${val?.phone}`,val?.values);
      return response;
    } catch (error) {      
      return error.response?.data || error.message;
    }
  }
);

export const GetRestaurantUserOrder = createAsyncThunk(
  "api/GetRestaurantUserOrder",
  async (val) => {
    try {
      const response = await axios.post(`${API_URL}/order/delivery-only-order`,val);
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }
);

export const GetNearByPartner= createAsyncThunk(
  "api/GetNearByPartner",
  async (val) => {
    try {
      console.log("val",val);
      const response = await axios.get(`${API_URL}/delivery-partner/nearby-partners/${val}`);
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }
);

export const AssignDeliveryOrder = createAsyncThunk(
  "api/AssignDeliveryOrder",
  async (val) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${API_URL}/delivery-partner/franchise/delivery-request`,val,
        {
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

const manageOrderSlice = createSlice({
  name: "manageorder",
  initialState: {
    manageOrder: [],
    presentOrder: [],
    mobileLocation:[],
    RestaurantUserOrder:[],
    NearByPartner:[],
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
      })

      .addCase(SearchMobileNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchMobileNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.mobileLocation = action.payload;
      })
      .addCase(SearchMobileNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(CreateNewCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateNewCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateNewCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(CreateNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateNewAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(UpdateCustomerPrimaryAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateCustomerPrimaryAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateCustomerPrimaryAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetRestaurantUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetRestaurantUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.RestaurantUserOrder = action.payload;
      })
      .addCase(GetRestaurantUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(GetNearByPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNearByPartner.fulfilled, (state, action) => {        
        state.loading = false;
        state.NearByPartner = action.payload;
      })
      .addCase(GetNearByPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export const selectManageOrder = (state) => state.manageOrderApis.manageOrder;
export const selectPresentOrder = (state) => state.manageOrderApis.presentOrder;
export const SearchMobileLocation = (state) => state.manageOrderApis.mobileLocation;
export const GetRestaurantUser= (state) => state.manageOrderApis.RestaurantUserOrder;
export const GetNearByPartnerList= (state) => state.manageOrderApis.NearByPartner;
export const Searchloading = (state) => state.manageOrderApis.loading;
export const CreateCustomerOrder = (state) => state.manageOrderApis.error;
export default manageOrderSlice.reducer;

