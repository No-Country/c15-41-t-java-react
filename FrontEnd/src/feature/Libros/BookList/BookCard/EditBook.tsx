import { useState, useEffect } from 'react'
import { useFormik, type FormikValues } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import type { Author, BookPost, Editorial, Genre } from '@/types/types'
import { useUser } from '@/context/UserContext'
import { blockNonNumericInput } from '@/utils/input'
import overflowYdisable from '@/utils/overflowYdisable'

interface BookProps extends BookPost {
  id: number
  setIsModalOpen: (value: boolean) => void
  refresh: () => void
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
  idGenre: Yup.number().min(1, 'Seleccione genero').required('El genero es requerido'),
  idEditorial: Yup.number().min(1, 'Seleccione editorial').required('La editorial es requerida'),
  image: Yup.string()
})

const EditBook: React.FC<BookProps> = props => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [editorials, setEditorials] = useState<Editorial[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { fetch } = useUser()
  const [imageFile, setImageFile] = useState<File | null>(null)

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
      const data = await fetch('http://localhost:3000/books/genres/all')
      setGenres(data)
    }
    getGenres().catch(error => {
      console.log(error)
    })
  }, [])

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: props.title,
      quantity: props.quantity,
      idAuthor: props.idAuthor,
      isbn: props.isbn,
      idGenre: props.idGenre,
      idEditorial: props.idEditorial,
      image: props.image ?? ''
    },
    validationSchema,
    onSubmit
  })

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files || !event.target.files[0]) return
    setImageFile(event.target.files[0])
    handleChange(event)
  }

  async function onSubmit(values: FormikValues) {
    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('isbn', values.isbn)
      formData.append('quantity', values.quantity)
      formData.append('idAuthor', values.idAuthor)
      formData.append('idEditorial', values.idEditorial)
      formData.append('idGenre', values.idGenre)
      formData.append('image', imageFile ? imageFile : new Blob())

      const postOptions = {
        method: 'PUT',
        body: formData
      }
      await fetch(`http://localhost:3000/books/update/${props.id}`, postOptions)
      props.setIsModalOpen(false)
      props.refresh()
      toast.success('Su libro se editó correctamente', { duration: 4000, position: 'top-center' })
    } catch (error) {
      toast.error('Hubo un error al intentar editar el libro', {
        duration: 4000,
        position: 'top-center'
      })
    } finally {
      setIsLoading(false)
    }
  }
  overflowYdisable()
  return (
    <div className="bg-white px-2 py-16 max-lg:pb-60">
      <div className="mx-auto w-full rounded-[40px] bg-grey  sm:max-w-[70%]">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Edicion del libro: {props.title}
          <br />
          <span className="text-sm"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12 " onSubmit={handleSubmit}>
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
              placeholder="Ingresá el isbn"
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
              name="idGenre"
              value={values.idGenre}
              onChange={handleChange}
            >
              <option value="-1" disabled>
                Selecciona un genero
              </option>
              {genres.map(genre => (
                <option key={genre.idGenre} value={genre.idGenre}>
                  {genre.name}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.idGenre}
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
              accept=".jpg, .jpeg, .png"
              value={values.image}
              onChange={handleImageChange}
            />
            {/* Muestra la imagen actual */}
            {props.image && <img src={props.image} alt="Imagen actual" className="h-24 w-24" />}
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
    </div>
  )
}

export default EditBook
