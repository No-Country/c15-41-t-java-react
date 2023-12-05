import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface Props {
  id: number
  setIsModalDeleteOpen: (value: boolean) => void
}

const DeleteBook: React.FC<Props> = ({ id, setIsModalDeleteOpen }: Props) => {
  const { fetch } = useUser()
  const handleDelete = () => {
    fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE'
    }).catch(error => {
      console.error(error)
    })
    toast('Su libro ha sido eliminado', { duration: 3000, position: 'top-center', icon: '♻' })
    setIsModalDeleteOpen(false)
  }

  return (
    <div className="justify-content mx-auto mt-[250px] flex h-[40%] w-[70%] flex-col items-center gap-3 rounded-[20px] bg-gray-200 px-20 py-20">
      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col items-start">
          <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">Eliminar Libro</h2>
          <p>
            ¿Estás seguro de que quieres eliminar este libro? Una vez eliminado, no podrás
            recuperarlo. Por favor, confirma tu elección.
          </p>
        </div>
        <div className="flex w-full items-center justify-around gap-2">
          <button
            className="flex  w-[350px] items-center justify-center rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleDelete}
          >
            Si
          </button>
          <button
            className="flex  w-[350px] items-center justify-center  rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook
