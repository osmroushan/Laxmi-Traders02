import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import FormPage from './pages/FormPage'
import Success from './pages/Success'
import Admin from './pages/Admin'
import './styles.css'
function App(){ return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/form' element={<FormPage/>} />
      <Route path='/success' element={<Success/>} />
      <Route path='/admin' element={<Admin/>} />
    </Routes>
  </BrowserRouter>
)}
createRoot(document.getElementById('root')).render(<App/>)
