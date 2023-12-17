import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '../../utils/overflowYdisable'

interface EditorialPut {
  name: string
}
interface EditEditorialProps {
  setCloseModal: Function
  setRefreshEntitys: Function
  selectedEditorial: any
}
const validationSchema = Yup.object({
  name: Yup.string()
    .required('La editorial es obligatoria')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa una editorial válida')
    .max(50, 'La editorial es demasiado extensa')
})

export const EditEditorial: React.FC<EditEditorialProps> = ({
  setCloseModal,
  setRefreshEntitys,
  selectedEditorial
}) => {
  const closeModal = () => {
    setCloseModal(false)
  }
  const refreshEntitys = () => {
    setRefreshEntitys()
  }
  const initialValues: EditorialPut = {
    name: selectedEditorial.label
  }
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  async function onSubmit(values: FormikValues) {
    try {
      const postOptions = {
        method: 'PUT',
        body: JSON.stringify(values)
      }
      await fetch(
        `http://localhost:8080/bibliotech/api/editorials/update/${selectedEditorial.value}`,
        postOptions
      )
      resetForm()
      toast.success('Su editorial se editó correctamente', {
        duration: 4000,
        position: 'top-center'
      })
      refreshEntitys()
      closeModal()
    } catch (error) {
      toast.error('Hubo un error al intentar editar la editorial', {
        duration: 4000,
        position: 'top-center'
      })
    }
  }

  overflowYdisable()

  return (
    <div className="CrudCreateAndEditContainer">
      <div className="CrudCreateAndEditPositioner">
        <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
          Edición de la editorial: {selectedEditorial.label}{' '}
          <span className="text-sm text-red-500"> (Los campos con * son obligatorios) </span>
        </h2>
        <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
          <label className="labelForm " htmlFor="title">
            Editorial <span className="text-red-500">*</span>
          </label>
          <div className="divContent">
            <input
              className="reactSelect"
              name="name"
              type="text"
              placeholder="Ingresá la editorial"
              value={values.name}
              onChange={handleChange}
            />
            <small className="errorContainer">{errors?.name}</small>
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
  )
}
