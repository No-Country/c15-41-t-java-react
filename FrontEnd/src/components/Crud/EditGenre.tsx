import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '../../utils/overflowYdisable'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

interface GenrePut {
  name: string
}
interface EditGenreProps {
  setCloseModal: Function
  setRefreshEntitys: Function
  selectedGenre: any
}
const validationSchema = Yup.object({
  name: Yup.string()
    .required('El género es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un género válido')
    .max(50, 'El género es demasiado extenso')
})

export const EditGenre: React.FC<EditGenreProps> = ({
  setCloseModal,
  setRefreshEntitys,
  selectedGenre
}) => {
  const { fetch } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => {
    setCloseModal(false)
  }
  const refreshEntitys = () => {
    setRefreshEntitys()
  }
  const initialValues: GenrePut = {
    name: selectedGenre.label
  }
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    try {
      setIsLoading(true)
      const postOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
      await fetch(`http://localhost:3000/books/genres/update/${selectedGenre.value}`, postOptions)
      resetForm()
      toast.success('Su género se editó correctamente', { duration: 4000, position: 'top-center' })
      refreshEntitys()
      closeModal()
    } catch (error: any) {
      if (error.message !== undefined && typeof error.message === 'string' && error.message !== '')
        toast.error(error.message, { duration: 4000, position: 'top-center' })
      else toast.error('Error al editar el género', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }

  overflowYdisable()

  return (
    <div className="CrudCreateAndEditContainer">
      <div className="CrudCreateAndEditPositioner">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Edición del género: {selectedGenre.label}
          <br />
          <span className="text-sm"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <label className="formLabel " htmlFor="title">
            Género <span className="text-red-500">*</span>
          </label>
          <div className="ReactSelectContainer">
            <input
              className="ReactSelect"
              name="name"
              type="text"
              placeholder="Ingresá el género"
              value={values.name}
              onChange={handleChange}
            />
            <small className="errorContainer">{errors?.name}</small>
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
      <div className="closeModal" onClick={closeModal}>
        <IoMdClose />
      </div>
    </div>
  )
}
