import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import lockIcon from '../assets/lock.svg'
import mailIcon from '../assets/mail.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

interface typeInitialValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('El email no es valido').required('El email es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña es muy corta')
    .max(20, '20 carateres  maximo')
    .required('La contraseña es requerida')
})

export const LoginForm: React.FC = () => {
  const [showPass, setShowPass] = useState(false)

  const onSubmit = (values: typeInitialValues) => {
    console.log(values)
    /*  peticion fetch api  */
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

      <form className="mx-auto w-10/12" action="" onSubmit={handleSubmit}>
        <label className="text-base font-[500] leading-[normal] text-blueDark" htmlFor="email">
          Mail
        </label>
        <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-[#999] hover:border-blueDark active:border-blueDark">
          <img src={mailIcon} alt="Mail Icon" />
          <input
            className="w-full border-0 text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
            name="email"
            type="email"
            placeholder="Ingresá tu email"
            value={values.email}
            onChange={handleChange}
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
            className="w-full border-0 text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
            {errors?.password}
          </small>
        </div>

        <button
          className="shadow-btn h-[53px] w-full rounded-[32px] border-none bg-blueDark py-2 text-[17px] font-bold leading-normal text-white hover:cursor-pointer"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
