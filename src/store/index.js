import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
})
