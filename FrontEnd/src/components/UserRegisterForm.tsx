import { useState } from 'react'
import { useFormik } from 'formik'
import type { FormikValues } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import { User } from '../types/types'
import { generateTempId } from '../utils/function'
import overflowYdisable from '@/utils/overflowYdisable'

interface UserProps {
  user: User
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  refresh?: () => void
  onSuccess?: () => void
}

const validationSchema = Yup.object({
  dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^(?:\d{7}|\d{8}|\d{10})$/, 'El DNI debe tener 7, 8 o 10 dígitos numéricos'),
  name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un nombre válido'),
  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ'\s]+$/, 'Ingresa un nombre válido'),
  email: Yup.string()
    .email('El email no es valido')
    .required('El email es obligatorio')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$/,
      'El email no es válido'
    ),
  phoneNumber: Yup.string()
    .required('El celular es obligatorio')
    .matches(/^\d{10}$/, 'Ingresa un número de celular válido'),
  address: Yup.string()
    .required('La dirección es obligatoria')
    .matches(
      /^[A-Za-z0-9\sáéíóúÁÉÍÓÚñÑ,#-]{5,40}$/,
      'Ingresa una dirección válida no puede superar los 40 caracteres'
    )
})

const UserRegisterForm: React.FC<UserProps> = ({
  user,
  setIsModalOpen,
  refresh,
  onSuccess
}: UserProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { fetch } = useUser()

  const isEditMode = !!user.idUser

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      idUser: isEditMode ? user.idUser : generateTempId(),
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
    try {
      setIsLoading(true)
      if (isEditMode) {
        // Si estamos en modo edición
        const putOptions = {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch(`http://localhost:3000/users/update/${values.idUser}`, putOptions)
        if (refresh) refresh()
        toast.success('El Miembro se editó correctamente', {
          duration: 4000,
          position: 'top-center'
        })
      } else {
        // Si no estamos en modo edición, estamos registrando un nuevo miembroo
        const { idUser, ...rest } = values
        const postOptions = {
          method: 'POST',
          body: JSON.stringify(rest),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch('http://localhost:3000/users/save', postOptions)
        if (onSuccess) onSuccess()
        toast.success('El Miembro se agregó correctamente', {
          duration: 4000,
          position: 'top-center'
        })
      }

      resetForm()
      setIsModalOpen(false) // Cerrar el modal después de enviar el formulario
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, { duration: 4000, position: 'top-center' })
      else toast.error('Error al procesar el Miembro', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }
  isEditMode ? overflowYdisable() : null
  return (
    <div className="flex justify-center px-2 pb-10 pt-20">
      <div className="sm:max-h[40%]  w-11/12 max-w-[650px] rounded-[40px] bg-grey ">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          {user.name
            ? `Actualización del Miembro: ${user.name} ${user.lastName}`
            : 'Registro de un Miembro Nuevo'}
          <br />
          <span className="text-sm text-blueDark"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12 " onSubmit={handleSubmit}>
          <label className="formLabel" htmlFor="title">
            DNI <span className="text-red-500">*</span>
          </label>

          <div className="ReactSelectContainer">
            <input
              className="ReactSelect"
              name="dni"
              type="text"
              // disabled={isEditMode}
              placeholder="0"
              value={values.dni}
              onChange={handleChange}
            />
            <small className="errorContainer">{errors.dni}</small>
          </div>
          <div className="grid-cols-2 gap-x-6 sm:grid">
            <div>
              <label className="formLabel" htmlFor="quantity">
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="ReactSelectContainer">
                <input
                  className="ReactSelect"
                  name="name"
                  type="text"
                  placeholder="Ingresá el Nombre "
                  value={values.name}
                  onChange={handleChange}
                />
                <small className="errorContainer">{errors?.name}</small>
              </div>
            </div>
            <div>
              <label className="formLabel" htmlFor="author">
                Apellido <span className="text-red-500">*</span>
              </label>
              <div className="ReactSelectContainer">
                <input
                  className="ReactSelect"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  placeholder="Ingresá el apellido "
                  onChange={handleChange}
                />
                <small className="errorContainer">{errors?.lastName}</small>
              </div>
            </div>
          </div>
          <div className="grid-cols-2 gap-x-6 sm:grid">
            <div>
              <label className="formLabel" htmlFor="genre">
                Celular <span className="text-red-500">*</span>
              </label>
              <div className="ReactSelectContainer">
                <input
                  className="ReactSelect"
                  name="phoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  placeholder="Ingresá número de télefono"
                  onChange={handleChange}
                />
                <small className="errorContainer">{errors?.phoneNumber}</small>
              </div>
            </div>
            <div>
              <label className="formLabel" htmlFor="editorial">
                Dirección <span className="text-red-500">*</span>
              </label>
              <div className="ReactSelectContainer">
                <input
                  className="ReactSelect"
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Ingresá la direccion"
                />
                <small className="errorContainer">{errors?.address}</small>
              </div>
            </div>
          </div>
          <label className="formLabel" htmlFor="image">
            Mail <span className="text-red-500">*</span>
          </label>
          <div className="ReactSelectContainer">
            <input
              className="ReactSelect"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Ingresá el correo"
            />

            <small className="errorContainer">{errors?.email}</small>
          </div>
          <div className="pb-10">
            <button
              className="flex h-[53px] w-full items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {' '}
              {isLoading ? (
                <div className="absolute h-4 w-4 animate-spin rounded-full border-solid border-x-blueDark"></div>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegisterForm
