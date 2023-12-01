import { Login } from './routes/Login.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import { useUser } from './context/UserContext.tsx'
import Catalogue from './components/Catalogue.tsx'
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
          <Route path="/libros" element={<Catalogue />} />
          <Route path="/prestamos" element={<p>Prestamos page</p>} />
          <Route path="/usuarios" element={<p>Usuarios</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
