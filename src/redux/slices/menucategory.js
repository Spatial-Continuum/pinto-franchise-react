import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';


//create menuCategoryApi
 export const createMenuCategoryApi = createAsyncThunk('api/createMenuCategoryApi', async (categoryData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/restaurant/menucategory`, categoryData)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const getMenuCategoriesByRestaurantApi = createAsyncThunk(
    'api/getMenuCategoriesByRestaurantApi',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/restaurant/menucategory`, {
                params: { restaurant_id: restaurantId }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const updateMenuByMenuIdApi = createAsyncThunk('api/updateMenuByMenuId',async({menuId,menuTitle} ,{ rejectWithValue }) => {
    try{
        const response = await axios.put(`${API_URL}/restaurant/menucategory/${menuId}`,{menu_title:menuTitle})
        return response.data
    }catch (err){
        return rejectWithValue(err.response?.data || err.message);
    }
})

export const deleteMenuCategoryByIdApi = createAsyncThunk(
    'api/deleteMenuCategoryByIdApi',
    async (menuId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/restaurant/menucategory/${menuId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    })

export const getSubcategoryByApi = createAsyncThunk('api/getSubcategoryByIdApi',
    async (subcategoryTitle, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/menu/subcategory/by-name`, {
                params: { subcategory_title:  subcategoryTitle}
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);




const menuCategorySlice = createSlice({
    name:'menuCategory',
    initialState:{
        createCategoryApi:[],
        menuCategoryByRestaurant:[],
        updatedMenuCategoryByMenuId:[],
        deletedMenu:[],
        subcategories:[],
        loading:false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createMenuCategoryApi.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createMenuCategoryApi.fulfilled, (state, action) => {
            state.loading = false;
            state.createCategoryApi = action.payload;
        })
        .addCase(createMenuCategoryApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        .addCase(getMenuCategoriesByRestaurantApi.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMenuCategoriesByRestaurantApi.fulfilled, (state, action) => {
            state.loading = false;
            state.menuCategoryByRestaurant = action.payload;
        })
        .addCase(getMenuCategoriesByRestaurantApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        .addCase(updateMenuByMenuIdApi.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateMenuByMenuIdApi.fulfilled, (state, action) => {
            state.loading = false;
            state.updatedMenuCategoryByMenuId = action.payload;
        })  
        .addCase(updateMenuByMenuIdApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteMenuCategoryByIdApi.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteMenuCategoryByIdApi.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedMenu = action.payload;
        })
        .addCase(deleteMenuCategoryByIdApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        .addCase(getSubcategoryByApi.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSubcategoryByApi.fulfilled, (state, action) => {
            state.loading = false;
            state.subcategories = action.payload;
        })
        .addCase(getSubcategoryByApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

})

































export const selectCreateMenuCategroy = (state) =>state.menuCategory.createCategoryApi
export const selectGetMenuRestaurant = (state) => state.menuCategory.menuCategoryByRestaurant
export const selectUpdateMenuByMenuId = (state)=>state.menuCategory.updatedMenuCategoryByMenuId
export const selectDeletedMenu = (state) => state.menuCategory.deletedMenu
export const selectSubcategorybyName = (state)=>state.menuCategory.subcategories






export default menuCategorySlice.reducer;
