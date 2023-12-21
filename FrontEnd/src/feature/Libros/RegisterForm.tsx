import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import type { Author, BookPost, Editorial, Genre } from '../../types/types'
import { FaRegPlusSquare } from 'react-icons/fa'
import { CreateAuthor } from '../../components/Crud/CreateAuthor'
import { CreateGenre } from '../../components/Crud/CreateGenre'
import { CreateEditorial } from '../../components/Crud/CreateEditorial'
import imgDelete from '../../assets/icons/delete.svg'
import imgEditar from '../../assets/icons/Edit.svg'
import { EditAuthor } from '../../components/Crud/EditAuthor'
import { EditGenre } from '../../components/Crud/EditGenre'
import { EditEditorial } from '../../components/Crud/EditEditorial'
import DeleteAuthor from '../../components/Crud/DeleteAuthor'
import DeleteGenre from '../../components/Crud/DeleteGenre'
import DeleteEditorial from '../../components/Crud/DeleteEditorial'
import { useFormik, type FormikValues } from 'formik'
import toast from 'react-hot-toast'
import { useUser } from '@/context/UserContext'
import { blockNonNumericInput } from '@/utils/input'
import { ReactSelect } from '@/components/ReactSelect'

const initialValues: BookPost = {
  title: '',
  idAuthor: -1,
  idEditorial: -1,
  isbn: '',
  idGenre: -1,
  quantity: 0,
  image: ''
}

const ISBN_REGEX =
  /^(?:-1[03])?:?(?=[0-9X]{10}$|(?=(?:[0-9]+-){3})[-0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+-){4})[-0-9]{17}$)(?:97[89]-)?[0-9]{1,5}-[0-9]+-[0-9]+-[0-9X]$/

const validationSchema = Yup.object({
  title: Yup.string()
    .required('El título es requerido')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s]+$/, 'Ingresa un nombre válido')
    .min(3, 'El nombre es demasiado corto')
    .max(50, 'El nombre es demasiado extenso'),
  isbn: Yup.string().required('El ISBN es requerido').matches(ISBN_REGEX, 'El ISBN no es valido'),
  quantity: Yup.number()
    .required('Cantidad es requerida')
    .min(1, 'El valor debe ser mayor a 0')
    .max(100, 'El máximo que puede ingresar son 100 copias'),
  idAuthor: Yup.number().min(1, 'Seleccione autor').required('El autor es requerido'),
  idEditorial: Yup.number().min(1, 'Seleccione editorial').required('La editorial es requerida'),
  idGenre: Yup.number().min(1, 'Seleccione género').required('El género es requerido'),
  image: Yup.string()
})

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { fetch } = useUser()
  const [authors, setAuthors] = useState<Author[]>([])
  const [editorials, setEditorials] = useState<Editorial[]>([])
  const [mockGenres, setMockGenres] = useState<Genre[]>([])
  const [authorsOptions, setAuthorsOptions] = useState<
    { value: number; label: string; props: Object }[]
  >([])
  const [genresOptions, setGenresOptions] = useState<{ value: number; label: string }[]>([])
  const [editorialsOptions, setEditorialsOptions] = useState<{ value: number; label: string }[]>([])
  const [isAuthorDBmodify, setisAuthorDBmodify] = useState(false)
  const [isGenreDBmodify, setisGenreDBmodify] = useState(false)
  const [isEditorialDBmodify, setisEditorialDBmodify] = useState(false)
  const [isModalOpenCreateAuthor, setIsModalOpenCreateAuthor] = useState(false)
  const [isModalOpenCreateGenre, setIsModalOpenCreateGenre] = useState(false)
  const [isModalOpenCreateEditorial, setIsModalOpenCreateEditorial] = useState(false)
  const [isModalOpenEditAuthor, setIsModalOpenEditAuthor] = useState(false)
  const [isModalOpenEditGenre, setIsModalOpenEditGenre] = useState(false)
  const [isModalOpenEditEditorial, setIsModalOpenEditEditorial] = useState(false)
  const [isModalOpenDeleteAuthor, setIsModalOpenDeleteAuthor] = useState(false)
  const [isModalOpenDeleteGenre, setIsModalOpenDeleteGenre] = useState(false)
  const [isModalOpenDeleteEditorial, setIsModalOpenDeleteEditorial] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [selectedAuthor, setSelectedAuthor] = useState<{
    label: string
    value: number
    props: Object
  } | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<{
    label: string
    value: number
  } | null>(null)
  const [selectedEditorial, setSelectedEditorial] = useState<{
    label: string
    value: number
  } | null>(null)

  useEffect(() => {
    const getAuthors = async () => {
      const data = await fetch('http://localhost:3000/authors/all')
      setAuthors(data)
    }
    getAuthors().catch(error => {
      console.log(error)
    })
  }, [isAuthorDBmodify])

  useEffect(() => {
    const getEditorials = async () => {
      const data = await fetch('http://localhost:3000/editorials/all')
      setEditorials(data)
    }
    getEditorials().catch(error => {
      console.log(error)
    })
  }, [isEditorialDBmodify])

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetch('http://localhost:3000/books/genres/all')
      setMockGenres(data)
    }
    getGenres().catch(error => {
      console.log(error)
    })
  }, [isGenreDBmodify])

  useEffect(() => {
    const options = authors.map(author => ({
      value: author.idAuthor,
      label: `${author.name} ${author.lastName}`,
      props: { name: author.name, lastName: author.lastName }
    }))
    setAuthorsOptions(options)
  }, [authors])
  useEffect(() => {
    const options = mockGenres.map(mockGenre => ({
      value: mockGenre.idGenre,
      label: `${mockGenre.name}`
    }))
    setGenresOptions(options)
  }, [mockGenres])
  useEffect(() => {
    const options = editorials.map(editorial => ({
      value: editorial.idEditorial,
      label: `${editorial.name}`
    }))
    setEditorialsOptions(options)
  }, [editorials])

  const { values, errors, handleChange, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues,
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
        method: 'POST',
        body: formData
      }

      await fetch('http://localhost:3000/books/save', postOptions)
      resetForm()
      toast.success('Su libro se agregó correctamente', { duration: 4000, position: 'top-center' })
      onSuccess()
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, { duration: 4000, position: 'top-center' })
      else toast.error('Error al agregar el libro', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }
  const refreshAuthors = () => {
    setisAuthorDBmodify(!isAuthorDBmodify)
  }
  const refreshGenres = () => {
    setisGenreDBmodify(!isGenreDBmodify)
  }
  const refreshEditorials = () => {
    setisEditorialDBmodify(!isEditorialDBmodify)
  }

  return (
    <>
      <div className="px-2 py-10">
        <div className="mx-auto w-full max-w-[650px] rounded-[40px]  bg-grey">
          <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
            Registro de un nuevo libro
            <br />
            <span className="text-sm"> (Los campos con * son obligatorios) </span>
          </h2>
          <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
            <label className="formLabel " htmlFor="title">
              Título <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="title"
                type="text"
                placeholder="Ingresá el título"
                value={values.title}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.title}</small>
            </div>
            <label className="formLabel " htmlFor="isbn">
              ISBN <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="isbn"
                type="text"
                placeholder="ISBN 13: 978-0-596-52068-7 - ISBN 10: 0-321-48410-7 "
                value={values.isbn}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.isbn}</small>
            </div>
            <label className="formLabel" htmlFor="quantity">
              Cantidad <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="quantity"
                type="number"
                placeholder="Ingresá la cantidad"
                value={values.quantity}
                onChange={handleChange}
                onKeyDown={blockNonNumericInput}
              />
              <small className="errorContainer">{errors?.quantity}</small>
            </div>
            <div className="flex items-center gap-x-4">
              <ReactSelect
                label="Autor"
                placeHolder="Selecciona un autor"
                selectName="idAuthor"
                options={authorsOptions}
                setFieldValue={setFieldValue}
                errors={errors.idAuthor}
                setSelectedOption={setSelectedAuthor}
              />
              <div
                className="increase-scale text-2xl hover:cursor-pointer"
                onClick={() => {
                  setIsModalOpenCreateAuthor(true)
                }}
              >
                <FaRegPlusSquare />
              </div>
              {selectedAuthor && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgEditar}
                    alt="icono editar"
                    onClick={() => {
                      setIsModalOpenEditAuthor(true)
                    }}
                  />
                </div>
              )}
              {selectedAuthor && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgDelete}
                    alt="icono eliminar"
                    onClick={() => {
                      setIsModalOpenDeleteAuthor(true)
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-4">
              <ReactSelect
                label="Género"
                placeHolder="Selecciona un género"
                selectName="idGenre"
                options={genresOptions}
                setFieldValue={setFieldValue}
                errors={errors.idGenre}
                setSelectedOption={setSelectedGenre}
              />
              <div
                className="increase-scale text-2xl hover:cursor-pointer"
                onClick={() => {
                  setIsModalOpenCreateGenre(true)
                }}
              >
                <FaRegPlusSquare />
              </div>
              {selectedGenre && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgEditar}
                    alt="icono editar"
                    onClick={() => {
                      setIsModalOpenEditGenre(true)
                    }}
                  />
                </div>
              )}
              {selectedGenre && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgDelete}
                    alt="icono eliminar"
                    onClick={() => {
                      setIsModalOpenDeleteGenre(true)
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-4">
              <ReactSelect
                label="Editorial"
                placeHolder="Selecciona una editorial"
                selectName="idEditorial"
                options={editorialsOptions}
                setFieldValue={setFieldValue}
                errors={errors.idEditorial}
                setSelectedOption={setSelectedEditorial}
              />
              <div
                className="increase-scale text-2xl hover:cursor-pointer"
                onClick={() => {
                  setIsModalOpenCreateEditorial(true)
                }}
              >
                <FaRegPlusSquare />
              </div>
              {selectedEditorial && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgEditar}
                    alt="icono editar"
                    onClick={() => {
                      setIsModalOpenEditEditorial(true)
                    }}
                  />
                </div>
              )}
              {selectedEditorial && (
                <div className="increase-scale hover:cursor-pointer">
                  <img
                    src={imgDelete}
                    alt="icono eliminar"
                    onClick={() => {
                      setIsModalOpenDeleteEditorial(true)
                    }}
                  />
                </div>
              )}
            </div>
            <label className="formLabel" htmlFor="image">
              Agrega una imagen
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                type="file"
                name="image"
                value={values.image}
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
              />
              <small className="errorContainer">{errors?.image}</small>
            </div>
            <div className="pb-10">
              <button className="onSubmitButton" type="submit" disabled={isLoading}>
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
      {isModalOpenCreateAuthor && (
        <CreateAuthor
          setCloseModal={setIsModalOpenCreateAuthor}
          setRefreshEntitys={refreshAuthors}
        />
      )}
      {isModalOpenCreateGenre && (
        <CreateGenre setCloseModal={setIsModalOpenCreateGenre} setRefreshEntitys={refreshGenres} />
      )}
      {isModalOpenCreateEditorial && (
        <CreateEditorial
          setCloseModal={setIsModalOpenCreateEditorial}
          setRefreshEntitys={refreshEditorials}
        />
      )}
      {isModalOpenEditAuthor && (
        <EditAuthor
          setCloseModal={setIsModalOpenEditAuthor}
          setRefreshEntitys={refreshAuthors}
          selectedAuthor={selectedAuthor}
        />
      )}
      {isModalOpenEditGenre && (
        <EditGenre
          setCloseModal={setIsModalOpenEditGenre}
          setRefreshEntitys={refreshGenres}
          selectedGenre={selectedGenre}
        />
      )}
      {isModalOpenEditEditorial && (
        <EditEditorial
          setCloseModal={setIsModalOpenEditEditorial}
          setRefreshEntitys={refreshEditorials}
          selectedEditorial={selectedEditorial}
        />
      )}
      {isModalOpenDeleteAuthor && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteAuthor
            setIsModalDeleteOpen={setIsModalOpenDeleteAuthor}
            deleteEntity={selectedAuthor}
            refresh={refreshAuthors}
          />
        </div>
      )}
      {isModalOpenDeleteGenre && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteGenre
            setIsModalDeleteOpen={setIsModalOpenDeleteGenre}
            deleteEntity={selectedGenre}
            refresh={refreshGenres}
          />
        </div>
      )}
      {isModalOpenDeleteEditorial && (
        <div className="fixed inset-0 z-50  bg-white opacity-100">
          <DeleteEditorial
            setIsModalDeleteOpen={setIsModalOpenDeleteEditorial}
            deleteEntity={selectedEditorial}
            refresh={refreshEditorials}
          />
        </div>
      )}
    </>
  )
}
