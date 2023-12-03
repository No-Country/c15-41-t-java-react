import UserRow from './UserRow'

export default function UsersList() {
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
          <UserRow user={'user'} />
        </tbody>
      </table>
    </div>
  )
}
