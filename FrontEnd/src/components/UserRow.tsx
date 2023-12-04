import { IoTrashOutline, IoPencil } from 'react-icons/io5'
/* DE ACUERDO AL TIPADO AGREGAR LOS CAMPOS CORRESPONDIENTES */

export default function UserRow({ user }) {
  return (
    <>
      <tr>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          user.id
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          user.name
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          user.lastName
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          user.telephone
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          user.address
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 py-5 text-center">
          <IoTrashOutline />
          <IoPencil />
        </td>
      </tr>
    </>
  )
}
