import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { useUser } from './context/UserContext.tsx'
import { Login } from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Catalogue from './pages/Catalogue.tsx'
import UsersTabs from './pages/UsersTabs.tsx'
import { Toaster } from 'react-hot-toast'
import LoanRoute from './components/LoanRoute.tsx'

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
          <Route path="/prestamos" element={<LoanRoute />} />
          <Route path="/miembros" element={<UsersTabs />} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'rgb(214, 251, 214)',
              border: '1px solid green'
            }
          },
          error: {
            style: {
              background: 'rgb(253, 221, 221)',
              border: '1px solid red'
            }
          },
          style: {
            border: '1px solid black'
          }
        }}
      />
    </BrowserRouter>
  )
}

export default App
