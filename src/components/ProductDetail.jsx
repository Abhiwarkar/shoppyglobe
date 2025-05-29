import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

const ProductDetail = () => {
  //  Get route parameters
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  //  Store fetched data in component's state
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  /**
   * Use useEffect to fetch product details when component mounts
   * Fetch based on route parameters
   *  Error handling for failed requests
   */
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        // Validate route parameter
        if (!id || isNaN(id)) {
          throw new Error('Invalid product ID provided')
        }

        //  Fetch product details based on route parameter
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        
        //  Error handling for HTTP errors
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found')
          }
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        
        // Validate response data
        if (!data || !data.id) {
          throw new Error('Invalid product data received')
        }

        //  Store the fetched data in component's state
        setProduct(data)

      } catch (err) {
        //  Error handling for failed data fetch requests
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    //  Fetch when component mounts (and when ID changes)
    if (id) {
      fetchProductDetails()
    } else {
      setError('No product ID provided')
      setLoading(false)
    }
  }, [id]) // Dependency on ID to refetch when route changes

  /**
   Add to cart functionality
   */
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail
        }))
      }
      navigate('/cart')
    }
  }

  /**
   Quantity control
   */
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  /**
   Error handling - Display error state
   */
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Back to Products
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  /**
    Loading state display
   */
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image skeleton */}
            <div className="bg-gray-300 h-96 rounded-lg animate-pulse"></div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded animate-pulse"></div>
              <div className="bg-gray-300 h-6 rounded w-3/4 animate-pulse"></div>
              <div className="bg-gray-300 h-4 rounded animate-pulse"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3 animate-pulse"></div>
              <div className="bg-gray-300 h-10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
    No product found state
   */
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  /**
    Product details display
   */
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <p className="text-blue-600 font-medium uppercase tracking-wide">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating?.toFixed(1)} (Reviews)
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 10 
                  ? 'bg-green-100 text-green-800' 
                  : product.stock > 0 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-200"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Brand:</dt>
                  <dd className="font-medium">{product.brand || 'Generic'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-medium capitalize">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">SKU:</dt>
                  <dd className="font-medium">SKU-{product.id.toString().padStart(6, '0')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;