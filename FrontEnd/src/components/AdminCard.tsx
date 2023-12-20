import { useState } from 'react'
import { AdminPost } from '@/types/types'
import { IoPencil } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import RegisterAdmin from './RegisterAdmin'

interface PropsAdmin extends AdminPost {
  refresh?: () => void
}

const AdminCard: React.FC<PropsAdmin> = Props => {
  const { email, name, lastName, password } = Props
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
  return (
    <div>
      <div className="flex h-full w-full gap-3 overflow-hidden border-0 border-t border-solid border-black p-3">
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-blueLight"> {`${name}  ${lastName}`}</h3>
            <IoPencil
              onClick={() => setIsModalEditOpen(true)}
              size={20}
              className="increase-scale hover:cursor-pointer"
            />
          </div>
          <p className="text-lg">
            {' '}
            <span className="text-xl font-[500]">Mail: </span>
            {email}
          </p>
        </div>
      </div>
      {isModalEditOpen && (
        <div className="absolute inset-0 z-50 overflow-y-scroll bg-white opacity-100 max-lg:pb-[140px]">
          <RegisterAdmin
            {...Props}
            passwordConfirm={password}
            setIsModalOpen={setIsModalEditOpen}
            refresh={Props.refresh}
          />
          <div
            className="absolute right-4 top-0 cursor-pointer text-4xl  font-semibold text-black hover:scale-125 sm:top-4 sm:text-5xl"
            onClick={() => {
              setIsModalEditOpen(false)
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCard
