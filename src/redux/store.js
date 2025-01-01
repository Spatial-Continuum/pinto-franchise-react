import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import menuReducer from "./slices/menu"
import restaurantReducer from "./slices/restaurant"
export const store = configureStore({
  reducer: {
    menu:menuReducer,
    restaurant:restaurantReducer,
  },
})