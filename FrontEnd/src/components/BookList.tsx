import { useState, useEffect } from 'react'
import Book from './Book.tsx'
import { book } from '../types/types'
import SearchBookModify from './SearchBookModify'

const BookList: React.FC = () => {
  const [books, setBooks] = useState([])
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(' http://localhost:3000/books')
      const data = await response.json()
      console.log(data)
      setBooks(data)
      setSearchResults(data)
    }
    getBooks()
  }, [])

  const handleSearchResults = (results: any) => {
    setSearchResults(results)
  }

  return (
    <div>
      <SearchBookModify allBooks={books} onSearchResults={handleSearchResults} />
      <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
        <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
          {searchResults.map((book: book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookList
