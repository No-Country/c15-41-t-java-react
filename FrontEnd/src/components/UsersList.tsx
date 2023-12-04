import UserRow from './UserRow'
/* CUANDO TENGAMOS LA API USERS LISTA DESMARCAR COMENTARIOS */
/* import { useUser } from '../context/UserContext'
import { useState, useEffect } from 'react' */

export default function UsersList() {
/*   const { fetch } = useUser()
  const [users, setUsers] = useState<User[] | []>([]) // falta saber como van a venir tipados los users
  const [fetchError, setFetchError] = useState(false)
  async function fetchUsers(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8080/bibliotech/api/books/all')
      const users: User[] = await response.json
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

  if (fetchError) { return <p> Error cargando usuarios </p> }
  if (users.length === 0) { return <p>Loading</p> } */

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <UserRow key={'user.id'} user={'user'} />
          {/* mapear los users una vez obtenidos de back */}
        </tbody>
      </table>
    </div>
  )
}
