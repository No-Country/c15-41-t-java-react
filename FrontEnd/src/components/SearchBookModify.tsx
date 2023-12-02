import { useState, useEffect } from 'react'
import React from 'react'
import { GoSearch } from 'react-icons/go'

interface Book {
  title: string
  author: string
  genere: string
  editorial: string
  image: string
}

interface SearchBookModifyProps {
  allBooks: Book[]
  onSearchResults: (results: Book[]) => void
}

const SearchBookModify: React.FC<SearchBookModifyProps> = ({ allBooks, onSearchResults }) => {
  const [filteredProducts, setFilteredProducts] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  function arraysAreEqual(array1: any, array2: any) {
    return JSON.stringify(array1) === JSON.stringify(array2)
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = allBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genere.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.editorial.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (!arraysAreEqual(filtered, filteredProducts)) {
        setFilteredProducts(filtered)
      }
    } else setFilteredProducts(allBooks)
    onSearchResults(filteredProducts)
  }, [searchTerm, filteredProducts])

  return (
    <div className="mx-auto mt-10 grid h-full w-full grid-cols-8 items-center justify-center ">
      <div className="  col-span-7 flex h-full w-full  items-center gap-x-4 rounded-3xl bg-white pl-4 text-lg font-bold shadow-lg">
        <label htmlFor="searchInput">
          <GoSearch className=" text-2xl" />
        </label>
        <input
          id="searchInput"
          className="folnt-bold h-full w-full border-0 font-poppins text-lg placeholder-black focus:outline-none"
          type="text"
          placeholder="Buscar"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="ml-2 h-8 w-8 rounded-full bg-white text-lg font-bold text-black">?</button>
    </div>
  )
}

export default SearchBookModify