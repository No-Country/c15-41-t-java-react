import { useState } from 'react'
import { AdminPost } from '@/types/types'
import { IoPencil } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import RegisterAdmin from './RegisterAdmin'

interface PropsAdmin extends AdminPost {
 refresh?: () => void
}

const AdminCard: React.FC<PropsAdmin> = Props => {
  const { email, name, lastName, password} = Props
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
  return (
    <div>
      <div className="flex h-full w-full gap-3 border-0 border-t border-solid border-black p-3 overflow-hidden">
        <div className="flex flex-col w-full">
          <div className='flex items-center justify-between'>
            <h3 className="text-2xl text-blueLight"> {`${name}  ${lastName}`}</h3>
            <IoPencil 
            onClick={() => setIsModalEditOpen(true)} 
            size={20} 
            className='hover:cursor-pointer increase-scale' />
          </div>
          <p className="text-lg">
            {' '}
            <span className="text-xl font-[500]">Mail: </span>
            {email}
          </p>
        </div>
      </div>
      {isModalEditOpen && (
        <div className="absolute inset-0 z-50 bg-white opacity-100">
          <RegisterAdmin {...Props}
           passwordConfirm={password}
           setIsModalOpen={setIsModalEditOpen}
           refresh={Props.refresh}
           />
          <div
            className="absolute right-4 sm:top-4 text-4xl top-0  cursor-pointer sm:text-5xl font-semibold text-black hover:scale-125"
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
