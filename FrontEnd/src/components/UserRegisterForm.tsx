import { useFormik } from 'formik'
import type { FormikValues } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import { User } from '../types/types'

interface UserProps {
  user: User
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function generateTempId() {
  return new Date().getTime()
}
const validationSchema = Yup.object({
  dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^\d{8}$/, 'El DNI debe tener 8 dígitos numéricos'),
  name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un nombre válido'),
  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un nombre válido'),
  email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
  phoneNumber: Yup.string()
    .required('El celular es obligatorio')
    .matches(/^\d{10}$/, 'Ingresa un número de celular válido'),
  address: Yup.string().required('La dirección es obligatoria')
})

const UserRegisterForm: React.FC<UserProps> = ({ user, setIsModalOpen }: UserProps) => {
  const { fetch } = useUser()

  const isEditMode = !!user.idUsers

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      idUsers: isEditMode ? user.idUsers : generateTempId(),
      dni: user.dni || '',
      name: user.name || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || ''
    },
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    console.log(values)
    try {
      if (isEditMode) {
        // Si estamos en modo edición
        const putOptions = {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch(`http://localhost:3000/Users/${values.idUsers}`, putOptions)
        toast.success('El Socio se editó correctamente', {
          duration: 4000,
          position: 'top-center'
        })
      } else {
        // Si no estamos en modo edición, estamos registrando un nuevo usuario
        const postOptions = {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch('http://localhost:3000/Users', postOptions)
        toast.success('El Socio se agregó correctamente', {
          duration: 4000,
          position: 'top-center'
        })
      }

      resetForm()
      setIsModalOpen(false) // Cerrar el modal después de enviar el formulario
    } catch (error) {
      toast.error('Error al procesar la solicitud', {
        duration: 4000,
        position: 'top-center'
      })
    }
  }

  return (
    <div className="px-2 py-10">
      <div className="mx-auto w-full rounded-[40px] bg-grey  sm:max-w-[70%]">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          {user.name
            ? `Actualización del Socio: ${user.name} ${user.lastName}`
            : 'Registro de un Socio Nuevo'}
          <span className="text-sm text-red-500"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <label className="text-base font-bold leading-[normal] text-blueLight " htmlFor="title">
            DNI <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="dni"
              type="text"
              disabled={isEditMode}
              placeholder="0"
              value={values.dni}
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors.dni}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="quantity">
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="name"
              type="text"
              placeholder="Ingresá el Nombre "
              value={values.name}
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.name}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="author">
            Apellido <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="lastName"
              type="text"
              value={values.lastName}
              placeholder="Ingresá el apellido "
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.lastName}
            </small>
          </div>

          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="genre">
            Celular <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="phoneNumber"
              type="text"
              value={values.phoneNumber}
              placeholder="Ingresá numero de télefono"
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.phoneNumber}
            </small>
          </div>
          <label
            className="text-base font-bold leading-[normal] text-blueLight"
            htmlFor="editorial"
          >
            Direccion <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="address"
              type="text"
              value={values.address}
              onChange={handleChange}
              placeholder="Ingresá la direccion"
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.address}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="image">
            Mail <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Ingresá el correo"
            />

            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.email}
            </small>
          </div>
          <div className="pb-10">
            <button
              className="flex h-[53px] w-full items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegisterForm
