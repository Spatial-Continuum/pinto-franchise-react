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

export const updateAddonApi = createAsyncThunk('api/updateAddonApi', async ({addonId,addonData},{rejectWithValue})=>{
    try{
        const response = await axios.put(`${API_URL}/restaurant/merchant/addon-detail/${addonId}`, addonData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log('addondata',addonData)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response?.data || err.message); 
    
    }})
export const getAddonById  = createAsyncThunk('api/getaddonbyid', async(addonId ,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_URL}/restaurant/merchant/addon-detail/${addonId}`)
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
})
export const deletedAddonIdApi = createAsyncThunk('api/deleteAddon',async(addonId, {rejectWithValue})=>{
    try{
        const response = await axios.delete(`${API_URL}/restaurant/merchant/addon-detail/${addonId}`)
        return addonId
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
})


const addonSlice =createSlice({
    name: 'addon',
    initialState: {
        createAddonData:null,
        getAllAddonData: null,
        updatedData:null,
        addonDataById:null,
        deletedAddonId: null,
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

        .addCase(updateAddonApi.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAddonApi.fulfilled, (state, action) => {
            state.loading = false;
            state.updatedData = action.payload
        })
        .addCase(updateAddonApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(getAddonById.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAddonById.fulfilled, (state, action) => {
            state.loading = false;
            state.addonDataById = action.payload
        })
       .addCase(getAddonById.rejected, (state, action) => {
        state.loading = false;
            state.error = action.payload;
        })

        .addCase(deletedAddonIdApi.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deletedAddonIdApi.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedAddonId = action.payload;
          })
          .addCase(deletedAddonIdApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
    
})


export const selectCreateAddonApiData = (state)=>state.addon.createAddonData
export const selectGetAllAddonApiData = (state)=>state.addon.getAllAddonData
export const selectUpdatedAddonData = (state)=>state.addon.updatedData
export const selectGetAddonById = (state)=>state.addon.addonDataById
export const selectDeleteAddonData = (state)=>state.addon.deletedAddonId


export const selectApiError= (state)=>state.addon.error
export const selectApiLoading =(state)=>state.addon.loading

export default addonSlice.reducer