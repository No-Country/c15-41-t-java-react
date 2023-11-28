import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Login } from './routes/Login.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<App />} />
          <Route path="/libros" element={<p>Libros page</p>} />
          <Route path="/prestamos" element={<p>Prestamos page</p>} />
          <Route path="/usuarios" element={<p>Usuarios</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
