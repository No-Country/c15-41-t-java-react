import React from 'react'
import { useUser } from '../context/UserContext'

const Home: React.FC = () => {
  const { currentUser } = useUser()

  return (
    <div className="flex min-h-screen p-10 max-lg:p-2 max-md:flex-col max-md:items-center">
      <div className="w-1/2 p-4 max-md:w-full max-md:text-center">
        <img
          src="/brand/rafiki.jpg"
          alt="Imagen de pagina Home"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-1/2 flex-col p-4 px-4 max-md:w-full max-md:text-center">
        <h1 className="mb-4 justify-items-start text-6xl font-bold text-blueLight max-md:text-2xl">
          ¡Bienvenid@, {currentUser.userName}!
        </h1>
        <p className="text-justify text-lg">
          En Bibliotech vas a poder agregar y actualizar fácilmente libros, buscar en el catálogo
          por género, editorial y título, registrar préstamos con fechas precisas, gestionar
          miembros, editar sus datos y enviarles recordatorios automáticos para devoluciones.
        </p>
      </div>
    </div>
  )
}

export default Home
