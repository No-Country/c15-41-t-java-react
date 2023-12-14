import React from 'react'
import type { Book } from '../types/types'
import imgDelete from '../assets/icons/delete.svg'
import imgEditar from '../assets/icons/Edit.svg'
import { IoMdClose } from 'react-icons/io'
import EditBook from './EditBook'
import DeleteModal from './DeleteModal'
import BookDetail from './BookDetail'

interface Props extends Book {
  refresh: () => void
}

const BookCard: React.FC<Props> = ({
  idBook,
  image,
  title,
  isbn,
  authorDto,
  genre,
  editorialDto,
  quantity,
  refresh
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false)
  const [isModalDetails, setIsModalDetails] = React.useState(false)
  const bookData: Book = {
    idBook,
    image,
    isbn,
    title,
    authorDto,
    genre,
    editorialDto,
    quantity,
    idAuthor: authorDto.idAuthor,
    idEditorial: editorialDto.idEditorial
  }

  return (
    <div>
      <div className="flex h-full justify-between gap-3 border-0 border-b border-solid border-black p-3 ">
        <div
          className="flex h-full w-full cursor-pointer justify-between gap-3 hover:shadow-xl "
          onClick={() => setIsModalDetails(true)}
        >
          <div className="bg-cover">
            <img
              className="h-[145px] w-[95px] shadow-lg "
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
              {genre.charAt(0) + genre.toLowerCase().slice(1)}
            </p>
            <p>
              <span className="font-bold text-black">Editorial: </span>
              {editorialDto.name}
            </p>
            <p className="font-bold text-blueDark">
              Cantidad disponible de copias: <span className="font-normal">{quantity}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col align-middle">
          <div
            className="increase-scale hover:cursor-pointer"
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            <img src={imgEditar} alt="icono editar" />
          </div>
          <div className="increase-scale hover:cursor-pointer">
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
        <div className="absolute inset-0 z-50 bg-white opacity-100">
          <EditBook
            {...bookData}
            setIsModalOpen={setIsModalOpen}
            id={bookData.idBook}
            refresh={refresh}
          />
          <div
            className="increase-scale absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black"
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
          <DeleteModal
            id={bookData.idBook}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            deleteEntity="book"
            refresh={refresh}
          />
          <div
            className="increase-scale absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black"
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
      {isModalDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative flex h-full w-11/12 flex-row items-center justify-center">
            <BookDetail
              id={bookData.idBook}
              {...bookData}
              refresh={() => {
                refresh()
                
              }}
              setIsModalDetails={setIsModalDetails}
            />
            <div
              className="increase-scale absolute right-0 top-2 cursor-pointer text-5xl font-semibold text-black"
              onClick={() => {
                setIsModalDetails(false)
              }}
            >
              <IoMdClose />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookCard
