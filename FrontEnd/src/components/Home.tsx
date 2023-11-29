import React from 'react'
import imgHome from '../assets/img/rafiki.jpg'

const Home: React.FC = () => {
  return (
    <div className="mb-11 flex p-10 max-md:flex-col max-md:items-center">
      <div className=" w-1/2 p-4 max-md:w-full max-md:text-center">
        <img src={imgHome} alt="Imagen de pagina Home" className="h-full w-full object-cover" />
      </div>
      <div className="w-1/2 flex-col p-4 px-4 max-md:w-full max-md:text-center">
        <h1 className="mb-4 justify-items-start text-6xl font-bold text-blueLight max-md:text-5xl">
          ¡Bienvenida, Maria!
        </h1>
        <p className="text-lg">
          En Bibliotech vas a poder agregar y actualizar fácilmente libros, buscar en el catálogo
          por género, editorial y titulo, registrar préstamos con fechas precisas, gestionar
          usuarios, editar sus datos y enviarles recordatorios automáticos para devoluciones
        </p>
      </div>
    </div>
  )
}

export default Home
