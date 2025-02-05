import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';
import API_URL from "../../globalImport";

export const getAllOrderHistory = createAsyncThunk('api/getorderHistory', async(_,{rejectWithValue}) =>{
    try{
        const response = await axios.get(`${API_URL}/order/list-order`)
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message);
    }
})

const orderHistorySlice = createSlice({
    name:'orderHistory',
    initialState:{
        allOrderHistoryData:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
       .addCase(getAllOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(getAllOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrderHistoryData = action.payload;
       })
       .addCase(getAllOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       })
    }
})

export const selectAllOrderHistory =(state)=> state.orderHistory.allOrderHistoryData



export const selectLoading = (state)=>state.orderHistory.loading;
export const selectError = (state)=>state.orderHistory.error;





export default orderHistorySlice.reducer;