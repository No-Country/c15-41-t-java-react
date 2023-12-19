import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { FormikValues } from 'formik'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import overflowYdisable from '../../utils/overflowYdisable'
import { useState } from 'react'

interface CreateEditorialProps {
  setCloseModal: Function
  setRefreshEntitys: Function
}

interface GenrePost {
  name: string
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre de la editorial es obligatorio')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Ingresa un nombre válido')
    .max(50, 'El nombre de la editorial es demasiado extenso')
})

export const CreateEditorial: React.FC<CreateEditorialProps> = ({
  setCloseModal,
  setRefreshEntitys
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => {
    setCloseModal(false)
  }
  const refreshEntitys = () => {
    setRefreshEntitys()
  }
  const initialValues: GenrePost = {
    name: ''
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values
        })
      }
      await fetch('http://localhost:8080/bibliotech/api/editorials/save', postOptions)
      resetForm()
      toast.success('La editorial se agregó correctamente', {
        duration: 4000,
        position: 'top-center'
      })
      refreshEntitys()
      closeModal()
    } catch (error) {
      toast.error('Error al agregar la editorial', { duration: 4000, position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }

  overflowYdisable()

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-scroll bg-white pb-60 opacity-100 lg:pb-14">
        <div className="mx-auto mt-20 w-11/12 rounded-[40px] bg-grey  sm:max-w-[60%]">
          <h2 className="mx-auto w-10/12 py-8 text-2xl font-bold leading-normal text-blueDark">
            Registro de una nueva editorial
            <br />
            <span className="text-sm"> (Los campos con * son obligatorios) </span>
          </h2>
          <form className="mx-auto w-10/12" onSubmit={handleSubmit}>
            <label className="formLabel " htmlFor="title">
              Editorial <span className="text-red-500">*</span>
            </label>
            <div className="ReactSelectContainer">
              <input
                className="ReactSelect"
                name="name"
                type="text"
                placeholder="Ingresá el nombre de la editorial"
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
    </>
  )
}
