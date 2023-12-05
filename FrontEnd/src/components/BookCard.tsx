import React from 'react'
import type { Book } from '../types/types'
import imgDelete from '../assets/icons/delete.svg'
import imgEditar from '../assets/icons/Edit.svg'
import { IoMdClose } from 'react-icons/io'
import EditBook from './EditBook'
import DeleteBook from './DeleteBook'

interface Props extends Book {
  refresh: () => void
}

const BookCard: React.FC<Props> = ({
  idBook,
  image,
  title,
  authorDto,
  genre,
  isbn,
  editorialDto,
  quantity,
  refresh
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false)
  const bookData: Book = {
    idBook,
    image,
    title,
    authorDto,
    genre,
    isbn,
    editorialDto,
    quantity,
    idAuthor: authorDto.idAuthor,
    IdEditorial: editorialDto.idEditorial
  }

  return (
    <div>
      <div className="flex h-full justify-between gap-3 border-0 border-b border-solid border-black p-3">
        <div className="bg-cover">
          <img
            className="h-[145px] w-[95px] shadow-lg"
            src={image ?? '/sample/image3.png'}
            alt={title}
          />
        </div>
        <div className="xs:text-sm flex h-auto w-full flex-col lg:gap-2">
          <h3 className="text-lg text-blueLight"> Titulo: {title}</h3>
          <p className="">
            <span className="font-bold text-black">Autor: </span>
            {`${authorDto.name}  ${authorDto.lastName}`}
          </p>
          <p>
            <span className="font-bold text-black">Genero: </span>
            {genre}
          </p>
          <p>
            <span className="font-bold text-black">Editorial: </span>
            {editorialDto.name}
          </p>
        </div>
        <div className="flex flex-col align-middle">
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            <img src={imgEditar} alt="icono editar" />
          </div>
          <div className="hover:cursor-pointer">
            <img
              src={imgDelete}
              alt="icono eliminar"
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <EditBook {...bookData} setIsModalOpen={setIsModalOpen} />
          <div
            className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
            onClick={() => {
              setIsModalOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteBook
            id={bookData.idBook}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            refresh={refresh}
          />
          <div
            className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </div>
  )
}

export default BookCard
