import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../globalImport';



export const getMostLovedDishes = createAsyncThunk('api/getMostLovedDishes', async ( _ ,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_URL}/menu/most-loved-dishes`)
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const addNewMostLovedDishes = createAsyncThunk('api/addNewMostLovedDishes', async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/menu/most-loved-dishes`, 
        { subcategory: subcategoryId }  // Passing body in request
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  })


const dishSlice = createSlice({
    name:'dish',
    initialState:{
        mostLovedDishes:[],
        newDish:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMostLovedDishes.pending, (state)=>{
            state.loading = true;
            state.error =null;
        })
        .addCase(getMostLovedDishes.fulfilled, (state, action) =>{
            state.loading = false;
            state.mostLovedDishes = action.payload;
        })
        .addCase(getMostLovedDishes.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(addNewMostLovedDishes.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addNewMostLovedDishes.fulfilled, (state, action) =>{
            state.loading = false;
            state.newDish=action.payload;
        })
        .addCase(addNewMostLovedDishes.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const selectMostLovedDishes = (state)=> state.dish.mostLovedDishes;
export const selectNewDish = (state)=>state.dish.newDish;




export const selectApiError = (state) => state.dish.error;
export const selectApiLoading = (state)=> state.dish.loading;


export default dishSlice.reducer