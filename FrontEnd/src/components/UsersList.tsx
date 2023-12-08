import UserRow from './UserRow'
import { useUser } from '../context/UserContext'
import { useState, useEffect } from 'react'
import type { User } from '../types/types'
import { Pagination } from '@mui/material'
import SearchUser from './SearchUser'
import UserCard from './UserCard'

export default function UsersList() {
  const { fetch } = useUser()
  const [users, setUsers] = useState<User[] | []>([])
  const [fetchError, setFetchError] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 4
  const [searchResults, setSearchResults] = useState<User[] | []>([])

  const handleSearchResults = (results: any) => {
    setSearchResults(results)
  }

  async function fetchUsers(): Promise<void> {
    try {
      setFetchError(false)
      const users = await fetch('http://localhost:3000/users/all')
      setUsers(users)
      setSearchResults(users)
    } catch (error) {
      console.error(error)
      setFetchError(true)
    }
  }
  useEffect(() => {
    fetchUsers().catch(error => {
      console.log(error)
    })
  }, [])

  if (fetchError) {
    return <p>Error cargando usuarios </p>
  }
  if (users.length === 0) {
    return <p className="mt-4">No hay registros</p>
  }

  return (
    <div>
      <SearchUser allUsers={users} onSearchResults={handleSearchResults} setPage={setPage} />
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
        <div className="p-5 shrink lg:hidden">
          {searchResults.map((user, index) => {
            if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
              return <UserCard key={user.idUser} user={user} refresh={fetchUsers} />
            } else {
              return null
            }
          })}
        </div>
        <div className="mt-4 justify-self-end pb-8">
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
    </div>
  )
}
