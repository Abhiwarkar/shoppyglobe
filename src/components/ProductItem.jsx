import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

const ProductItem = ({ product }) => {
  const dispatch = useDispatch()

  /**
   * Handle add to cart button click
   */
  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking add to cart
    e.stopPropagation()
    
    // Dispatch add to cart action
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }))
  }

  /**
   * Calculate discount percentage
   */
  const discountPercentage = Math.round(product.discountPercentage || 0)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block">
        
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}

          {/* Stock Status */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
              product.stock > 10 
                ? 'bg-green-100 text-green-800' 
                : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category */}
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
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
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating?.toFixed(1) || '0.0'})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price / (1 - discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductItem