import { useUser } from '@/context/UserContext'
import { Loan } from '@/types/types'
import toast from 'react-hot-toast'

interface ReturnModalProps {
  loan: Loan
  setIsModalOpen: (value: boolean) => void
  refresh: () => void
}

export default function ReturnModal({ loan, setIsModalOpen, refresh }: ReturnModalProps) {
  const { fetch } = useUser()
  async function handleReturn(loan: Loan) {
    const putOptions = {
      method: 'PUT'
    }
    try {
      await fetch(`http://localhost:3000/loans/return/${loan.idLoan}`, putOptions)
      refresh()
      toast.success('Se realizo la devolucion correctamente', {
        duration: 4000,
        position: 'top-center'
      })
    } catch (error) {
      console.error(error)
      toast.error('Hubo un error al intentar devolver el libro', {
        duration: 4000,
        position: 'top-center'
      })
    }
    setIsModalOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-scroll bg-white max-lg:mt-20 lg:items-center">
      <div className="mx-auto h-fit w-[80%] rounded-xl bg-gray-200 p-10 md:w-[50%] lg:w-[60%] lg:p-20 xl:w-[50%]">
        <div className="ml-1 flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <h2 className="mb-3 text-2xl font-bold leading-normal text-blueDark">
              Devolver {loan.bookDto.title}
            </h2>
            <p className="text-lg">
              ¿Estás seguro de que quieres devolver este libro:{' '}
              <span className=" font-extrabold text-blueDark">{loan.bookDto.title}</span>? Prestado
              a:{' '}
              <span className=" font-extrabold text-blueDark">{`${loan.userDto.name} ${loan.userDto.lastName}`}</span>{' '}
              Por favor, confirma tu elección.
            </p>
          </div>
          <div className="flex items-center justify-around gap-4">
            <button
              className="flex h-10 w-[50%] items-center justify-center rounded-[32px] border-none bg-blueDark text-xl font-extrabold leading-normal text-white shadow-btn hover:cursor-pointer xl:h-12"
              onClick={() => handleReturn(loan)}
            >
              Si
            </button>
            <button
              className="flex h-10 w-[50%] items-center justify-center rounded-[32px] border-none bg-blueDark text-xl font-extrabold leading-normal text-white shadow-btn hover:cursor-pointer xl:h-12"
              onClick={() => {
                setIsModalOpen(false)
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
