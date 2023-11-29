import { Link, Outlet } from 'react-router-dom'
import logotipo from '../../public/isologotipo.png'
import Footer from './Footer'
import { useUser } from '../context/UserContext'

export default function Layout() {
  const { signOut } = useUser()

  return (
    <>
      <header className="flex h-36 items-center justify-start">
        <img
          src={logotipo}
          alt="logo"
          className="h-full pl-24 max-lg:h-24 max-lg:pl-12 max-sm:pl-6"
        />
        <Link
          to="/home"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:hidden"
        >
          Inicio
        </Link>
        <Link
          to="/libros"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:hidden"
        >
          Libros y catalogo
        </Link>
        <Link
          to="/prestamos"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:hidden"
        >
          Prestamos
        </Link>
        <Link
          to="/usuarios"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:hidden"
        >
          Usuarios
        </Link>
        <button
          className="border-none bg-white hover:cursor-pointer max-lg:ml-auto max-lg:mr-12 max-sm:mr-6"
          onClick={signOut}
        >
          <img src="/Logout.png" alt="logout" />
        </button>
      </header>
      <main className="m-13 min-h-[calc(100vh-9rem-4rem)] max-lg:h-[calc(100vh-9rem-104px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
