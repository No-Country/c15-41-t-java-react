import { useState, useEffect } from 'react'
import Spinner from './Spinner'
import { AdminPost } from '@/types/types'
import { useUser } from '@/context/UserContext'
import AdminCard from './AdminCard'
import { IoMdClose } from 'react-icons/io'
import RegisterAdmin from './RegisterAdmin'

const AdminRoute = () => {
  const {
    fetch,
    currentUser: { idAdmin: currIdAdmin }
  } = useUser()
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
    passwordConfirm: ''
  }

  async function fetchAdmins(): Promise<void> {
    try {
      setIsLoading(true)
      setIsError(false)
      const admin = await fetch('http://localhost:3000/admins/all')
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
      <div className="mx-auto mb-3 flex w-[85%] items-center gap-3">
        <h2 className="text-Darkblue text-2xl">Administradores</h2>
        <img
          src="/icons/Add New.png"
          alt="Add new Admin"
          onClick={() => setIsModalOpen(true)}
          className="increase-scale hover:cursor-pointer"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="p-10 text-center">Error cargando Administradores</p>
        ) : (
          <div className="grid w-[85%] items-center justify-center gap-x-14 gap-y-5 py-5 align-middle md:grid-cols-2">
            {admins.map(admin => (
              <AdminCard
                key={admin.idAdmin}
                {...admin}
                refresh={fetchAdmins}
                isItSelf={currIdAdmin === admin.idAdmin}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-white opacity-100">
          <RegisterAdmin
            {...adminData}
            setIsModalOpen={setIsModalOpen}
            refresh={fetchAdmins}
            isItSelf={false}
          />
          <div
            className="absolute right-4 top-0 cursor-pointer text-4xl  font-semibold text-black hover:scale-125 sm:top-4 sm:text-5xl"
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
