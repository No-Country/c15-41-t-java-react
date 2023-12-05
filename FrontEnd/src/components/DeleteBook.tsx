import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface Props {
  id: number
  setIsModalDeleteOpen: (value: boolean) => void
  refresh: () => void
}

const DeleteBook: React.FC<Props> = ({ id, setIsModalDeleteOpen, refresh }: Props) => {
  const { fetch } = useUser()
  const handleDeleteBook = () => {
    fetch(`http://localhost:3000/books/delete/${id}`, {
      method: 'DELETE'
    })
      .catch(error => {
        console.error(error)
      })
      .then(() => {
        refresh()
        toast('Su libro ha sido eliminado', { duration: 3000, position: 'top-center', icon: '♻' })
      })
    setIsModalDeleteOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
      <div className="mx-auto w-[80%] rounded-xl bg-gray-200 p-10 md:w-[50%] lg:w-[60%] lg:p-20 xl:w-[50%]">
        <div className="ml-1 flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">Eliminar Libro</h2>
            <p className="text-justify text-lg">
              ¿Estás seguro de que quieres eliminar este libro? Una vez eliminado, no podrás
              recuperarlo. Por favor, confirma tu elección.
            </p>
          </div>
          <div className="flex items-center justify-around gap-4">
            <button
              className="flex h-10 w-[50%] items-center justify-center rounded-[32px] border-none bg-blueDark text-xl font-extrabold leading-normal text-white shadow-btn hover:cursor-pointer xl:h-12"
              onClick={handleDeleteBook}
            >
              Si
            </button>
            <button
              className="flex h-10 w-[50%] items-center justify-center rounded-[32px] border-none bg-blueDark text-xl font-extrabold leading-normal text-white shadow-btn hover:cursor-pointer xl:h-12"
              onClick={() => {
                setIsModalDeleteOpen(false)
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteBook
