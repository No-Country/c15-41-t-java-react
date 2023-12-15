import { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface FormValues {
  email: string
  name: string
  lastName: string
  password: string
  passwordConfirm: string
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('El email no es valido')
    .required('El email es obligatorio')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$/,
      'El email no es válido'
    ),
  password: Yup.string()
    .min(8, 'La contraseña es muy corta')
    .max(20, '20 carateres  maximo')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9.!@#$&*%_\-=]+$/,
      'La contraseña debe tener una Mayuscula y al menos  un numero'
    )
    .required('La contraseña es requerida'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .nullable() // Agrega esta validación para permitir valores nulos
    .required('La confirmación de la contraseña es requerida')
})

const RegisterAdmin = () => {
  const [showPass, setShowPass] = useState(false)
  const {fetch} = useUser()
  const onSubmit = async (values: FormValues) => {
    const valuesToSend = {
      email: values.email,
      name: values.name,
      lastName: values.lastName,
      password: values.password,
   
  }
  console.log(valuesToSend)
  /*
  try {
    const postOptions = {
      method: 'POST',
      body: JSON.stringify(valuesToSend),
    }
    await fetch('http://localhost:3000/admin', postOptions)
    toast.success('Administrador registrado con éxito', {
      duration: 1500
    })
 
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

  }
  */
}

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastName: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit
  })

  return (
    <div className="flex justify-center px-2 py-10">
      <div className="sm:max-h[40%]  rounded-[40px] bg-grey sm:max-w-[70%] xl:w-full">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Registro de nuevo Administrador
          <span className="text-sm text-blueDark"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <div className="mb-14">
            <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
              <input
                className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
                name="email"
                type="email"
                placeholder="Ingrese el mail del Administrador"
                value={values.email}
                onChange={handleChange}
              />
              <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                {errors.email}
              </small>
            </div>
          </div>
          <div className="mb-14">
            <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="name">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="relative flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
              <input
                className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
                type="text"
                name="name"
                placeholder="Ingresá el nombre del Administrador"
                value={values.name}
                onChange={handleChange}
              />
              <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                {errors.name}
              </small>
            </div>
          </div>
          <div className="mb-14">
            <label
              className="text-base font-bold leading-[normal] text-blueLight"
              htmlFor="lastName"
            >
              Apellido <span className="text-red-500">*</span>
            </label>
            <div className="relative flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
              <input
                className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
                type="text"
                name="lastName"
                placeholder="Ingresá el apellido del Administrador"
                value={values.lastName}
                onChange={handleChange}
              />
              <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                {errors.lastName}
              </small>
            </div>
          </div>
          <div className="mb-14">
            <label
              className="text-base font-bold leading-[normal] text-blueLight"
              htmlFor="password"
            >
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid  hover:border-blueDark">
              <input
                 className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={values.password}
                onChange={handleChange}
              />
              <div
                className="cursor-pointer self-end"
                onClick={() => {
                  setShowPass(!showPass)
                }}
              >
                {showPass ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
              </div>
              <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                {errors.password}
              </small>
            </div>
          </div>
          <div className="mb-14">
            <label
              className="text-base font-bold leading-[normal] text-blueLight"
              htmlFor="passwordConfirm"
            >
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid  hover:border-blueDark">
              <input
                 className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
                name="passwordConfirm"
                type={showPass ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={values.passwordConfirm}
                onChange={handleChange}
              />
              <div
                className="cursor-pointer self-end"
                onClick={() => {
                  setShowPass(!showPass)
                }}
              >
                {showPass ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
              </div>
              <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                {errors.passwordConfirm}
              </small>
            </div>
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

export default RegisterAdmin
