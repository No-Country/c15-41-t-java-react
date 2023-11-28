import React from 'react'
import imgHome from '../assets/img/rafiki.jpg'

const Home: React.FC = () => {
  return (
    <div className="flex ">
      <div className="w-1/2">
        <img src={imgHome} alt="Imagen de pagina Home" className="h-full w-full object-cover" />
      </div>
      <div className="flex w-1/2 flex-col justify-center px-4">
        <h1 className="mb-4 text-6xl font-bold text-blueLight">¡Bienvenida, Maria! </h1>
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
