import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts, setLoading, setError } from '../store/productsSlice'

const useProducts = () => {
  const dispatch = useDispatch()
  
  // Hook's own state for storing fetched data
  const [products, setProductsState] = useState([])
  const [loading, setLoadingState] = useState(false)
  const [error, setErrorState] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  /**
    Fetch function with comprehensive error handling
   */
  const fetchProducts = useCallback(async (isRetry = false) => {
    try {
      // Set loading states
      setLoadingState(true)
      dispatch(setLoading(true))
      
      // Clear previous errors
      setErrorState(null)
      dispatch(setError(null))

      //  Fetch from the exact required API endpoint
      const response = await fetch('https://dummyjson.com/products')
      
      //  Error handling for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      //  Validate response structure
      if (!data || !Array.isArray(data.products)) {
        throw new Error('Invalid API response structure')
      }

      //Store fetched data in hook's state and Redux
      setProductsState(data.products)
      dispatch(setProducts(data.products))
      
      // Reset retry count on success
      setRetryCount(0)

    } catch (err) {
      // Comprehensive error handling
      const errorMessage = err.name === 'TypeError' && err.message.includes('fetch')
        ? 'Network error - Please check your internet connection'
        : err.message || 'Failed to fetch products from API'
      
      setErrorState(errorMessage)
      dispatch(setError(errorMessage))
      
      if (isRetry) {
        setRetryCount(prev => prev + 1)
      }

    } finally {
      setLoadingState(false)
      dispatch(setLoading(false))
    }
  }, [dispatch, retryCount])

  /**
   Refetch function with retry logic
   */
  const refetch = useCallback(() => {
    if (retryCount < 3) {
      setTimeout(() => fetchProducts(true), 1000 * (retryCount + 1))
    } else {
      fetchProducts(true)
    }
  }, [fetchProducts, retryCount])

  /**
   useEffect to fetch products when hook is used
   */
  useEffect(() => {
    fetchProducts()
  }, []) // Only on mount

  return { 
    products,    // Hook's local state data
    loading, 
    error, 
    refetch,
    retryCount
  }
}

export default useProducts