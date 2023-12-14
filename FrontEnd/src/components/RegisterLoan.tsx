import { useState, useEffect } from 'react'
import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Book, User } from '../types/types'
import { useUser } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import { ReactSelect } from './ReactSelect'

interface propsLoan extends Book {
  refresh: () => void
}

const validationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  author: Yup.string().required('El autor es requerido'),
  genre: Yup.string().required('El genero es requerido'),
  editorial: Yup.string().required('la editorial es requerida'),
  isbn: Yup.string().required('El ISBN es requerido'),
  loanDate: Yup.string().required('La fecha de prestamo es requerida'),
  returnExpectedDate: Yup.date()
    .required('La fecha de devolución es requerida')
    .min(new Date(), 'La fecha de devolución no puede ser menor a la fecha actual'),
  idUser: Yup.number().required('El miembro es requerido').min(1, 'El miembro es requerido'),
  idBook: Yup.number().required('El libro es requerido')
})

const RegisterLoan: React.FC<propsLoan> = props => {
  const [users, setUsers] = useState<User[]>([])
  const { fetch, currentUser } = useUser()
  const [usersOptions, setusersOptions] = useState<{ value: number; label: string }[]>([])

  async function getUsers(): Promise<void> {
    try {
      const users = await fetch('http://localhost:3000/users/all')
      setUsers(users)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUsers().catch(error => {
      console.log(error)
    })
  }, [])

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: props.title,
      author: props.authorDto.name + ' ' + props.authorDto.lastName,
      genre: props.genre,
      isbn: props.isbn,
      editorial: props.editorialDto.name,
      loanDate: new Date().toISOString().split('T')[0],
      returnExpectedDate: '',
      idUser: -1,
      idBook: props.idBook
    },
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    const returnExpectedDate = new Date(values.returnExpectedDate)
    const formattedExpectedDate = `${returnExpectedDate.getFullYear()}-${
      returnExpectedDate.getMonth() + 1
    }-${returnExpectedDate.getDate()}`

    const loan = {
      idBook: values.idBook,
      idUser: values.idUser,
      idAdmin: currentUser.idAdmin,
      returnExpectedDate: formattedExpectedDate
    }

    try {
      const postOptions = {
        method: 'POST',
        body: JSON.stringify(loan)
      }
      await fetch('http://localhost:3000/loans/save', postOptions)
      toast.success('Prestamo registrado con éxito', {
        duration: 1500
      })
      props.refresh()
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, {
          duration: 2000,
          position: 'top-center'
        })
      else
        toast.error('Error al registrar el prestamo', {
          duration: 1500
        })
    }
  }

  useEffect(() => {
    const options = users.map(user => ({
      value: user.idUser,
      label: `${user.name} ${user.lastName}`
    }))
    setusersOptions(options)
  }, [users])

  return (
    <div className="flex justify-center overflow-y-auto px-2 py-10">
      <div className="sm:max-h[40%]  rounded-[40px] bg-grey sm:max-w-[70%] xl:w-full">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Prestamo de libro
          <span className="text-sm text-blueDark"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <label className="text-base font-bold leading-[normal] text-blueLight " htmlFor="title">
            Titulo <span className="text-red-500">*</span>
          </label>

          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              disabled
              placeholder="Ingresá el titulo"
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.title}
            </small>
          </div>
          <div className="grid-cols-2 gap-1 sm:grid">
            <div>
              <label
                className="text-base font-bold leading-[normal] text-blueLight"
                htmlFor="author"
              >
                Autor <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark sm:w-[85%]">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
                  name="author"
                  value={values.author}
                  onChange={handleChange}
                  disabled
                  type="text"
                  placeholder="Ingresá el autor"
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                  {errors?.author}
                </small>
              </div>
            </div>
            <div>
              <label
                className="text-base font-bold leading-[normal] text-blueLight"
                htmlFor="genre"
              >
                Genero <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
                  name="genre"
                  type="text"
                  value={values.genre}
                  onChange={handleChange}
                  disabled
                  placeholder="Ingresá el Genero "
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                  {errors?.genre}
                </small>
              </div>
            </div>
          </div>
          <div className="grid-cols-2 gap-1 sm:grid">
            <div>
              <label
                className="text-base font-bold leading-[normal] text-blueLight"
                htmlFor="editorial"
              >
                Editorial <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark sm:w-[85%]">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
                  name="editorial"
                  type="text"
                  value={values.editorial}
                  onChange={handleChange}
                  disabled
                  placeholder="Ingresá la Editorial"
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                  {errors?.editorial}
                </small>
              </div>
            </div>
            <div>
              <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="isbn">
                ISBN <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
                  name="isbn"
                  type="text"
                  value={values.isbn}
                  onChange={handleChange}
                  disabled
                  placeholder="Ingresá el ISBN"
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                  {errors?.isbn}
                </small>
              </div>
            </div>
          </div>
          <div className="grid-cols-2 gap-1 sm:grid">
            <div>
              <label
                className="text-base font-bold leading-[normal] text-blueLight"
                htmlFor="loanDate"
              >
                Fecha Actual <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark sm:w-[85%]">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none disabled:cursor-not-allowed"
                  name="loanDate"
                  type="text"
                  value={values.loanDate}
                  onChange={handleChange}
                  disabled
                  placeholder="Ingresá la fecha Actual"
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500"></small>
              </div>
            </div>
            <div>
              <label
                className="text-base font-bold leading-[normal] text-blueLight"
                htmlFor="returnExpectedDate"
              >
                Fecha de devolución <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
                <input
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
                  name="returnExpectedDate"
                  type="date"
                  value={values.returnExpectedDate}
                  onChange={handleChange}
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500">
                  {errors?.returnExpectedDate}
                </small>
              </div>
            </div>
          </div>
          <ReactSelect
            label="Nombre y apellido"
            placeHolder="Selecciona un miembro"
            selectName="idUser"
            options={usersOptions}
            setFieldValue={setFieldValue}
            errors={errors.idUser}
          />
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

export default RegisterLoan
