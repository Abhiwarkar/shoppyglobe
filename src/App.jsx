import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

// Lazy loading components for performance optimization (code splitting)
const Home = React.lazy(() => import('./pages/Home'))
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'))
const CartPage = React.lazy(() => import('./pages/CartPage'))
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'))
const NotFound = React.lazy(() => import('./components/NotFound'))

/**
 * Error fallback component for error boundaries
 * Displays when an error occurs in the application
 */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={resetErrorBoundary}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
/**
 * Loading spinner component
 * Displayed during lazy loading of components
 */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}

/**
 * Main App component with routing configuration
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Main routes with header */}
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/product/:id" element={<><Header /><ProductDetailPage /></>} />
          <Route path="/cart" element={<><Header /><CartPage /></>} />
          <Route path="/checkout" element={<><Header /><CheckoutPage /></>} />
          
          {/* 404 route without header for clean error page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;