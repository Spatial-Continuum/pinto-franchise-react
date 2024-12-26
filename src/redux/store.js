import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import menuReducer from "./slices/menu"

export const store = configureStore({
  reducer: {
    menu:menuReducer,
  },
})