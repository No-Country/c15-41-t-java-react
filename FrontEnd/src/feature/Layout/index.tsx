import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useUser } from '../../context/UserContext'
import { NavBarMobile } from './NavBarMobile'
export default function Layout() {
  const { signOut } = useUser()

  return (
    <>
      <header className="mx-auto flex h-36 w-[90%] items-center justify-between lg:w-[90%]">
        <Link to="/home" className="h-full  max-lg:h-24 ">
          <img src="/brand/isologotipo.png" alt="logo" className="h-full w-auto" />
        </Link>
        <Link
          to="/home"
          className=" text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Inicio
        </Link>
        <Link
          to="/libros"
          className=" text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Libros y catálogo
        </Link>
        <Link
          to="/prestamos"
          className=" text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Préstamos
        </Link>
        <Link
          to="/miembros"
          className=" text-center text-2xl text-black no-underline hover:underline max-lg:hidden"
        >
          Miembros
        </Link>

        <div className="flex items-center justify-end gap-2 ">
          <button
            className="border-none bg-white hover:cursor-pointer max-lg:ml-auto max-lg:mr-12 max-sm:mr-6 "
            onClick={signOut}
          >
            <img src="/icons/Logout.png" alt="logout" />
          </button>
          <div className="border-none bg-white text-5xl hover:cursor-pointer">
            <Link to={'/admin'}>
              <img src="/icons/User Account.png" alt="admin" className="h-full" />
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
