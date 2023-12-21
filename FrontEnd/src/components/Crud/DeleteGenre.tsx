import { useUser } from '../../context/UserContext'
import toast from 'react-hot-toast'
import overflowYdisable from '../../utils/overflowYdisable'

interface Props {
  setIsModalDeleteOpen: (value: boolean) => void
  deleteEntity: any | null
  refresh: () => void
}

const DeleteGenre: React.FC<Props> = ({ setIsModalDeleteOpen, refresh, deleteEntity }: Props) => {
  const { fetch } = useUser()
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/books/genres/delete/${deleteEntity.value}`, {
        method: 'DELETE'
      })
      refresh()
      toast.success(`Su género ha sido eliminado`, {
        duration: 3000,
        position: 'top-center',
        icon: '♻'
      })
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, { duration: 4000, position: 'top-center' })
      else
        toast.error(`Hubo un error eliminando su género`, {
          duration: 3000,
          position: 'top-center',
          icon: '♻'
        })
    } finally {
      setIsModalDeleteOpen(false)
    }
  }

  overflowYdisable()

  return (
    <div className="CrudDeleteContainer">
      <div className="CrudDeletePositioner">
        <div className="ml-1 flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">
              Eliminar Género
            </h2>
            <p className="text-lg">
              ¿Estás seguro de que quieres eliminar:{' '}
              <span className="text-red-500">{deleteEntity.label}</span>? Una vez eliminado, no
              podrás recuperarlo. Por favor, confirma tu elección.
            </p>
          </div>
          <div className="flex items-center justify-around gap-4">
            <button className="YesNoButton" onClick={handleDelete}>
              Si
            </button>
            <button
              className="YesNoButton"
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
export default DeleteGenre
