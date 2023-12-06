import { IoTrashOutline, IoPencil } from 'react-icons/io5'
import type { User } from '../types/types'
import DeleteModal from './DeleteModal'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import UserRegisterForm from './UserRegisterForm'

interface UserRowProps {
  key: User['idUsers']
  user: User
  refresh: () => Promise<void>
}

export default function UserRow({ user, refresh }: UserRowProps) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <tr>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.idUsers}
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
          {user.email}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200  text-center">
          <div className="text-base hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <IoPencil size={20} />
          </div>

          <div
            onClick={() => {
              setIsModalDeleteOpen(true)
            }}
            className="hover:cursor-pointer"
          >
            <IoTrashOutline size={20} />
          </div>
        </td>
      </tr>
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteModal
            id={user.idUsers}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            deleteEntity="user"
            refresh={refresh}
          />
          <div
            className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className='fixed inset-0 z-50  bg-white opacity-100'>
            <UserRegisterForm 
            user={user}
            setIsModalOpen={setIsModalOpen}/>
            <div
             className="absolute right-4 top-4 cursor-pointer text-5xl font-semibold text-black hover:scale-125"
             onClick={() => {
               setIsModalOpen(false)
             }}
            >
               <IoMdClose />
            </div>
        </div>
      )}
    </>
  )
}
