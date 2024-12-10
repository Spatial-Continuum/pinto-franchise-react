import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurants: [],
  deliveryPartners: [],
  reports: [],
};

const franchiseSlice = createSlice({
  name: 'franchise',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setDeliveryPartners: (state, action) => {
      state.deliveryPartners = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
  },
});

export const { setRestaurants, setDeliveryPartners, setReports } = franchiseSlice.actions;
export default franchiseSlice.reducer;
