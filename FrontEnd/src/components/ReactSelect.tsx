import Select from 'react-select'

interface ReactSelectProps {
  label: string
  placeHolder: string
  selectName: string
  options: any
  setFieldValue: any
  errors: any
}

export const ReactSelect: React.FC<ReactSelectProps> = ({
  label,
  placeHolder,
  selectName,
  options,
  setFieldValue,
  errors
}) => {
  return (
    <>
      <label className="labelForm" htmlFor="idAuthor">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="divContent">
        <Select
          placeholder={placeHolder}
          unstyled={true}
          className="reactSelect"
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
          onChange={(selectedOption: { value: number | string; label: string } | null) => {
            setFieldValue(selectName, selectedOption?.value || -1)
          }}
        />
        <small className="errorContainer">{errors}</small>
      </div>
    </>
  )
}
