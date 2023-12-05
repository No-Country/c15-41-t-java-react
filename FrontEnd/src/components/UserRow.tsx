import { IoTrashOutline, IoPencil } from 'react-icons/io5'
import type { User } from '../types/types'

interface UserRowProps {
  key: User['dni']
  user: User
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <>
      <tr>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.dni}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.name}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200  text-center">
          {user.lastName}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.phoneNumber}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200  text-center">
          {user.address}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200  text-center">
          <div className="hover:cursor-pointer">
            <IoPencil />
          </div>
          <div className="hover:cursor-pointer">
            <IoTrashOutline />
          </div>
        </td>
      </tr>
    </>
  )
}
