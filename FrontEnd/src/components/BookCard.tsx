import React from 'react'
import type { Book } from '../types/types'

const BookCard: React.FC<Book> = ({ id, image, title, author, genre, editorial }) => {
  return (
    <div className=" flex h-full justify-start gap-3  border-0 border-b border-solid border-black p-3">
      <div className="bg-cover">
        <img className="h-[145px] w-[95px] shadow-lg" src={image} alt={title} />
      </div>
      <div className=" xs:text-sm flex h-auto flex-col lg:gap-2">
        <h3 className="text-lg text-blueLight"> Titulo: {title}</h3>
        <p className="">
          <span className="font-bold text-black">Autor: </span>
          {author}
        </p>
        <p>
          <span className="font-bold text-black">Genero: </span>
          {genre}
        </p>
        <p>
          <span className="font-bold text-black">Editorial: </span>
          {editorial}
        </p>
      </div>
    </div>
  )
}

export default BookCard
