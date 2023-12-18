import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useUser } from '../../context/UserContext'
import { NavBarMobile } from './NavBarMobile'
import imgAdmin from '../../../public/icons/User Account.png'
export default function Layout() {
  const { signOut } = useUser()

  return (
    <>
      <header className="mr-24 flex h-36 items-center justify-around">
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
          Libros y catálogo
        </Link>
        <Link
          to="/prestamos"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Préstamos
        </Link>
        <Link
          to="/miembros"
          className="p-8 text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Miembros
        </Link>

        <div className="ml-12 flex items-end justify-center gap-2 sm:ml-20">
          <button
            className="border-none bg-white hover:cursor-pointer max-lg:ml-auto max-lg:mr-12 max-sm:mr-6 "
            onClick={signOut}
          >
            <img src="/icons/Logout.png" alt="logout" />
          </button>
          <div className="border-none bg-white text-5xl hover:cursor-pointer">
            <Link to={'/admin'}>
              <img src={imgAdmin} alt="admin" />
            </Link>
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-9rem-4rem)] max-lg:mb-40 max-lg:min-h-[calc(100vh-9rem-104px)]">
        <Outlet />
      </main>
      <NavBarMobile />
      <Footer />
    </>
  )
}
