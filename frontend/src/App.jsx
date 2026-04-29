import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CategoriesManager from './pages/categories/CategoriesManager'
import Login from './pages/login/login'
import Profile from './pages/profile/Profile'
import ProductsManager from './pages/products/ProductsManager'
import VariantsManager from './pages/variants/VariantsManager'
import AddressesManager from './pages/addresses/addressesManager'
import Home from './pages/Home/Home'
import ProductReviews from './pages/reviews/ProductReviews'
import SubcategoriesManager from './pages/subcategories/SubcategoriesManager'
import Register from './pages/register/RegisterUser'
import AllProducts from './pages/allproducts/AllProducts'
import AllCategories from './pages/allcategories/AllCategories'
import Cart from './pages/cart/Cart'
import ProductDetails from './pages/productDetails/ProductDetails'
import MaterialsManager from './pages/materials/MaterialsManager'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoriesManager />} />
        <Route path="/products" element={<ProductsManager />} />
        <Route path="/materials" element={<MaterialsManager />} />
        <Route path="/products/variant" element={<VariantsManager />} />
        <Route path="/addresses" element={<AddressesManager />} />
        <Route path="/products/:id/reviews" element={<ProductReviews />} />
        <Route path="/subcategories-manager" element={<SubcategoriesManager />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allcategories" element={<AllCategories />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allproducts/:productId" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
