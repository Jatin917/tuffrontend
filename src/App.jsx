import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import AdminLogin from './components/AdminLogin/AdminLogin'
import PrivateRoute from './Routes/PrivateRoute'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import { useState } from 'react'

const App = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("re render ", isAuthenticated);
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
        path="/admin-login"
        element={isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin onLogin={setIsAuthenticated} />}
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute
            element={<AdminDashboard />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
    </Routes>
  </BrowserRouter>
}

export default App
