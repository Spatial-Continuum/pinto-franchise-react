import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';

//createItemApi
export const createItemApi = createAsyncThunk('api/createItemApi', async (itemData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/restaurant/item`, itemData)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }

})
//getAllItem
export const getAllItemApi = createAsyncThunk('api/getAllItemApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/restaurant/item`)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);

    }
})
//getItemById
export const getItemByIdApi = createAsyncThunk('api/getItemByIdApi', async (restaurantId ,{rejectWithValue}) => {
    try{
        const response = await axios.get(`${API_URL}/restaurant/menucategory?restaurant_id=${restaurantId}`)
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
})
//updateItemById
export const updateItemByIdApi = createAsyncThunk('api/updateItemByIdApi', async (itemId,itemData ,{rejectWithValue}) => {
    try{
        const response = await axios.put(`${API_URL}/restaurant/item/${itemId}`,itemData)
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
})

//deleteItemById
    export const deleteItemByIdApi = createAsyncThunk('api/deleteItemByApi', async(itemId, {rejectWithValue}) => {
        try{
            const response = await axios.delete(`${API_URL}/restaurant/item/${itemId}`)
            return response.data
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
    })








//slicename
const itemSlice = createSlice({
    name: 'item',
    initialState: {
        createItemData: null,
        allItems:null,
        itemById: null,
        updatedItem: null,
        deletedItem: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createItemApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createItemApi.fulfilled, (state, action) => {
                state.loading = false;
                state.createItemData = action.payload;
            })
            .addCase(createItemApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getAllItemApi.pending, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllItemApi.fulfilled, (state, action) => {
                state.loading = false;
                state.allItems = action.payload;
            })
            .addCase(getAllItemApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(getItemByIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItemByIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.itemById = action.payload;
            })
            .addCase(getItemByIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateItemByIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemByIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.updatedItem = action.payload;
            })
            .addCase(updateItemByIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteItemByIdApi.pending, (state, action) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItemByIdApi.fulfilled,(state, action)=>{
                state.loading = false;
                state.deletedItem = action.payload;
            })
            .addCase(deleteItemByIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})













export const selectCreateApi = (state) => state.item.createItemData
export const selectGetAllItemApi = (state) => state.item.allItems
export const selectGetItemByIdApi = (state ) =>state.item.itemById
export const selectUpdateItemByIdApi = (state) => state.item.updatedItem
export const selectDeleteItemByApi = (state) =>state.item.deletedItem


export const selectApiLoading = (state) => state.item.loading
export const selectApiError = (state) => state.item.error






export default itemSlice.reducer;