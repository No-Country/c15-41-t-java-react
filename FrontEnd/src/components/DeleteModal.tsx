import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface Props {
  id: number
  setIsModalDeleteOpen: (value: boolean) => void
  deleteEntity: string
  refresh: () => void
}

const DeleteModal: React.FC<Props> = ({
  id,
  setIsModalDeleteOpen,
  refresh,
  deleteEntity
}: Props) => {
  const { fetch } = useUser()
  let spanishDeleteEntity: string = ''
  let deleteUrl: string = ''
  switch (deleteEntity) {
    case 'book':
      spanishDeleteEntity = 'libro'
      deleteUrl = `http://localhost:3000/books/delete/${id}`
      break
    case 'user':
      spanishDeleteEntity = 'miembro'
      deleteUrl = `http://localhost:3000/users/delete/${id}`
      break
    default:
      break
  }
  const handleDelete = () => {
    fetch(deleteUrl, {
      method: 'DELETE'
    })
      .then(() => {
        refresh()
        toast.success(`Su ${spanishDeleteEntity} ha sido eliminado`, {
          duration: 3000,
          position: 'top-center',
          icon: '♻'
        })
      })
      .catch(error => {
        toast.error(`Hubo un error eliminando su ${spanishDeleteEntity}`, {
          duration: 3000,
          position: 'top-center',
          icon: '♻'
        })
        console.error(error)
      })
    setIsModalDeleteOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
      <div className="mx-auto w-[80%] rounded-xl bg-gray-200 p-10 md:w-[50%] lg:w-[60%] lg:p-20 xl:w-[50%]">
        <div className="ml-1 flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">
              Eliminar {spanishDeleteEntity}
            </h2>
            <p className="text-justify text-lg">
              ¿Estás seguro de que quieres eliminar este {spanishDeleteEntity}? Una vez eliminado,
              no podrás recuperarlo. Por favor, confirma tu elección.
            </p>
          </div>
          <div className="flex items-center justify-around gap-4">
            <button
              className="flex h-10 w-[50%] items-center justify-center rounded-[32px] border-none bg-blueDark text-xl font-extrabold leading-normal text-white shadow-btn hover:cursor-pointer xl:h-12"
              onClick={handleDelete}
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
export default DeleteModal
