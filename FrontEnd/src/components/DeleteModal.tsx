import overflowYdisable from '@/utils/overflowYdisable'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface Props {
  name: string
  id: number
  setIsModalDeleteOpen: (value: boolean) => void
  deleteEntity: string
  refresh: () => void
  setIsLoading: (value: boolean) => void
}

const DeleteModal: React.FC<Props> = ({
  name,
  id,
  setIsModalDeleteOpen,
  refresh,
  deleteEntity,
  setIsLoading
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
    setIsLoading(true)
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
        if (
          error.message !== undefined &&
          typeof error.message === 'string' &&
          error.message !== ''
        )
          toast.error(error.message, { duration: 4000, position: 'top-center' })
        else
          toast.error(`Hubo un error eliminando su ${spanishDeleteEntity}`, {
            duration: 3000,
            position: 'top-center',
            icon: '♻'
          })
      })
      .finally(() => {
        setIsLoading(false)
        setIsModalDeleteOpen(false)
      })
  }
  overflowYdisable()
  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-scroll bg-white max-lg:mt-20 lg:items-center">
      <div className="mx-auto h-fit w-[80%] rounded-xl bg-gray-200 p-10 md:w-[50%] lg:w-[60%] lg:p-20 xl:w-[50%]">
        <div className="ml-1 flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">
              Eliminar {name}
            </h2>
            <p className="text-lg">
              ¿Estás seguro de que quieres eliminar este {spanishDeleteEntity}:{' '}
              <span className=" font-extrabold text-blueDark">{name}</span> ? Una vez eliminado, no
              podrás recuperarlo. Por favor, confirma tu elección.
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
