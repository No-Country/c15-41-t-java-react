import { useEffect, useState } from 'react'
import Select from 'react-select'

interface ReactSelectProps {
  label: string
  placeHolder: string
  selectName: string
  options: any
  setFieldValue: any
  errors: any
  setSelectedOption: Function
}

export const ReactSelect: React.FC<ReactSelectProps> = ({
  label,
  placeHolder,
  selectName,
  options,
  setFieldValue,
  errors,
  setSelectedOption
}) => {
  const [selectedValue, setSelectedValue] = useState<{ value: number; label: string } | null>(null)
  useEffect(() => {
    setSelectedValue(null)
  }, [options])

  return (
    <div className="w-full">
      <label className="formLabel" htmlFor="idAuthor">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="ReactSelectContainer">
        <Select
          placeholder={placeHolder}
          unstyled={true}
          className="ReactSelect"
          styles={{
            menu: (provided: any) => ({
              ...provided,
              backgroundColor: 'rgb(230,231,233)',
              border: '1px solid',
              color: 'rgb(5,41,64)'
            }),
            option: (provided: any) => ({
              ...provided,
              paddingLeft: '2px',
              '&:hover': {
                backgroundColor: 'rgb(10,122,191)',
                color: '#fff'
              }
            })
          }}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name={selectName}
          options={options}
          value={selectedValue}
          onChange={(selectedOption: { value: number; label: string } | null) => {
            setFieldValue(selectName, selectedOption?.value || -1)
            setSelectedOption(selectedOption)
            setSelectedValue(selectedOption)
          }}
        />
        <small className="errorContainer">{errors}</small>
      </div>
    </div>
  )
}
