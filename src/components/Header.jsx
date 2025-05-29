import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/productsSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { totalQuantity } = useSelector(state => state.cart)
  const { searchTerm } = useSelector(state => state.products)
  const location = useLocation()

  /**
   * Handle search input changes
   */
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  /**
   * Clear search input
   */
  const handleClearSearch = () => {
    dispatch(setSearchTerm(''))
  }

  // Check if current page is home page for search visibility
  const isHomePage = location.pathname === '/'

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              🛍️ ShoppyGlobe
            </Link>
          </div>

          {/* Search Bar - Only show on home page */}
          {isHomePage && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Clear Search Button */}
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                isHomePage 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className={`relative flex items-center font-medium transition-colors duration-200 ${
                location.pathname === '/cart'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2-2v6.01" />
              </svg>
              
              Cart
              
              {/* Cart Badge */}
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;