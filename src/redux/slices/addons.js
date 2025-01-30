import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';


export const createAddonAPi = createAsyncThunk('api/createAddonApi', async ({restaurantId,addonData},{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_URL}/restaurant/merchant/addons/${restaurantId}`, addonData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || err.message)
    }
})

export const getAllAddonApi = createAsyncThunk('api/getAllAddonApi', async (restaurantId,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_URL}/restaurant/merchant/addons/${restaurantId}`)
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || err.message)
    }
})




const addonSlice =createSlice({
    name: 'addon',
    initialState: {
        createAddonData:null,
        getAllAddonData: null,
        loading: false,
        error: null,
        
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
       .addCase(createAddonAPi.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(createAddonAPi.fulfilled, (state, action) => {
        
        state.loading = false;
        state.createAddonData = action.payload;
       })
        .addCase(createAddonAPi.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })



        .addCase(getAllAddonApi.pending, (state, action) => {
            state.loading=true;
            state.error = null
        })
        .addCase(getAllAddonApi.fulfilled, (state, action) => {
            state.loading = false;
            state.getAllAddonData = action.payload
        })
        .addCase(getAllAddonApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
    
})


export const selectCreateAddonApiData = (state)=>state.addon.createAddonData
export const selectGetAllAddonApiData = (state)=>state.addon.getAllAddonData


export const selectApiError= (state)=>state.addon.error
export const selectApiLoading =(state)=>state.addon.loading

export default addonSlice.reducer