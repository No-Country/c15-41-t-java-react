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

  return (
    <div className="flex-col p-3">
      <div className="flex w-96 flex-shrink items-center rounded-lg border-[1px] border-solid border-slate-200 p-2 px-4 max-sm:w-[auto]">
        <h1 className="flex-grow text-base font-medium text-blueLight">{`${user.name} ${user.lastName}`}</h1>
        <div
          onClick={() => {
            setIsModalLoansOpen(true)
          }}
          className="px-0.5 hover:cursor-pointer increase-scale"
        >
          <IoEyeOutline size={20} />
        </div>
        <div className="px-0.5 hover:cursor-pointer increase-scale">
          <IoPencil 
          size={20}
          onClick={() => setIsModaEditOpen(true)} />
        </div>
        <div
          onClick={() => {
            setIsModalDeleteOpen(true)
          }}
          className="px-0.5 hover:cursor-pointer increase-scale"
        >
          <IoTrashOutline size={20} />
        </div>
      </div>
      <div className="flex-col p-4">
        <p>
          <span className="font-medium text-black">ID: </span>
          {user.idUser}
        </p>
        <p>
          <span className="font-medium text-black">Celular: </span>
          {user.phoneNumber}
        </p>
        <p>
          <span className="font-medium text-black">Direccion: </span>
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
         <div className="absolute inset-0 z-50 bg-white opacity-100">
         <UserRegisterForm user={user} setIsModalOpen={setIsModaEditOpen} refresh={refresh} />
         <div
           className="absolute right-4 top-1 cursor-pointer text-3xl font-semibold text-black hover:scale-125"
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
