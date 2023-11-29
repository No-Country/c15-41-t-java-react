import { Link, Outlet } from 'react-router-dom'
import logotipo from '../../public/isologotipo.png'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <header className="flex h-36 items-center justify-start">
        <img src={logotipo} alt="logo" className="h-full pl-24" />
        <Link
          to="/home"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:text-base"
        >
          Inicio
        </Link>
        <Link
          to="/libros"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:text-base"
        >
          Libros y catalogo
        </Link>
        <Link
          to="/prestamos"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:text-base"
        >
          Prestamos
        </Link>
        <Link
          to="/usuarios"
          className="p-8 text-center text-2xl font-bold text-black no-underline hover:underline max-lg:text-base"
        >
          Usuarios
        </Link>
      </header>
      <main className="m-13">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
