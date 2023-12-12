import { Loan } from '../types/types'

interface LoanCardProps {
  loan: Loan
}

export default function LoanCard({ loan }: LoanCardProps) {
  return (
    <>
      <div className="w-[80%] flex-col border-x-[0px] border-solid border-slate-400 py-3">
        <h1 className="flex-grow py-3 text-xl font-bold text-blueLight">{loan.bookDto.title}</h1>
        <p>
          <span className="font-bold text-black">ISBN: </span> {loan.bookDto.isbn}
        </p>
        <p>
          <span className="font-bold text-black">Id admin: </span> {loan.idAdmin}
        </p>
        <p>
          <span className="font-bold text-black">Id usuario: </span> {loan.idUser}
        </p>
        <p>
          <span className="font-bold text-black">Nombre de usuario: </span>{' '}
          {`${loan.userDto.name} ${loan.userDto.lastName}`}
        </p>
        <p>
          <span className="font-bold text-black">Fecha de prestamo: </span> {loan.loanDate}
        </p>
        <p>
          <span className="font-bold text-black">Devolución: </span> {loan.returnExpectedDate}
        </p>
        <div className='flex md:flex-col max-[525px]:flex-col'>
        <button className="my-3 max-md:mx-2 flex h-[53px] w-5/6 items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark p-5 py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <img className="h-10 p-1 text-center" src="../../public/icons/Return.png"></img>
          <p className="p-1">Devolver libro</p>
        </button>
        <button className="my-3 max-md:mx-2 flex h-[53px] w-5/6 items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark p-5 py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <img className="h-10 p-1 text-center" src="../../public/icons/Notification.png"></img>
          <p className="p-1">Recordar devolución</p>
        </button>
        </div>
      </div>
    </>
  )
}
