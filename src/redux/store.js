import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import menuReducer from "./slices/menu"
import restaurantReducer from "./slices/restaurant"
import merchantReducer from "./slices/merchant"
import itemReducer from './slices/item';
import addonReducer from './slices/addons';
import dishReducer from './slices/dishes';

export const store = configureStore({
  reducer: {
    menu:menuReducer,
    restaurant:restaurantReducer,
    merchant:merchantReducer,
    item:itemReducer,
    addon:addonReducer,
    dish:dishReducer,
  },
})