<<<<<<< Updated upstream
import React from 'react'
import Footer from './components/Footer'
const App: React.FC = () => {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <h1 className="mt-2 text-center text-6xl font-bold text-blue-800">Biblioteca web</h1>
      <Footer />
    </>
=======
import { Login } from './routes/Login.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import { useUser } from './context/UserContext.tsx'
import BookList from './components/BookList.tsx'

const App = () => {
  const { currentUser, setupComplete } = useUser()

  if (setupComplete) {
    return <div>Loading...</div>
  }

  const PrivateLayout = () => (currentUser.isLoggedIn ? <Layout /> : <Navigate to="/" />)

  const RedirectLogin = () => (currentUser.isLoggedIn ? <Navigate to="/home" /> : <Login />)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectLogin />} />
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/libros" element={<BookList />} />
          <Route path="/prestamos" element={<p>Prestamos page</p>} />
          <Route path="/usuarios" element={<p>Usuarios</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes
  )
}

export default App
