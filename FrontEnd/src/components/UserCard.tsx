import { IoPencil, IoTrashOutline, IoEyeOutline } from 'react-icons/io5'
import { User } from '../types/types'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import { IoMdClose } from 'react-icons/io'
import UserLoans from './UserLoans'
import UserRegisterForm from './UserRegisterForm'

interface UserCardProps {
  key: User['idUser']
  user: User
  refresh: () => Promise<void>
}

export default function UserCard({ user, refresh }: UserCardProps) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalLoansOpen, setIsModalLoansOpen] = useState(false)
  const [isModaEditlOpen, setIsModaEditOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex-col p-3">
      <div className="flex w-96 flex-shrink items-center rounded-lg border-[1px] border-solid border-slate-200 p-2 px-4 max-sm:w-[auto]">
        <h1 className="flex-grow text-base font-medium text-blueLight">{`${user.name} ${user.lastName}`}</h1>
        <div
          onClick={() => {
            setIsModalLoansOpen(true)
          }}
          className="increase-scale px-0.5 hover:cursor-pointer"
        >
          <IoEyeOutline size={20} />
        </div>
        <div className="increase-scale px-0.5 hover:cursor-pointer">
          <IoPencil size={20} onClick={() => setIsModaEditOpen(true)} />
        </div>
        <button
          className="increase-scale border-none bg-transparent hover:cursor-pointer"
          onClick={() => setIsModalDeleteOpen(true)}
          disabled={isLoading}
        >
          {' '}
          {isLoading ? (
            <div className="absolute h-4 w-4 animate-spin rounded-full border-solid border-x-blueDark"></div>
          ) : (
            <IoTrashOutline size={23} />
          )}
        </button>
      </div>
      <div className="flex-col p-4">
        <p>
          <span className="font-medium text-black">DNI: </span>
          {user.dni}
        </p>
        <p>
          <span className="font-medium text-black">Celular: </span>
          {user.phoneNumber}
        </p>
        <p>
          <span className="font-medium text-black">Dirección: </span>
          {user.address}
        </p>
        <p>
          <span className="font-medium text-black">Email: </span>
          {user.email}
        </p>
      </div>
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteModal
            name={`${user.name} ${user.lastName}`}
            id={user.idUser}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            deleteEntity="user"
            refresh={refresh}
            setIsLoading={setIsLoading}
          />
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
      {isModaEditlOpen && (
        <div className="CrudCreateAndEditContainer">
          <UserRegisterForm user={user} setIsModalOpen={setIsModaEditOpen} refresh={refresh} />
          <div
            className="closeModal"
            onClick={() => {
              setIsModaEditOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </div>
  )
}
