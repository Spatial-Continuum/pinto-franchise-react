import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';


export const subcategorySearchByName = createAsyncThunk(
    'api/subcategorySearch',
    async ({ subcategory_title }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/menu/subcategory/by-name?subcategory_title=${subcategory_title}`)
           
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchMenuCategoryByRestaurant = createAsyncThunk(
    'api/fetchMenuCategory',
    async ({ menuId , menuTitle}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/restaurant/menucategory/${menuId}`,{menuTitle});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const extraApis = createSlice({
    name:'extraApis',
    initialState:{
        subcategorySearchByName: null,
        menuCategoryResult: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
       .addCase(subcategorySearchByName.pending, (state, action) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(subcategorySearchByName.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategorySearchByName = action.payload;
       })
       .addCase(subcategorySearchByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       })

       .addCase(fetchMenuCategoryByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchMenuCategoryByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.menuCategoryResult = action.payload;
    })
    .addCase(fetchMenuCategoryByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });


    }
});


export const selectSubcategorySearchByName =(state)=>state.extraApis.subcategorySearchByName

export const selectMenuCategoryResult =(state)=>state.extraApis.menuCategoryResult



export default extraApis.reducer;