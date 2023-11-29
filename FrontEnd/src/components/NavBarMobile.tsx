import { Link } from 'react-router-dom'
import imgBook from '../assets/icons-mobile/Book.png'
import imgCustomer from '../assets/icons-mobile/Customer.png'
import imgHome from '../assets/icons-mobile/Home.png'
import imgOpenBook from '../assets/icons-mobile/OpenBook.png'

export const NavBarMobile: React.FC = () => {
  return (
    <nav className=" grid h-fit w-full grid-cols-4 items-center bg-[#000842] py-10">
      <Link
        to="/home"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src={imgHome} alt="Icono de home" />
        Inicio
      </Link>
      <Link
        to="/libros"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src={imgOpenBook} alt="Icono de libro abierto" />
        Libros
      </Link>
      <Link
        to="/prestamos"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src={imgBook} alt="Icono de libro" />
        Prestamos
      </Link>
      <Link
        to="/usuarios"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src={imgCustomer} alt="Icono de usuario" />
        Usuarios
      </Link>
    </nav>
  )
}
