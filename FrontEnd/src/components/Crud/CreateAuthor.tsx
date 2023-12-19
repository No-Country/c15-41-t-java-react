import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { FormikValues } from 'formik'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '../../utils/overflowYdisable'
import { useState } from 'react'

interface CreateAuthorProps {
  setCloseModal: Function
  setRefreshEntitys: Function
}

interface AuthorPost {
  name: string
  lastName: string
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un nombre válido')
    .max(50, 'El nombre es demasiado extenso'),
  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ'\s]+$/, 'Ingresa un apellido válido')
    .max(50, 'El apellido es demasiado extenso')
})

export const CreateAuthor: React.FC<CreateAuthorProps> = ({ setCloseModal, setRefreshEntitys }) => {
  const [isLoading, setIsLoading] = useState(false)

  const closeModal = () => {
    setCloseModal(false)
  }
  const refreshEntitys = () => {
    setRefreshEntitys()
  }
  const initialValues: AuthorPost = {
    name: '',
    lastName: ''
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
        method: 'POST',
        body: JSON.stringify({
          ...values
        })
      }
      await fetch('http://localhost:8080/bibliotech/api/authors/save', postOptions)
      resetForm()
      toast.success('Su autor se agregó correctamente', { duration: 4000, position: 'top-center' })
      refreshEntitys()
      closeModal()
    } catch (error) {
      toast.error('Error al agregar el autor', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }

  overflowYdisable()

  return (
    <>
      <div className="CrudCreateAndEditContainer">
        <div className="CrudCreateAndEditPositioner">
          <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
            Registro de un nuevo autor
            <br />
            <span className="text-sm"> (Los campos con * son obligatorios) </span>
          </h2>
          <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
            <label className="formLabel " htmlFor="title">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="name"
                type="text"
                placeholder="Ingresá el nombre"
                value={values.name}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.name}</small>
            </div>
            <label className="formLabel " htmlFor="title">
              Apellido <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="lastName"
                type="text"
                placeholder="Ingresá el apellido"
                value={values.lastName}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.lastName}</small>
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
    </>
  )
}
