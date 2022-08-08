import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Fishes from './pages/Fishes'
import Datas from './pages/Datas'
import User from './pages/User'

import Login from 'pages/Login'
import Register from 'pages/Register'
import './components/layout/Sidebar.css'
import React from 'react'

function App() {
  const [auth, setAuth] = React.useState<string>(localStorage.getItem('UserData'))

  return (
    <Routes>
      <Route path="/" element={auth ? <Datas /> : <Navigate replace to="/login" />} />
      <Route path="/peixes" element={auth ? <Fishes /> : <Navigate replace to="/login" />} />
      <Route path="/dados" element={auth ? <Datas /> : <Navigate replace to="/login" />} />
      <Route path="/usuarios" element={auth ? <User /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={auth ? <Login /> : <Login />} />
      <Route path="/register" element={auth ? <Register /> : <Register />} />
    </Routes>
  )
}

export default App
