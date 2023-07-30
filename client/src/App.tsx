import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Layout from './pages/layout'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/chatApp" element={<Layout />} />
      </Routes>
    </div>
  )
}

export default App
