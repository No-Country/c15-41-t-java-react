import { useFormik } from 'formik'
import * as Yup from 'yup'
/* import { useUser } from '../context/UserContext' */

interface RegisterFormType {
  title: string
  quantity: number
  author: number | undefined
  genre: string
  editorial: number | undefined
  image?: string
}

const initialValues: RegisterFormType = {
  title: '',
  quantity: 0,
  author: undefined,
  genre: '',
  editorial: undefined,
  image: ''
}

// DEBERIAN SER PROPORCIONADOS POR BACKEND
const mockAuthors = [
  { name: 'Paulo', lastName: 'Coelho', id: 25452 },
  { name: 'Edgar Allan', lastName: 'Poe', id: 4435 },
  { name: 'Jane', lastName: 'Austen', id: 55646 }
]

const mockEditorials = [
  { name: 'Planeta', id: 1001 },
  { name: 'Austral', id: 1005 },
  { name: 'BlackList', id: 1006 },
  { name: 'El Aleph editores', id: 1007 },
  { name: 'Ariel', id: 1002 }
]

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

const validationSchema = Yup.object({
  title: Yup.string().required('El titulo es requerido'),
  quantity: Yup.number().min(1, 'El valor debe ser mayor a 0').required('Cantidad es requerida'),
  author: Yup.string().required('El nombre del autor es requerido'),
  genre: Yup.string().required('El genero es requerido'),
  editorial: Yup.string().required('La editorial es requerido')
})

export default function RegisterForm() {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  /*   const { fetch } = useUser() */

  async function onSubmit(values: RegisterFormType) {
    console.log(values)
    /*     try {
      const postOptions = {
        method: 'POST',
        body: JSON.stringify(values)
      }
      const postResponse = await fetch('here api', postOptions)
      console.log(postResponse)
    } catch (error) {
      console.error(error)
    } */
  }

  return (
    <div className="px-2 py-10">
      <div className="mx-auto w-full rounded-[40px] bg-grey  sm:max-w-[70%]">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Registro de un nuevo libro
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
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
          <label className="text-base font-bold leading-[normal] text-blueLight" htmlFor="author">
            Autor
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="author"
              value={values.author}
              onChange={handleChange}
            >
              <option selected disabled>
                Selecciona un autor
              </option>
              {mockAuthors.map(author => (
                <option key={author.id} value={author.id}>
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
            htmlFor="editorial"
          >
            Editorial
          </label>
          <div className="relative mb-14 flex h-8 w-full items-center gap-2 border-0 border-b-2 border-solid border-blueDark">
            <select
              className="w-full border-0 bg-grey text-base font-[400] leading-[normal] text-blueDark placeholder-[#ABABAB] focus:outline-none"
              name="editorial"
              value={values.editorial}
              onChange={handleChange}
            >
              <option selected disabled>
                Selecciona una editorial
              </option>
              {mockEditorials.map(editorial => (
                <option key={editorial.id} value={editorial.id}>
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
