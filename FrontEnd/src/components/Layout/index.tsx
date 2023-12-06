import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useUser } from '../../context/UserContext'
import { NavBarMobile } from './NavBarMobile'

export default function Layout() {
  const { signOut } = useUser()

  return (
    <>
      <header className="flex h-36 items-center justify-start">
        <Link to="/home" className="ml-24 h-full max-lg:ml-12 max-lg:h-24 max-sm:ml-6">
          <img src="/brand/isologotipo.png" alt="logo" className="h-full w-auto" />
        </Link>
        <Link
          to="/home"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Inicio
        </Link>
        <Link
          to="/libros"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Libros y catalogo
        </Link>
        <Link
          to="/prestamos"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Prestamos
        </Link>
        <Link
          to="/usuarios"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Socios
        </Link>
        <button
          className="border-none bg-white hover:cursor-pointer max-lg:ml-auto max-lg:mr-12 max-sm:mr-6"
          onClick={signOut}
        >
          <img src="/icons/Logout.png" alt="logout" />
        </button>
      </header>
      <main className="min-h-[calc(100vh-9rem-4rem)] max-lg:min-h-[calc(100vh-9rem-104px)]">
        <Outlet />
      </main>
      <NavBarMobile />
      <Footer />
    </>
  )
}
