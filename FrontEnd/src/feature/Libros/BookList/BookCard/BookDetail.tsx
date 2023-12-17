import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Book } from '@/types/types'
import RegisterLoan from '@/components/RegisterLoan'
import overflowYdisable from '@/utils/overflowYdisable'

interface PropsDetail extends Book {
  id: number
  refresh: () => void
  setIsModalDetails: (value: boolean) => void
}

const BookDetail: React.FC<PropsDetail> = props => {
  const { title, image, authorDto, genre, editorialDto, isbn, quantity, setIsModalDetails } = props
  const [isLoan, setIsLoan] = useState(false)
  overflowYdisable()
  return (
    <div className="shadow-2xlflex flex h-fit flex-col items-center rounded-xl border-[1px] border-solid border-[#c6e9ff] bg-[#0A7ABF] bg-opacity-5 p-10  max-[300px]:p-4">
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
        <p>
          <span className="font-bold text-black">ISBN: </span>
          {isbn}
        </p>

        <p>
          <span className="font-bold text-black">Cantidad: </span>
          {quantity}
        </p>
      </div>
      <button
        className="mt-5 flex h-[45px] w-full items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark  py-3 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsLoan(!isLoan)}
        disabled={quantity === 1}
      >
        Prestar Libro
      </button>
      {quantity === 1 ? (
        <small className="text-sm text-red-500">
          la cantidad debe ser mayor a 1 <br /> para poder prestar este libro
        </small>
      ) : (
        ''
      )}
      {isLoan && (
        <div className="fixed inset-0 z-50  overflow-y-auto bg-white opacity-100">
          <RegisterLoan {...props} />
          <div
            className="increase-scale absolute right-4 top-2 cursor-pointer text-3xl font-semibold text-black sm:top-4 sm:text-5xl "
            onClick={() => {
              setIsLoan(!isLoan)
              setIsModalDetails(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetail
