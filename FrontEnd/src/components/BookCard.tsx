import React from 'react'
import type { Book } from '../types/types'
import imgDelete from '../assets/img/delete.svg'
import { IoMdClose } from 'react-icons/io'
import EditBook from './EditBook'
import DeleteBook from './DeleteBook'

const BookCard: React.FC<Book> = ({
  id,
  image,
  title,
  authorDto,
  genre,
  editorialDto,
  quantity
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false)
  const bookData: Book = {
    id,
    image,
    title,
    authorDto,
    genre,
    editorialDto,
    quantity,
    idAuthor: authorDto.idAuthor,
    IdEditorial: editorialDto.idEditorial
  }

  return (
    <div>
      <div className="flex h-full justify-between gap-3 border-0 border-b border-solid border-black p-3">
        <div className="bg-cover">
          <img className="h-[145px] w-[95px] shadow-lg" src={image} alt={title} />
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
          <div className="hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="27" height="27" fill="url(#pattern0)" />
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_364_1386" transform="scale(0.01)" />
                </pattern>
                <image
                  id="image0_364_1386"
                  width="100"
                  height="100"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD40lEQVR4nO2du44URxSGW1RVL0ggIeHQEkIguk4TIIywLCT6VHNdczFgLGwTYQLgEXgAAgh4AUIIgQRScggAiYAACZAcAOIiQeTl4l2s9qztNTPT9ExXT5+t/j9pstHZv/qbU13V2pmKIgAAAAC0ik63f2uIL2ji+4b4tSF+py3/rsldNzY/GaW8vN2EHWFq/bY1htwNQ+5T6cvyC526U23nDRptHRtyr74oY8FLW3cpWjc91Xb24FA2323IzYwiY4GUy23nD4uNvNJY92YcGf9NYfnJtocRFKpGh/xzT4mSrSvaHkdQqJSna0lJ+HjbYwgOVUOKJr7adv5FSZxkB7TlR9ryA5Ww8yVFEz9sZ0SLmDjln4x1HxZcxMeD3jeeFH47+REFJMP0hDwd9v5RpZTVAhVkGOJZk+THohJGkmL5dlktME+cuCP9MtycJj4d+VwSWz5bpV6niQfK4FlD+YlR6lTolDlD2abmRhIAsc1/rNMZo3SKJr7mfwQBEXvqjIqd8nIp5av9pe9EZ3BtGUOkzGjKMx91gyT2PE2VT1/8Vlne77NuUMQNd0YfG3llI3VDIG5IhqH8aO8xi7tn7PZv/CUOmLg5GSd6df6te8tf6kCJJyejWNre95c8QGKbHZ6UDGPdR0X5Xn/pAyNuaDVlUv6tTwbxn8byr/7SB4aybl/xf1KQIQAFGXJQkCEHBRlyUJDRaRm/+EsfGAoy5KAo34vOEIKCjI7KsO5D8fjFX/rAUJAhBwUZclCQIQcFGXJQkCEHRdn3WE0JQUFGh2UQH/KXPjAUZMhBQYYcFGTIQUGGHBRkyAEyxMno+1JLQ0tbfo+lLWQsDtAZghjy3bs5TFOQ0W0m3xnuoL/0gQEZgoAMQUCGICBDEJAhCMgQBGQIAjK6LCPNf/CXPjBU4vZAhhAgQxCQIQjIEARkCAIyBAEZgoAMQQz5UWBs+toAMgShkizv74yGfhaP+B1+Fq+cJcVplZAhBL0h2zKxe0aSHfCXPFC05TN9U0rK0+PWwzRVE2P55oBDSMb6NKMz6rKalxpyfww5GWYkKZDhb6lbdlxPJSmQ4Qlj+XypkApSIMMjmvjuF4WUSIEMn9gdq/o3bdWlQIZnDLmfK8v4TApkNIAmd3FkIfP7lAGdNVNn7wJ6Qp6MJ8TPngUsYCrldb5k4AAsD+jUnaoro3ggWTwl9pGn82jrrozeDe6jIb5jiM8p4p3R5s2m8xfSF8a65xVu3rN/71Msn1c22xV9/d0ybwHA/ykOcB84DZF70lt95Uej9fwVrtuEKD7x81KeFdNXcU+Z2pCvndTfBwAAAEA0Fn8BmSqcpFkTVEMAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <div className="hover:cursor-pointer">
            <img src={imgDelete} alt="icono eliminar" onClick={() => setIsModalDeleteOpen(true)} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <EditBook {...bookData} setIsModalOpen={setIsModalOpen} />
          <div
            className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </div>
        </div>
      )}
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteBook id={bookData.id} setIsModalDeleteOpen={setIsModalDeleteOpen} />
          <div
            className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
            onClick={() => setIsModalDeleteOpen(false)}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </div>
  )
}

export default BookCard
