import { useState, useEffect } from 'react'
import type { User, Loan } from '../types/types'
import { useUser } from '../context/UserContext'
import Spinner from './Spinner'

interface UserLoansProps {
  user: User
}

export default function UserLoans({ user }: UserLoansProps) {
  const [allLoans, setAllLoans] = useState<Loan[] | []>([])
  const [userLoans, setUserLoans] = useState<Loan[] | []>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { fetch } = useUser()

  async function fetchUsers(): Promise<void> {
    try {
      setIsLoading(true)
      setIsError(false)
      const loans = await fetch('http://localhost:3000/loans/all')
      setAllLoans(loans)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers().catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const filtered = allLoans.filter(loan => loan.idUser === user.idUser)
    setUserLoans(filtered)
  }, [allLoans])

  return (
    <div className=" relative flex h-5/6 w-full flex-row items-center justify-center">
      <div className="flex flex-col items-center rounded-xl border-[1px] border-solid border-[#c6e9ff] bg-white bg-opacity-5 p-6 shadow-2xl">
        <div className="flex-col p-3">
          <div className="flex w-96 flex-shrink items-center rounded-lg border-[1px] border-solid border-slate-200 bg-[#0A7ABF] bg-opacity-5 p-2 px-4 max-sm:w-[auto]">
            <h1 className="flex-grow text-base font-medium text-blueLight">{`${user.name} ${user.lastName}`}</h1>
          </div>
          <div className="flex-col p-4">
            <p>
              <span className="font-medium text-black">ID: </span>
              {user.idUser}
            </p>
            <p>
              <span className="font-medium text-black">Celular: </span>
              {user.phoneNumber}
            </p>
            <p>
              <span className="font-medium text-black">Direccion: </span>
              {user.address}
            </p>
            <p>
              <span className="font-medium text-black">Email: </span>
              {user.email}
            </p>
          </div>
          <div className="flex w-96 flex-shrink items-center rounded-lg border-[1px] border-solid border-slate-200 bg-[#0A7ABF] bg-opacity-5 p-2 px-4 max-sm:w-[auto]">
            <h1 className="flex-grow text-base font-medium text-blueLight">Sus préstamos:</h1>
          </div>
          <ul className="flex-col p-4">
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <p>Error cargando prestamos</p>
            ) : userLoans.length > 0 ? (
              userLoans.map(loan => {
                return (
                  <li className="ml-4" key={loan.idBook}>
                    {loan.bookDto.title}
                  </li>
                )
              })
            ) : (
              <p>No tiene préstamos en curso</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
