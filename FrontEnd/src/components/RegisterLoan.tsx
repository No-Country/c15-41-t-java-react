import { useState, useEffect } from 'react'
import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Book, User } from '../types/types'
import { useUser } from '../context/UserContext'

interface propsLoan extends Book {}

const validationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  author: Yup.string().required('El autor es requerido'),
  genre: Yup.string().required('El genero es requerido'),
  editorial: Yup.string().required('la editorial es requerida'),
  isbn: Yup.string().required('El ISBN es requerido'),
  loanDate: Yup.string().required('La fecha de prestamo es requerida'),
  returnExpectedDate: Yup.date().required('La fecha de devolucin es requerida'),
  idUser: Yup.number().required('El usuario es requerido'),
  idBook: Yup.number().required('El libro es requerido')
})

const RegisterLoan: React.FC<propsLoan> = props => {
  const [users, setUsers] = useState<User[]>([])
  const [todayDate] = useState(new Date().toISOString().split('T')[0])
  const { fetch, currentUser } = useUser()

  async function getUsers(): Promise<void> {
    try {
      const users = await fetch('http://localhost:3000/users')
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

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: props.title,
      author: props.authorDto.name + ' ' + props.authorDto.lastName,
      genre: props.genre,
      isbn: props.isbn,
      editorial: props.editorialDto.name,
      loanDate: todayDate,
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
    console.log(loan)
    /*
      try {
        const postOptions = {
          method: 'POST',
          body: JSON.stringify(loan)
        }
        const data = await fetch('/loans', postOptions)
        console.log(data)
      }catch(error){
        console.log(error)
      }*/
  }

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
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
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
                  className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
                  name="loanDate"
                  type="text"
                  value={values.loanDate}
                  onChange={handleChange}
                  readOnly
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
                  placeholder="Ingresá el ISBN"
                />
                <small className="absolute -bottom-6 text-xs font-bold text-red-500"></small>
              </div>
            </div>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="idUser">
            Nombre y apellido <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="idUser"
              value={values.idUser}
              onChange={handleChange}
            >
              <option value="-1" disabled>
                Selecciona un usuario
              </option>
              {users.map((user: User) => (
                <option key={user.idUser} value={user.idUser}>
                  {`${user.name} ${user.lastName}`}
                </option>
              ))}
            </select>

            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
     
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

export default RegisterLoan
