import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { FormikValues } from 'formik'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '../../utils/overflowYdisable'

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
    }
  }

  overflowYdisable()

  return (
    <>
      <div className="CrudCreateAndEditContainer">
        <div className="CrudCreateAndEditPositioner">
          <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
            Registro de un nuevo autor
            <span className="ml-2 text-sm text-red-500"> (Los campos con * son obligatorios) </span>
          </h2>
          <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
            <label className="labelForm " htmlFor="title">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="divContent">
              <input
                className="reactSelect"
                name="name"
                type="text"
                placeholder="Ingresá el nombre"
                value={values.name}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.name}</small>
            </div>
            <label className="labelForm " htmlFor="title">
              Apellido <span className="text-red-500">*</span>
            </label>
            <div className="divContent">
              <input
                className="reactSelect"
                name="lastName"
                type="text"
                placeholder="Ingresá el apellido"
                value={values.lastName}
                onChange={handleChange}
              />
              <small className="errorContainer">{errors?.lastName}</small>
            </div>
            <div className="pb-10">
              <button className="onSubmitButton" type="submit">
                Enviar
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
