import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import type { FormikValues } from 'formik'
import * as Yup from 'yup'
import type { Author, BookPost, Editorial } from '../types/types'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import { blockNonNumericInput } from '../utils/input'

const initialValues: BookPost = {
  title: '',
  idAuthor: -1,
  idEditorial: -1,
  isbn: '',
  genre: '',
  quantity: 0,
  image: ''
}

const ISBN_REGEX =
  /^(?:-1[03])?:?(?=[0-9X]{10}$|(?=(?:[0-9]+-){3})[-0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+-){4})[-0-9]{17}$)(?:97[89]-)?[0-9]{1,5}-[0-9]+-[0-9]+-[0-9X]$/

const validationSchema = Yup.object({
  title: Yup.string()
    .required('El titulo es requerido')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s]+$/, 'Ingresa un nombre válido')
    .min(3, 'El nombre es demasiado corto')
    .max(50, 'El nombre es demasiado extenso'),
  isbn: Yup.string().required('El isbn es requerido').matches(ISBN_REGEX, 'El ISBN no es valido'),
  quantity: Yup.number()
    .required('Cantidad es requerida')
    .min(1, 'El valor debe ser mayor a 0')
    .max(100, 'El máximo que puede ingresar son 100 copias'),
  idAuthor: Yup.number().min(1, 'Seleccione autor').required('El autor es requerido'),
  genre: Yup.string().required('El genero es requerido'),
  idEditorial: Yup.number().min(1, 'Seleccione editorial').required('La editorial es requerida')
})

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [authors, setAuthors] = useState<Author[]>([])
  const [editorials, setEditorials] = useState<Editorial[]>([])
  const [mockGenres, setMockGenres] = useState<string[]>([])
  const { fetch } = useUser()

  useEffect(() => {
    const getAuthors = async () => {
      const data = await fetch('http://localhost:3000/authors/all')
      setAuthors(data)
    }
    getAuthors().catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const getEditorials = async () => {
      const data = await fetch('http://localhost:3000/editorials/all')
      setEditorials(data)
    }
    getEditorials().catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetch('http://localhost:3000/books/genres')
      setMockGenres(data)
    }
    getGenres().catch(error => {
      console.log(error)
    })
  }, [])

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    try {
      const postOptions = {
        method: 'POST',
        body: JSON.stringify(values)
      }
      await fetch('http://localhost:3000/books/save', postOptions)
      resetForm()
      toast.success('Su libro se agregó correctamente', { duration: 4000, position: 'top-center' })
      onSuccess()
    } catch (error) {
      toast.error('Error al agregar el libro', { duration: 4000, position: 'top-center' })
    }
  }
  return (
    <div className="px-2 py-10">
      <div className="mx-auto w-full rounded-[40px] bg-grey  sm:max-w-[70%]">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Registro de un nuevo libro
          <span className="text-sm text-red-500"> (Los campos con * son obligatorios) </span>
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
              placeholder="Ingresá el titulo"
              value={values.title}
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.title}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight " htmlFor="isbn">
            ISBN <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="isbn"
              type="text"
              placeholder="ISBN 13: 978-0-596-52068-7 - ISBN 10: 0-321-48410-7 "
              value={values.isbn}
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.isbn}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="quantity">
            Cantidad <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="quantity"
              type="number"
              placeholder="Ingresá la cantidad"
              value={values.quantity}
              onChange={handleChange}
              onKeyDown={blockNonNumericInput}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.quantity}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="idAuthor">
            Autor <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="idAuthor"
              value={values.idAuthor}
              onChange={handleChange}
            >
              <option value="-1" disabled>
                Selecciona un autor
              </option>
              {authors.map(author => (
                <option key={author.idAuthor} value={author.idAuthor}>
                  {`${author.name} ${author.lastName}`}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.idAuthor}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="genre">
            Género <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="genre"
              value={values.genre}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona un genero
              </option>
              {mockGenres.map(genre => (
                <option key={genre} value={genre.toUpperCase()}>
                  {genre}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.genre}
            </small>
          </div>
          <label
            className="text-base font-bold leading-[normal] text-blueLight"
            htmlFor="idEditorial"
          >
            Editorial <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="idEditorial"
              value={values.idEditorial}
              onChange={handleChange}
            >
              <option value="-1" disabled>
                Selecciona una editorial
              </option>
              {editorials.map(editorial => (
                <option key={editorial.idEditorial} value={editorial.idEditorial}>
                  {editorial.name}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.idEditorial}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="image">
            Agrega una imagen
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              type="file"
              name="image"
              value={values.image}
              onChange={handleChange}
              accept=".jpg, .jpeg, .png"
            />

            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.image}
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
