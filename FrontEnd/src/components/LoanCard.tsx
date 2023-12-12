import { Loan } from '../types/types'


interface LoanCardProps {
  loan: Loan
}

export default function LoanCard({ loan }: LoanCardProps) {
  return (
    <>
      <div className="flex-col border-x-[0px] border-solid border-slate-400 py-3 w-[80%]">
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
          <span className="font-bold text-black">Fecha: </span> {loan.loanDate}
        </p>
        <p>
          <span className="font-bold text-black">Devolución: </span> {loan.returnExpectedDate}
        </p>
        <button className="flex h-[53px] p-5 my-5 w-auto items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <img className='h-10 text-center p-1' src='../../public/icons/Return.png'></img><p className='p-1'>Devolver libro</p>
        </button>
        <button className="flex h-[53px] p-5 my-5 w-auto items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <img className='h-10 text-center p-1' src='../../public/icons/Notification.png'></img><p className='p-1'>Recordar devolución</p>
        </button>
      </div>
    </>
  )
}
