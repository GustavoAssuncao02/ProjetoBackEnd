import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CategoriesManager from './pages/categories/CategoriesManager'
import Login from './pages/login/login'
import Profile from './pages/profile/Profile'
import ProductsManager from './pages/products/ProductsManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoriesManager />} />
        <Route path="/products" element={<ProductsManager />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App