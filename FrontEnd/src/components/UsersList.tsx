import UserRow from './UserRow'
import { useUser } from '../context/UserContext'
import { useState, useEffect } from 'react'
import type { User } from '../types/types'

export default function UsersList() {
  const { fetch } = useUser()
  const [users, setUsers] = useState<User[] | []>([])
  const [fetchError, setFetchError] = useState(false)

  async function fetchUsers(): Promise<void> {
    try {
      setFetchError(false)
      const users = await fetch('http://localhost:3000/users')
      setUsers(users)
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
    return <p> Error cargando usuarios </p>
  }
  if (users.length === 0) {
    return <p>Loading</p>
  }

  return (
    <div className="my-10 flex">
      <table className="min-w-full table-auto border-collapse rounded border-[1px] border-solid border-slate-800">
        <thead className="p-10">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>Direccion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.dni} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
