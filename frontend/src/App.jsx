import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CategoriesManager from './pages/categories/CategoriesManager'
import Login from './pages/login/login'
import Profile from './pages/profile/Profile'
import ProductsManager from './pages/products/ProductsManager'
import VariantsManager from './pages/variants/VariantsManager'
import AddressesManager from './pages/addresses/addressesManager'
import Home from './pages/Home/Home'
import ProductReviews from './pages/reviews/ProductReviews'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoriesManager />} />
        <Route path="/products" element={<ProductsManager />} />
        <Route path="/products/variant" element={<VariantsManager />} />
        <Route path="/addresses" element={<AddressesManager />} />
        <Route path="/products/:id/reviews" element={<ProductReviewsPage />} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App