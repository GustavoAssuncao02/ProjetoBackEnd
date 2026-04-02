import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login/login'
import EditProfile from './pages/profile/EditProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App