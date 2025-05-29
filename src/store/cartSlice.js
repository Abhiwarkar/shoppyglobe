import { createSlice } from '@reduxjs/toolkit'

// Initial state for cart
const initialState = {
  items: [],           // Array of cart items
  totalQuantity: 0,    // Total number of items in cart
  totalAmount: 0,      // Total price amount
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart
     * If item exists, increase quantity; otherwise add new item
     */
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        // Item already exists - increment quantity
        existingItem.quantity += 1
        existingItem.totalPrice += newItem.price
      } else {
        // New item - add to cart
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.thumbnail,
          quantity: 1,
          totalPrice: newItem.price,
        })
      }
      
      // Update totals
      state.totalQuantity += 1
      state.totalAmount += newItem.price
    },

    /**
     * Remove item completely from cart
     */
    removeFromCart: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        // Update totals before removing
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.totalPrice
        
        // Remove item from cart
        state.items = state.items.filter(item => item.id !== id)
      }
    },

    /**
     * Update quantity of specific item
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity
        
        // Update item
        existingItem.quantity = quantity
        existingItem.totalPrice = existingItem.price * quantity
        
        // Update totals
        state.totalQuantity += quantityDiff
        state.totalAmount += quantityDiff * existingItem.price
      } else if (existingItem && quantity === 0) {
        // Remove item if quantity is 0
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.totalPrice
        state.items = state.items.filter(item => item.id !== id)
      }
    },

    /**
     * Clear entire cart
     */
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    }
  },
})

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Export reducer
export default cartSlice.reducer;