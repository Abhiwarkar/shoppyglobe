import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useProducts from '../hooks/useProducts'
import ProductItem from './ProductItem'

const ProductList = () => {
  // Store fetched data in component's state
  const [componentProducts, setComponentProducts] = useState([])
  const [componentLoading, setComponentLoading] = useState(true)
  const [componentError, setComponentError] = useState(null)

  // Use custom hook for fetching product list
  const { loading: hookLoading, error: hookError, refetch } = useProducts()
  const { filteredProducts, searchTerm } = useSelector(state => state.products)

  /**
   */
  useEffect(() => {
    const fetchProductsInComponent = async () => {
      try {
        setComponentLoading(true)
        setComponentError(null)

        //  Fetch from the exact required API endpoint
        const response = await fetch('https://dummyjson.com/products')
        
        // Error handling for HTTP errors
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        
        //  Validate API response structure
        if (!data || !Array.isArray(data.products)) {
          throw new Error('Invalid API response: products array not found')
        }

        // Store the fetched data in component's state
        setComponentProducts(data.products)

      } catch (error) {
        //  Error handling for failed data fetch requests
        setComponentError(error.message)
      } finally {
        setComponentLoading(false)
      }
    }

    // Fetch when component mounts
    fetchProductsInComponent()
  }, []) // Empty dependency array ensures it runs only on mount

  /**
    Error handling - Component level error display
   */
  if (componentError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to Load Products</h2>
          <p className="text-gray-600 mb-6">{componentError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  /**
   * Error handling - Custom hook error display
   */
  if (hookError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to Load Products</h2>
          <p className="text-gray-600 mb-6">{hookError}</p>
          <button
            onClick={refetch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  /**
   * Loading state handling
   */
  if (componentLoading || hookLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-300 h-6 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Use filtered products from Redux, fallback to component products
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : componentProducts

  /**
   *No products found state
   */
  if (displayProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {searchTerm ? `No products found for "${searchTerm}"` : 'No products available'}
          </h2>
          <p className="text-gray-600">
            {searchTerm ? 'Try searching for something else.' : 'Please check back later.'}
          </p>
        </div>
      </div>
    )
  }

  /**
   Products grid display
   */
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Results header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
        </h2>
        <p className="text-gray-600 mt-1">
          {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList;