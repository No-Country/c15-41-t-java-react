import { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import { generateTempId } from '@/utils/function'
import { AdminPost } from '@/types/types'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '@/utils/overflowYdisable'

interface AdminProps {
  idAdmin: number
  email: string
  name: string
  lastName: string
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  refresh?: () => void
  isItSelf: boolean
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('El email no es valido')
    .required('El email es obligatorio')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$/,
      'El email no es válido'
    ),
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña es muy corta')
    .max(20, '20 carateres  maximo')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9.!@#$&*%_\-=]+$/,
      'La contraseña debe tener una Mayuscula y al menos  un numero'
    )
    .when('isEditMode', {
      is: false,
      then: schema => schema.required('La contraseña es requerida')
    }),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .nullable()
    .when('isEditMode', {
      is: false,
      then: schema => schema.required('La confirmación de la contraseña es requerida')
    }),
  isEditMode: Yup.boolean()
})

const RegisterAdmin: React.FC<AdminProps> = props => {
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    fetch,
    currentUser: { userName },
    signOut,
    updateName
  } = useUser()
  const onSubmit = async (values: AdminPost) => {
    let valuesToSend: {
      email: string
      name: string
      lastName: string
      password?: string
    } = {
      email: values.email,
      name: values.name,
      lastName: values.lastName
    }

    if (values.password !== '') {
      valuesToSend['password'] = values.password
    }

    try {
      setIsLoading(true)
      if (isEditMode) {
        const putOptions = {
          method: 'PUT',
          body: JSON.stringify(valuesToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch(`http://localhost:3000/admins/update/${values.idAdmin}`, putOptions)
        if (props.isItSelf) {
          if (props.email !== values.email || values.password !== '') {
            signOut()
            toast.success('Actualizaste tus datos correctamente, vuelve a iniciar sesión', {
              duration: 4000,
              position: 'top-center'
            })
          } else {
            if (values.name !== userName) {
              updateName(values.name)
              // INFO Este metodo genera un re-render por lo que cuando se cumpla este bloque, no necesita cerrar el modal...
            }
            if (props.refresh) props.refresh()
            toast.success('Actualizaste tus datos correctamente', {
              duration: 4000,
              position: 'top-center'
            })
            props.setIsModalOpen(false)
          }
        } else {
          if (props.refresh) props.refresh()
          toast.success('El administrador se editó correctamente', {
            duration: 4000,
            position: 'top-center'
          })
          props.setIsModalOpen(false)
        }
      } else {
        const postOptions = {
          method: 'POST',
          body: JSON.stringify(valuesToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await fetch('http://localhost:3000/admins/save', postOptions)
        if (props.refresh) props.refresh()
        toast.success('El administrador se registro correctamente', {
          duration: 4000,
          position: 'top-center'
        })
        resetForm()
        props.setIsModalOpen(false)
      }
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, {
          duration: 2000,
          position: 'top-center'
        })
      else
        toast.error('Error al registrar el administrador', {
          duration: 1500
        })
    } finally {
      setIsLoading(false)
    }
  }

  const isEditMode = !!props.idAdmin

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      idAdmin: isEditMode ? props.idAdmin : generateTempId(),
      email: props.email || '',
      name: props.name || '',
      lastName: props.lastName || '',
      password: '',
      passwordConfirm: '',
      isEditMode
    },
    validationSchema,
    onSubmit
  })
  overflowYdisable()
  return (
    <div className="CrudCreateAndEditContainer">
      <div className="CrudCreateAndEditPositioner">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          {isEditMode
            ? props.isItSelf
              ? 'Editar mis datos'
              : `Actualización del Administrador ${props.name} ${props.lastName}`
            : 'Registro de nuevo Administrador'}
          <span className="text-[12px] text-blueDark sm:text-sm ">
            {' '}
            <br />
            (Los campos con * son obligatorios){' '}
          </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <div className="mb-14">
            <label className="formLabel" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="email"
                type="email"
                placeholder="Ingrese el mail del Administrador"
                value={values.email}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors.email}</small>
            </div>
          </div>
          <div className="mb-14">
            <label className="formLabel" htmlFor="name">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                type="text"
                name="name"
                placeholder="Ingresá el nombre del Administrador"
                value={values.name}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors.name}</small>
            </div>
          </div>
          <div className="mb-14">
            <label className="formLabel" htmlFor="lastName">
              Apellido <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                type="text"
                name="lastName"
                placeholder="Ingresá el apellido del Administrador"
                value={values.lastName}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors.lastName}</small>
            </div>
          </div>
          <div className="mb-14">
            <label className="formLabel" htmlFor="password">
              {isEditMode ? 'Nueva contraseña' : 'Contraseña '}
              {!isEditMode && <span className="text-red-500">*</span>}
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={values.password}
                onChange={handleChange}
              />
              <div className="flex justify-between">
                <small className="errorContainer">{errors.password}</small>
                <div
                  className="cursor-pointer self-end"
                  onClick={() => {
                    setShowPass(!showPass)
                  }}
                >
                  {showPass ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-14">
            <label className="formLabel" htmlFor="passwordConfirm">
              {isEditMode ? 'Confirmar nueva contraseña' : 'Confirmar contraseña '}
              {!isEditMode && <span className="text-red-500">*</span>}
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="passwordConfirm"
                type={showPass ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={values.passwordConfirm}
                onChange={handleChange}
              />
              <div className="flex justify-between">
                <small className="errorContainer">{errors.passwordConfirm}</small>
                <div
                  className="cursor-pointer self-end"
                  onClick={() => {
                    setShowPass(!showPass)
                  }}
                >
                  {showPass ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                </div>
              </div>
            </div>
          </div>
          <div className="pb-10">
            <button
              className="flex h-[53px] w-full items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-5 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="absolute h-4 w-4 animate-spin rounded-full border-solid border-x-blueDark"></div>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
      <div
        className="closeModal"
        onClick={() => {
          props.setIsModalOpen(false)
        }}
      >
        <IoMdClose />
      </div>
    </div>
  )
}

export default RegisterAdmin
