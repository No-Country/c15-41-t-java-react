import { useState, useEffect } from "react"
import Spinner from "./Spinner"
import { AdminPost } from "@/types/types"
import { useUser } from "@/context/UserContext"
import AdminCard from "./AdminCard"



const AdminRoute= () => {
  const { fetch } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [admins, setAdmins] = useState<AdminPost[]>([])

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
    <div className="flex h-full w-full flex-col items-center">
  {isLoading ? (
    <Spinner />
  ) : isError ? (
    <p className="p-10 text-center">Error cargando Administradores</p>
  ) : (
    <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
      {admins.map((admin) => (
        <AdminCard key={admin.idAdmin} {...admin} />
      ))}
    </div>
  )}
</div>
  )
}

export default AdminRoute