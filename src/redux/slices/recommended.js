import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from '../../globalImport';

export const getAllRecommendedItem = createAsyncThunk('api/getallRecommended', async (restaurantId, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`${API_URL}/restaurant/recommended-item/${restaurantId}`)
        return reponse.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const recommendedItemSlice = createSlice({
    name: 'recommendedItem',
    initialState: {
        recommendedItemsData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRecommendedItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRecommendedItem.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedItemsData = action.payload;
            })
            .addCase(getAllRecommendedItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export const selectRecommendedAllItemApi = (state) => state.recommendedItem.recommendedItemsData




export const selectApiError= (state)=>state.recommendedItem.error
export const selectApiLoading =(state)=>state.recommendedItem.loading






export default recommendedItemSlice.reducer;