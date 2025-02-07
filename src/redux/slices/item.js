import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';

//createItemApi
export const createItemApi = createAsyncThunk('api/createItemApi', async (postData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/restaurant/item`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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
export const getItemByIdApi = createAsyncThunk('api/getItemByIdApi', async (itemId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/restaurant/item/${itemId}`)
        console.log("item", response.data)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})
//updateItemById
export const updateItemByIdApi = createAsyncThunk('api/updateItemByIdApi', async ({ itemId, formPayload }, { rejectWithValue }) => {
    try {
        // const formData = new FormData();

        // Append all fields to the FormData object
        // for (const key in updatedData) {
        //     if (updatedData.hasOwnProperty(key)) {
        //         formData.append(key, updatedData[key]);
        //     }
        // }
        const response = await axios.put(`${API_URL}/restaurant/item/${itemId}`, formPayload, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type
            },
        })

        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})

//deleteItemById
export const deleteItemByIdApi = createAsyncThunk('api/deleteItemByApi', async (itemId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/restaurant/item/${itemId}`)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})

//most loaved Dishes  
export const recommendedUpdateApi = createAsyncThunk('api/recommendedbyApi', async ({ itemId, currentStatus }, { rejectWithValue }) => {
    try {
        const updatedStatus = !currentStatus
        const response = await axios.put(`${API_URL}/restaurant/item/recommended/${itemId}`,{recommended : updatedStatus})
        return response.data
    }


    catch (error) {
        console.error(`Error recommendedby with ID ${itemId}:`, error);
        throw error;
    }
})







//slicename
const itemSlice = createSlice({
    name: 'item',
    initialState: {
        createItemData: [],
        allItems: [],
        itemById: [],
        updatedItem: null,
        deletedItem: [],
        recommendedUpdate: [], //
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
                const updatedItem = action.payload;

                // Update the items array
                // state.item = state.item.map((item) =>
                //   item.item_id === updatedItem.item_id ? updatedItem : item
                // );

                // // Update itemById if you're using it
                // if (state.itemById[updatedItem.item_id]) {
                //   state.itemById[updatedItem.item_id] = updatedItem;
                // }

                // // Optionally track the updated item separately
                // state.updatedItem = updatedItem;
            })
            .addCase(updateItemByIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteItemByIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItemByIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedItem = action.payload;
            })
            .addCase(deleteItemByIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(recommendedUpdateApi.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recommendedUpdateApi.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedUpdate = action.payload;
            })
            .addCase(recommendedUpdateApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})













export const selectCreateApi = (state) => state.item.createItemData
export const selectGetAllItemApi = (state) => state.item.allItems
export const selectGetItemByIdApi = (state) => state.item.itemById
export const selectUpdateItemByIdApi = (state) => state.item.updatedItem
export const selectDeleteItemByApi = (state) => state.item.deletedItem
export const selectRecommendedUpdate = (state) => state.item.recommendedUpdate


export const selectApiLoading = (state) => state.item.loading
export const selectApiError = (state) => state.item.error






export default itemSlice.reducer;