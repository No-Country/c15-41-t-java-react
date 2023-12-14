import UserRow from './UserRow'
import { useUser } from '../context/UserContext'
import { useState, useEffect } from 'react'
import type { User } from '../types/types'
import { Pagination } from '@mui/material'
import SearchUser from './SearchUser'
import UserCard from './UserCard'
import Spinner from './Spinner'

export default function UsersList() {
  const { fetch } = useUser()
  const [users, setUsers] = useState<User[] | []>([])
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 4
  const [searchResults, setSearchResults] = useState<User[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchResults = (results: any) => {
    setSearchResults(results)
  }

  async function fetchUsers(): Promise<void> {
    try {
      setIsLoading(true)
      setIsError(false)
      const users = await fetch('http://localhost:3000/users/all')
      setUsers(users)
      setSearchResults(users)
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
    <div>
      <SearchUser allUsers={users} onSearchResults={handleSearchResults} setPage={setPage} />
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="p-10 text-center">Error cargando miembros</p>
      ) : (
        <div className="min-h-64 my-10 flex flex-col items-center justify-evenly">
          <table className="min-w-full  table-auto border-collapse rounded border-[1px] border-solid border-slate-800 max-lg:hidden">
            <thead className="p-10">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Celular</th>
                <th>Direccion</th>
                <th>E-mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user, index) => {
                if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
                  return <UserRow key={user.idUser} user={user} refresh={fetchUsers} />
                } else {
                  return null
                }
              })}
            </tbody>
          </table>
          <div className="shrink p-5 lg:hidden">
            {searchResults.map((user, index) => {
              if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
                return <UserCard key={user.idUser} user={user} refresh={fetchUsers} />
              } else {
                return null
              }
            })}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center pb-8">
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
