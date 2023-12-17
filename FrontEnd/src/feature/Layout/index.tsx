import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useUser } from '../../context/UserContext'
import { NavBarMobile } from './NavBarMobile'
import { IoIosPersonAdd, IoMdClose } from 'react-icons/io'
import RegisterAdmin from '../../components/RegisterAdmin'

export default function Layout() {
  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false)
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
        <div className="ml-12 flex">
          <button className="border-none bg-white hover:cursor-pointer  " onClick={signOut}>
            <img src="/icons/Logout.png" alt="logout" />
          </button>
          <button
            className="border-none bg-white text-5xl hover:cursor-pointer "
            onClick={() => setIsModalAdminOpen(!isModalAdminOpen)}
          >
            <IoIosPersonAdd />
          </button>
        </div>
      </header>
      <main className="min-h-[calc(100vh-9rem-4rem)] max-lg:mb-40 max-lg:min-h-[calc(100vh-9rem-104px)]">
        <Outlet />
      </main>
      <NavBarMobile />
      <Footer />
      {isModalAdminOpen && (
        <div className="fixed inset-0 z-50  overflow-y-auto bg-white opacity-100">
          <RegisterAdmin />
          <div
            className="increase-scale absolute right-4 top-2 cursor-pointer text-3xl font-semibold text-black sm:top-4 sm:text-5xl"
            onClick={() => {
              setIsModalAdminOpen(!isModalAdminOpen)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </>
  )
}
