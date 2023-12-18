import { useState, useEffect } from 'react'
import Spinner from './Spinner'
import { AdminPost } from '@/types/types'
import { useUser } from '@/context/UserContext'
import AdminCard from './AdminCard'
import AddNew from '../../public/icons/Add New.png'
import { IoMdClose } from 'react-icons/io'
import RegisterAdmin from './RegisterAdmin'

const AdminRoute = () => {
  const { fetch } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [admins, setAdmins] = useState<AdminPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const adminData = {
    idAdmin: 0,
    email: '',
    name: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  }

  async function fetchAdmins(): Promise<void> {
    try {
      setIsLoading(true)
      setIsError(false)
      const admin = await fetch('http://localhost:3000/admins')
      setAdmins(admin)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchAdmins().catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <div className="mb-3 flex items-center gap-3 mx-auto w-[85%]">
        <h2 className="text-Darkblue text-2xl">Administradores</h2>
        <img 
        src={AddNew} alt="Add new Admin"
        onClick={() => setIsModalOpen(true)}
        className='hover:cursor-pointer increase-scale' />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="p-10 text-center">Error cargando Administradores</p>
        ) : (
          <div className="grid w-[85%] items-center justify-center gap-x-14 gap-y-5 py-5 align-middle md:grid-cols-2">
            {admins.map(admin => (
              <AdminCard key={admin.idAdmin} {...admin} refresh={fetchAdmins} />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-white opacity-100">
          <RegisterAdmin 
          {...adminData} 
          setIsModalOpen={setIsModalOpen}
          refresh={fetchAdmins} />
          <div
            className="absolute right-4 sm:top-4 text-4xl top-0  cursor-pointer sm:text-5xl font-semibold text-black hover:scale-125"
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

export default AdminRoute
