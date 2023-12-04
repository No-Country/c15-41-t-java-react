import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { useUser } from './context/UserContext.tsx'
import { Login } from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Catalogue from './pages/Catalogue.tsx'
import UsersTabs from './pages/UsersTabs.tsx'

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
          <Route path="/usuarios" element={<UsersTabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
