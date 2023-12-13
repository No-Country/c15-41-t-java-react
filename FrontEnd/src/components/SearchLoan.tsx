import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import type { Loan } from '../types/types'
import { arraysAreEqual, searchIncludes } from '../utils/searchFunctions'

interface SearchLoanProps {
  allLoans: Loan[]
  onSearchResults: (results: Loan[]) => void
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchLoan: React.FC<SearchLoanProps> = ({ allLoans, onSearchResults, setPage }) => {
  const [filteredLoan, setFilteredLoan] = useState<Loan[] | []>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (searchTerm !== '') {
      setPage(1)
      const filtered = allLoans.filter(
        loan =>
          searchIncludes(loan.bookDto.title, searchTerm) ||
          searchIncludes(`${loan.userDto.name} ${loan.userDto.lastName}`, searchTerm) ||
          searchIncludes(loan.userDto.dni, searchTerm)
      )
      if (!arraysAreEqual(filtered, filteredLoan)) {
        setFilteredLoan(filtered)
      }
    } else setFilteredLoan(allLoans)
    onSearchResults(filteredLoan)
  }, [searchTerm, filteredLoan])

  return (
    <div className="mt-10 flex h-full w-full items-center justify-between gap-x-2">
      <div className="flex h-9 w-full items-center gap-x-4 rounded-[14px] bg-white px-4 text-lg font-bold shadow-lg md:h-12">
        <label htmlFor="searchInput" className="flex align-middle">
          <GoSearch className="text-base md:text-2xl" />
        </label>
        <input
          id="searchInput"
          className="h-full w-full border-0 font-poppins text-lg placeholder-black focus:outline-none"
          type="text"
          value={searchTerm}
          placeholder="Buscar"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
      <div className="group relative">
        <button className="h-9 w-9 rounded-full border bg-white text-lg font-bold text-black outline-none">
          ?
        </button>
        <div
          id="search-help"
          className="absolute right-0 top-14 z-10 hidden w-[60vw] rounded-md bg-[#0A7ABF] p-4 text-white shadow-xl group-hover:block min-[750px]:w-[35vw]"
        >
          <p>
            Puede buscar por <b>Dni, Nombre y/o Apellido del miembro o título de la obra.</b>
            <br />
            <br />
            Puede escribir las palabras de su búsqueda en
            <b> mayúscula o minúscula, con o sin tilde</b>, y el catálogo recuperará todos los
            resultados.
            <br />
            <br />
            Por ejemplo, si busca la palabra "García", se localizarán también "garcia, Garcia,
            GARCÍA, GARCIA y garcía"
          </p>
        </div>
      </div>
    </div>
  )
}

export default SearchLoan
