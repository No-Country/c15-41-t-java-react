import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import type { Book } from '../types/types'
import { arraysAreEqual, searchIncludes } from '../utils/searchFunctions'

interface SearchBookModifyProps {
  allBooks: Book[]
  onSearchResults: (results: Book[]) => void
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchBookModify: React.FC<SearchBookModifyProps> = ({
  allBooks,
  onSearchResults,
  setPage
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Book[] | []>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (searchTerm !== '') {
      setPage(1)
      const filtered = allBooks.filter(
        book =>
          searchIncludes(book.title, searchTerm) ||
          searchIncludes(book.genre, searchTerm) ||
          searchIncludes(book.editorialDto.name, searchTerm) ||
          searchIncludes(`${book.authorDto.name} ${book.authorDto.lastName}`, searchTerm)
      )
      if (!arraysAreEqual(filtered, filteredProducts)) {
        setFilteredProducts(filtered)
      }
    } else setFilteredProducts(allBooks)
    onSearchResults(filteredProducts)
  }, [searchTerm, filteredProducts])

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
            Puede buscar por <b>Título de la obra, Autor, Género o Editorial.</b>
            <br />
            <br />
            Puede escribir las palabras de su búsqueda en
            <b> mayúscula o minúscula, con o sin tilde</b>, y el catálogo recuperará todos los
            resultados.
            <br />
            <br />
            Por ejemplo, si busca la palabra "Química", se localizarán también "quimica, Quimica,
            QUÍMICA, QUIMICA y química"
          </p>
        </div>
      </div>
    </div>
  )
}

export default SearchBookModify
