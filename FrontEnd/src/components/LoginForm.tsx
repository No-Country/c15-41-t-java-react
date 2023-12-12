import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import lockIcon from '../assets/icons/lock.svg'
import mailIcon from '../assets/icons/mail.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

interface typeInitialValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: ''
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
    .required('La contraseña es requerida')
})

export const LoginForm: React.FC = () => {
  const { signIn, signInWaiting } = useUser()

  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (values: typeInitialValues) => {
    try {
      await signIn(values.email, values.password, navigate)
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, {
          duration: 2000
        })
      else
        toast.error('Error al iniciar sesión', {
          duration: 2000
        })
    }
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <div className="w-full">
      <h2 className="mx-auto mb-14 w-10/12 text-3xl font-bold leading-normal text-blueLight">
        Iniciar sesión
      </h2>

      <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
        <label className="text-base font-[500] leading-[normal] text-blueDark" htmlFor="email">
          Mail
        </label>
        <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-[#999] hover:border-blueDark active:border-blueDark">
          <img src={mailIcon} alt="Mail Icon" />
          <input
            className="w-full border-0 text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:opacity-50"
            name="email"
            type="email"
            placeholder="Ingresá tu email"
            value={values.email}
            onChange={handleChange}
            disabled={signInWaiting}
          />
          <small className="absolute -bottom-6 text-xs font-bold text-red-500">
            {errors?.email}
          </small>
        </div>

        <label className="text-base font-[500] leading-[normal] text-blueDark" htmlFor="password">
          Contraseña
        </label>
        <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-[#999] hover:border-blueDark">
          <img src={lockIcon} alt="Lock Icon" />
          <input
            className="w-full border-0 text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:opacity-50"
            name="password"
            type={showPass ? 'text' : 'password'}
            placeholder="Ingresá tu contraseña"
            value={values.password}
            onChange={handleChange}
            disabled={signInWaiting}
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
            {errors?.password}
          </small>
        </div>

        <button
          className="relative flex h-[53px] w-full items-center justify-center gap-x-2 rounded-[32px] border-none bg-blueDark py-2 text-[17px] font-bold leading-normal text-white shadow-btn hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={signInWaiting}
        >
          {signInWaiting ? (
            <div className="absolute h-4 w-4 animate-spin rounded-full border-solid border-x-blueDark"></div>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </form>
    </div>
  )
}
