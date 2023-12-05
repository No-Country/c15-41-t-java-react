import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import type { User } from '../types/types'

interface SearchUserProps {
  allUsers: User[]
  onSearchResults: (results: User[]) => void
  /* setPage: React.Dispatch<React.SetStateAction<number>> */
}

const SearchUser: React.FC<SearchUserProps> = ({ allUsers, onSearchResults /* setPage */ }) => {
  const [filteredUser, setFilteredUser] = useState<User[] | []>([])
  const [searchTerm, setSearchTerm] = useState('')

  function arraysAreEqual(array1: any, array2: any) {
    return JSON.stringify(array1) === JSON.stringify(array2)
  }

  function normalizeString(string: string): string {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  function searchIncludes(stringSearch: string, stringInclude: string): boolean {
    return normalizeString(stringSearch).includes(normalizeString(stringInclude))
  }

  useEffect(() => {
    if (searchTerm !== '') {
      /* setPage(1) */
      const filtered = allUsers.filter(
        user =>
          user.dni.toString().includes(searchTerm) ||
          searchIncludes(`${user.name} ${user.lastName}`, searchTerm)
      )
      if (!arraysAreEqual(filtered, filteredUser)) {
        setFilteredUser(filtered)
      }
    } else setFilteredUser(allUsers)
    onSearchResults(filteredUser)
  }, [searchTerm, filteredUser])

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
          className="absolute right-0 top-14 z-10 hidden w-[50vw] rounded-md bg-[#0A7ABF] p-4 text-white shadow-xl group-hover:block min-[750px]:w-[25vw]"
        >
          <p>
            Puede escribir las palabras de su búsqueda en
            <b> mayúscula o minúscula, con o sin tilde</b>, y el catálogo recuperará todos los
            resultados.
            <br />
            <br />
            Puede buscar por <b>Nombre y/o Apellido o Id</b>
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

export default SearchUser
