import { useState, useEffect } from 'react'
import BookC   from './Book.tsx'
import { BookL } from '../types/types'
import SearchBookModify from './SearchBookModify'


const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookL[]>([])
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(' http://localhost:3000/books')
      const data = await response.json()
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
          {searchResults.map((book: BookL) => (
            <BookC key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookList
