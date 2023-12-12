import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import LoanCard from './LoanCard'
import { Loan } from '../types/types'
import { Pagination } from '@mui/material'
import Spinner from './Spinner'

export default function LoanRoute() {
  const { fetch } = useUser()
  const [loans, setUsers] = useState<Loan[] | []>([])
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 4
  const [searchResults, setSearchResults] = useState<Loan[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchUsers(): Promise<void> {
    try {
      setIsLoading(true)
      setIsError(false)
      const loans = await fetch('http://localhost:3000/loans')
      setUsers(loans)
      setSearchResults(loans)
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

  return (
    <div className="flex h-full w-full flex-col items-center px-24 max-lg:px-12 max-sm:px-6">
      <h2 className="w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
        Libros en prestamo
      </h2>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Error cargando prestamos</p>
      ) : (
        <div className="grid w-full justify-items-center gap-y-5 py-5 align-middle lg:grid-cols-2">
          {searchResults.map(loan => (
            <LoanCard key={loan.idLoan} loan={loan} />
          ))}
        </div>
      )}
      <div className="justify-self-end pb-8">
        <Pagination
          count={Math.ceil(searchResults.length / PAGE_SIZE)}
          variant="outlined"
          shape="rounded"
          color="primary"
          page={page}
          onChange={(_, value) => {
            setPage(value)
          }}
        />
      </div>
    </div>
  )
}
