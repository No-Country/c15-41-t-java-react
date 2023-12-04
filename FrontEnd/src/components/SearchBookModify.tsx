import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import type { Book } from '../types/types'
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

  function arraysAreEqual(array1: any, array2: any) {
    return JSON.stringify(array1) === JSON.stringify(array2)
  }

  useEffect(() => {
    if (searchTerm !== '') {
      setPage(1)
      const filtered = allBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authorDto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authorDto.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.editorialDto.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <button className="h-9 w-9 rounded-full border bg-white text-lg font-bold text-black outline-none">
        ?
      </button>
    </div>
  )
}

export default SearchBookModify
