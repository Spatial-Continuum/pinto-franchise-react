import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import franchiseReducer from './slices/franchiseSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        franchise: franchiseReducer,
    }
})

export default store