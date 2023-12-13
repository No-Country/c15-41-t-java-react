import { Link } from 'react-router-dom'

export const NavBarMobile: React.FC = () => {
  return (
    <nav className="fixed bottom-0 z-50 hidden h-fit w-full grid-cols-4 items-center bg-[#000842] py-10 max-lg:grid">
      <Link
        to="/home"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src="/icons/mobile/Home.png" alt="Icono de home" />
        Inicio
      </Link>
      <Link
        to="/libros"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src="/icons/mobile/OpenBook.png" alt="Icono de libro abierto" />
        Libros
      </Link>
      <Link
        to="/prestamos"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src="/icons/mobile/Book.png" alt="Icono de libro" />
        Préstamos
      </Link>
      <Link
        to="/miembros"
        className="text-md mx-auto flex w-12 flex-col items-center gap-y-2 text-center font-bold text-white no-underline hover:underline"
      >
        <img className="w-full" src="/icons/mobile/Customer.png" alt="Icono de miembro" />
        Miembros
      </Link>
    </nav>
  )
}
