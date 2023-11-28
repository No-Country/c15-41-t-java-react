import { MdOutlineEmail, MdLockOutline } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
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

  console.log(errors)
  return (
    <div className="">
      <h2 className="mx-auto mb-10 w-10/12 text-blueLight">Iniciar sesión</h2>
      <form
        className="mx-auto flex w-10/12 flex-col justify-center gap-2"
        action=""
        onSubmit={handleSubmit}
      >
        <label className="font-bold text-blueDark" htmlFor="email">
          Mail
        </label>
        <div className="mb-8 flex h-6 w-full items-center gap-2 border-0 border-b-2 border-solid border-slate-500 hover:border-blueDark">
          <MdOutlineEmail />
          <input
            className="w-full border-0 focus:outline-none"
            name="email"
            type="email"
            placeholder="maria@booktech.com"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <small className="font-bold text-red-500">{errors?.email}</small>
        <label className="font-semibold text-blueDark" htmlFor="password">
          Contraseña
        </label>
        <div className="mb-8 flex h-6 w-full items-center gap-2 border-0 border-b-2 border-solid border-slate-500 hover:border-blueDark">
          <MdLockOutline />
          <input
            className="w-full border-0 focus:outline-none"
            name="password"
            type={showPass ? 'text' : 'password'}
            placeholder="booktech1234"
            value={values.password}
            onChange={handleChange}
          />
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowPass(!showPass)
            }}
          >
            {showPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </div>
        </div>
        <small className="font-bold text-red-500">{errors?.password}</small>
        <button className=" w-full rounded-3xl bg-blueDark py-2 text-white shadow-lg" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
