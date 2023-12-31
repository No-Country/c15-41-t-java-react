import { Loan } from '../types/types'
import { useState } from 'react'
import ReturnModal from './ReturnModal'
import { IoMdClose } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useUser } from '@/context/UserContext'

interface LoanCardProps {
  loan: Loan
  refresh: () => void
}

export default function LoanCard({ loan, refresh }: LoanCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [countClick, setCountClick] = useState(0)
  const { fetch } = useUser()

  const addClick = () => {
    setCountClick(countClick + 1)
  }

  async function handleNotificacion(id: Loan['idLoan']) {
    try {
      setIsLoading(true)
      await fetch(`http://localhost:3000/loans/sendMail/${id}`)
      toast.success('Se envio la notificación correctamente', {
        duration: 4000,
        position: 'top-center'
      })
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, { duration: 4000, position: 'top-center' })
      else toast.error('Error al enviar notificación', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="w-[80%] flex-col border-x-[0px] border-solid border-slate-400 py-3">
        <h1 className="flex-grow py-3 text-xl font-bold text-blueLight">{loan.bookDto.title}</h1>
        <p>
          <span className="font-bold text-black">ISBN: </span> {loan.bookDto.isbn}
        </p>
        <p>
          <span className="font-bold text-black">Administrador: </span>{' '}
          {`${loan.adminDto.name} ${loan.adminDto.lastName}`}
        </p>
        <p>
          <span className="font-bold text-black">DNI de miembro: </span> {loan.userDto.dni}
        </p>
        <p>
          <span className="font-bold text-black">Nombre de miembro: </span>{' '}
          {`${loan.userDto.name} ${loan.userDto.lastName}`}
        </p>
        <p>
          <span className="font-bold text-black">Fecha de préstamo: </span> {loan.loanDate}
        </p>
        <p>
          <span className="font-bold text-black">Devolución: </span> {loan.returnExpectedDate}
        </p>
        <div className="mt-3 flex max-[525px]:flex-col md:flex-col">
          <button
            onClick={() => setIsModalOpen(true)}
            className="my-3 flex h-[53px] w-5/6 items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark p-5 py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 max-md:mx-2 max-md:text-sm"
          >
            <img className="h-10 p-1 text-center max-md:h-9" src="/icons/Return.png"></img>
            <p className="p-1">Devolver libro</p>
          </button>
          <button
            onClick={() => handleNotificacion(loan.idLoan)}
            className="my-3 flex h-[53px] w-5/6 items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark p-5 py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 max-md:mx-2 max-md:text-sm"
            disabled={isLoading}
          >
            <img className="h-10 p-1 text-center max-md:h-9" src="/icons/Notification.png"></img>
            <p className="p-1">Recordar devolución</p>
            {isLoading && (
              <div className="ml-2 h-4 w-4 animate-spin rounded-full border-solid border-x-blueDark"></div>
            )}
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50  bg-white opacity-100">
            <ReturnModal
              loan={loan}
              setIsModalOpen={setIsModalOpen}
              refresh={refresh}
              counter={countClick}
              addClick={addClick}
            />
            <div
              className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              <IoMdClose />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
