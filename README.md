# 🛍️ ShoppyGlobe - E-commerce Application

A modern, responsive e-commerce application built with React, Redux Toolkit, and Tailwind CSS. ShoppyGlobe provides a seamless shopping experience with product browsing, detailed views, cart management, and checkout functionality.


## 🌟 Features

### 🎯 Core Functionality
- **Product Catalog**: Browse through a wide range of products with images, descriptions, and pricing
- **Search & Filter**: Real-time search functionality to find products quickly
- **Product Details**: Comprehensive product pages with multiple images, specifications, and reviews
- **Shopping Cart**: Add, remove, and modify product quantities in your cart
- **Checkout Process**: Complete order placement with form validation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### ⚡ Technical Features
- **Redux State Management**: Centralized state management using Redux Toolkit
- **Custom Hooks**: Reusable hooks for data fetching and state management
- **Lazy Loading**: Code splitting for improved performance
- **Error Boundaries**: Graceful error handling throughout the application
- **Loading States**: Skeleton screens and loading indicators
- **SEO Optimized**: Meta tags and structured data for better search engine visibility

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhiwarkar/shoppyglobe.git
   cd shoppyglobe
   ```
Deployed Link ---

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management with simplified Redux
- **React Redux** - React bindings for Redux

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

### Build Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting

### API
- **DummyJSON API** - Mock e-commerce data source

## 📊 State Management

### Redux Store Structure

```javascript
store: {
  cart: {
    items: [],           // Cart items array
    totalQuantity: 0,    // Total number of items
    totalAmount: 0       // Total price amount
  },
  products: {
    products: [],        // All products from API
    searchTerm: '',      // Current search query
    filteredProducts: [], // Filtered product results
    loading: false,      // Loading state
    error: null          // Error messages
  }
}
```

### Available Actions

#### Cart Actions
- `addToCart(product)` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity({ id, quantity })` - Update item quantity
- `clearCart()` - Clear entire cart

#### Product Actions
- `setProducts(products)` - Set product data
- `setLoading(boolean)` - Update loading state
- `setError(message)` - Set error message
- `setSearchTerm(term)` - Update search term and filter products

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Build
npm run build        # Build for production

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Run TypeScript type checking
```

## 🎨 Styling Guide

### Tailwind CSS Classes
The project uses Tailwind CSS for styling. Key utility classes include:

- **Layout**: `container`, `mx-auto`, `grid`, `flex`
- **Spacing**: `p-4`, `m-2`, `gap-6`
- **Colors**: `bg-blue-500`, `text-gray-800`, `border-gray-300`
- **Typography**: `text-xl`, `font-bold`, `leading-relaxed`
- **Effects**: `shadow-md`, `hover:shadow-lg`, `transition-all`

### Custom CSS Classes
Additional utility classes are defined in `src/App.css`:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.card` - Card component styling
- `.line-clamp-2` - Text truncation

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 1024px` (md, lg)
- **Desktop**: `> 1024px` (xl, 2xl)

### Key Responsive Features
- Adaptive navigation menu
- Flexible product grid (1-4 columns)
- Mobile-optimized cart interface
- Touch-friendly interactive elements

## 🔒 Error Handling

### Error Boundaries
The application includes error boundaries to catch and handle React errors gracefully:

- Global error boundary in `App.jsx`
- Fallback UI for broken components
- Error reporting and recovery options

### API Error Handling
- Network request failures
- Invalid product IDs
- Empty search results
- Loading state management

### Form Validation
- Required field validation
- Email format validation
- Credit card format validation
- Real-time error feedback

## ⚡ Performance Optimizations

### Code Splitting
- Lazy loading for route components
- Dynamic imports for better bundle splitting
- Vendor chunk separation

### Image Optimization
- Lazy loading for product images
- Optimized image sizes
- WebP format support (where available)

### Caching Strategies
- Browser caching for static assets
- Redux state persistence
- API response caching

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product listing loads correctly
- [ ] Search functionality works
- [ ] Product details display properly
- [ ] Cart operations (add/remove/update)
- [ ] Checkout form validation
- [ ] Responsive design on different devices
- [ ] Error handling scenarios


## 🌐 Browser Support

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)

## 📈 Performance Metrics

Target performance metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server for single-page application routing


### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed



Built with ❤️ Abhishek Hiwarkar 

