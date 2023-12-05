import { useState, useEffect } from 'react'
import type { Author, Editorial } from '../types/types'
import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'
import { imageListClasses } from '@mui/material'

interface EditBookProps {
  id: number
  title: string
  idAuthor: number
  IdEditorial: number
  genre: string
  isbn: string
  quantity: number
  image: string
  editorialDto: Editorial
  authorDto: Author
  setIsModalOpen: (value: boolean) => void
}

const validationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  isbn: Yup.string().required('El isbn es requerido'),
  quantity: Yup.number().min(1, 'El valor debe ser mayor a 0').required('Cantidad es requerida'),
  idAuthor: Yup.number().required('El autor es requerido'),
  genre: Yup.string().required('El genero es requerido'),
  idEditorial: Yup.number().required('La editorial es requerida')
})

const mockGenres = [
  'Filosofia',
  'Ciencia',
  'Novela',
  'Historia',
  'Ciencia ficcion',
  'Religion',
  'Gastronimia',
  'Arte'
]

const EditBook: React.FC<EditBookProps> = props => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [editorials, setEditorials] = useState<Editorial[]>([])
  const { fetch } = useUser()

  useEffect(() => {
    const getAuthors = async () => {
      const data = await fetch('http://localhost:3000/authors')
      setAuthors(data)
    }
    getAuthors().catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const getEditorials = async () => {
      const data = await fetch('http://localhost:3000/editorials')
      setEditorials(data)
    }
    getEditorials().catch(error => {
      console.log(error)
    })
  }, [])

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: props.title,
      quantity: props.quantity,
      idAuthor: props.idAuthor,
      isbn: props.isbn,
      genre: props.genre,
      idEditorial: props.IdEditorial,
      image: props.image
    },
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    console.log(values)
    props.setIsModalOpen(false)
    /*
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('isbn', values.isbn);
    formData.append('quantity', values.quantity.toString());
    formData.append('idAuthor', values.author.toString()); // Ajusta según sea necesario
    formData.append('genre', values.genre);
    formData.append('idEditorial', values.editorial.toString()); // Ajusta según sea necesario
    formData.append('image', values.image); // Asumiendo que `values.image` es un archivo

    const putOptions = {
      method: 'PUT',
      body: formData,
    };

    const putResponse = await fetch(`http://localhost:3000/books/${props.id}`, putOptions);

    if (putResponse.ok) {
      props.setIsModalOpen(false);
      toast.success('Su libro se editó correctamente', { duration: 4000, position: 'top-center' });
    } else {
      console.error('Error al actualizar el libro');
      toast.error('Hubo un error al intentar editar el libro', { duration: 4000, position: 'top-center' });
    }
  } catch (error) {
    console.error(error);
    toast.error('Hubo un error al intentar editar el libro', { duration: 4000, position: 'top-center' });
  }
}
    */
  }

  return (
    <div className="bg-white px-2 py-10">
      <div className="mx-auto w-full rounded-[40px] bg-grey  sm:max-w-[70%]">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Edicion del libro {props.title}
        </h2>
        <form className="mx-auto w-10/12 " onSubmit={handleSubmit}>
          <label className="text-base font-bold leading-[normal] text-blueLight " htmlFor="title">
            Titulo
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
            ISBN
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
            Cantidad
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <input
              className="w-full  border-0 bg-grey text-base font-[400] leading-[normal] text-[#263238] placeholder-[#ABABAB] focus:outline-none"
              name="quantity"
              type="number"
              placeholder="Ingresá la cantidad"
              value={values.quantity}
              onChange={handleChange}
            />
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.quantity}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="idAuthor">
            Autor
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="author"
              value={values.idAuthor}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona un autor
              </option>
              {authors.map(author => (
                <option key={author.idAuthor} value={author.idAuthor}>
                  {`${author.name} ${author.lastName}`}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.author}
            </small>
          </div>
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="genre">
            Género
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
                <option key={genre} value={genre}>
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
            Editorial
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="idEditorial"
              defaultValue={values.editorial}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una editorial
              </option>
              {editorials.map(editorial => (
                <option key={editorial.idEditorial} value={editorial.idEditorial}>
                  {editorial.name}
                </option>
              ))}
            </select>
            <small className="absolute -bottom-6 text-xs font-bold text-red-500">
              {errors?.editorial}
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
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue('image', file);
                }
              }}
            />
            {/* Muestra la imagen actual */}
            {props.image && <img src={props.image} alt="Imagen actual" className="h-24 w-24" />}
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

export default EditBook
