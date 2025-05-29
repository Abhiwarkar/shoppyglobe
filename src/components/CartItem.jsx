import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, updateQuantity } from '../store/cartSlice'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  /**
   * Handle quantity change
   */
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id))
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  /**
   * Handle remove item
   */
  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Product Image */}
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full sm:w-24 h-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link 
            to={`/product/${item.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors block mb-1"
          >
            {item.title}
          </Link>
          
          <p className="text-gray-600 mb-2">
            ${item.price.toFixed(2)} each
          </p>

          {/* Mobile Quantity and Price */}
          <div className="sm:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="font-medium px-3">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">${item.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4M7 7h.01M5 7h2m0 0V4a1 1 0 011-1h4a1 1 0 011 1v3M5 7l.01.01" />
            </svg>
            Remove
          </button>
        </div>

        {/* Desktop Quantity Controls */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="font-medium px-3 min-w-[3rem] text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>

          {/* Desktop Price */}
          <div className="text-right min-w-[6rem]">
            <p className="font-semibold text-lg">${item.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;