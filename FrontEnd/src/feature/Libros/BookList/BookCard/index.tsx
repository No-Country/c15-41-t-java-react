import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'
import type { Book } from '@/types/types'
import DeleteModal from '@/components/DeleteModal'
import EditBook from './EditBook'
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
            <IoPencil size={23} />
          </div>
          <div
            className="increase-scale hover:cursor-pointer"
            onClick={() => {
              setIsModalDeleteOpen(true)
            }}
          >
            <IoTrashOutline size={23} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-scroll bg-white opacity-100 lg:pb-14">
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
        </div>
      )}
      {isModalDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-white">
          <div className="relative flex h-full w-11/12 flex-row justify-center pt-20">
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
