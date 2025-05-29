import { createSlice } from '@reduxjs/toolkit'

// Initial state for products
const initialState = {
  products: [],           // All products from API
  searchTerm: '',        // Current search term
  filteredProducts: [],  // Products filtered by search
  loading: false,        // Loading state
  error: null,          // Error message
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Set products data from API
     */
    setProducts: (state, action) => {
      state.products = action.payload
      state.filteredProducts = action.payload
      state.error = null
    },

    /**
     * Set loading state
     */
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    /**
     * Set error message
     */
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    /**
     * Set search term and filter products
     */
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      
      // Filter products based on search term
      if (action.payload.trim() === '') {
        // No search term - show all products
        state.filteredProducts = state.products
      } else {
        // Filter products by title, description, or category
        const searchLower = action.payload.toLowerCase()
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        )
      }
    },

    /**
     * Clear search and show all products
     */
    clearSearch: (state) => {
      state.searchTerm = ''
      state.filteredProducts = state.products
    }
  },
})

// Export actions
export const { 
  setProducts, 
  setLoading, 
  setError, 
  setSearchTerm, 
  clearSearch 
} = productsSlice.actions

// Export reducer
export default productsSlice.reducer