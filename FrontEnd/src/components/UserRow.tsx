import { IoTrashOutline, IoPencil, IoEyeOutline } from 'react-icons/io5'
import type { User } from '../types/types'
import DeleteModal from './DeleteModal'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import UserRegisterForm from './UserRegisterForm'
import UserLoans from './UserLoans'

interface UserRowProps {
  key: User['idUser']
  user: User
  refresh: () => Promise<void>
}

export default function UserRow({ user, refresh }: UserRowProps) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLoansOpen, setIsModalLoansOpen] = useState(false)

  return (
    <>
      <tr className="h-12">
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.idUser}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.name}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.lastName}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.phoneNumber}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.address}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          {user.email}
        </td>
        <td className="border-[1px] border-x-0 border-solid border-slate-200 text-center">
          <div className="flex items-center justify-end">
            <div
              onClick={() => {
                setIsModalLoansOpen(true)
              }}
              className="increase-scale mr-1 h-full hover:cursor-pointer"
            >
              <IoEyeOutline size={20} />
            </div>
            <div
              className="increase-scale mr-1 text-base hover:cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <IoPencil size={20} />
            </div>
            <div
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
              className="increase-scale mr-1 hover:cursor-pointer"
            >
              <IoTrashOutline size={20} />
            </div>
          </div>
        </td>
      </tr>
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteModal
            id={user.idUser}
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
        <div className="absolute inset-0 z-50 bg-white opacity-100">
          <UserRegisterForm user={user} setIsModalOpen={setIsModalOpen} refresh={refresh} />
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
      {isModalLoansOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <UserLoans user={user} />
          <div
            className="increase-scale absolute right-2 top-2 cursor-pointer text-5xl font-semibold text-black"
            onClick={() => {
              setIsModalLoansOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </>
  )
}
