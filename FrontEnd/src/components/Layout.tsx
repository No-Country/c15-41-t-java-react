import { Link, Outlet } from 'react-router-dom'
import logotipo from '../assets/BiblioTech.png'

export default function Layout() {
  return (
    <>
      <header className="color-beige flex h-36 items-center">
        <img src={logotipo} alt="aca va la imagen del logo" className="h-full p-8" />
        <Link to="/home" className="p-8 text-2xl font-bold text-black no-underline hover:underline">
          Inicio
        </Link>
        <Link
          to="/libros"
          className="p-8 text-2xl font-bold text-black no-underline hover:underline"
        >
          Libros y catalogo
        </Link>
        <Link
          to="/prestamos"
          className="p-8 text-2xl font-bold text-black no-underline hover:underline"
        >
          Prestamos
        </Link>
        <Link
          to="/usuarios"
          className="p-8 text-2xl font-bold text-black no-underline hover:underline"
        >
          Usuarios
        </Link>
      </header>
      <Outlet />
    </>
  )
}
