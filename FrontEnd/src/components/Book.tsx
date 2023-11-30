import React from 'react'

type Props = {
  id: number
  title: string
  author: string
  genere: string
  editorial: string
  image: string
}

const Book: React.FC<Props> = ({ id, image, title, author, genere, editorial }) => {
  return (
    <div className="flex items-center gap-3  border-0 border-b border-solid border-black p-3">
      <div className="ml-4 object-cover">
        <img className="" src={image} alt={title} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-blueLight"> Titulo: {title}</h3>
        <p className="">
          <span className="font-bold text-black">Autor: </span>
          {author}
        </p>
        <p>
          <span className="font-bold text-black">Genero: </span>
          {genere}
        </p>
        <p>
          <span className="font-bold text-black">Editorial: </span>
          {editorial}
        </p>
      </div>
    </div>
  )
}

export default Book
