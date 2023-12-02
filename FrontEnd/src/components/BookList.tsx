import { useState, useEffect } from 'react'
import Book from './Book.tsx'
import { book } from '../types/types'
import SearchBookModify from './SearchBookModify'
import Pagination from '@mui/material/Pagination'

const BookList: React.FC = () => {
  const [books, setBooks] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 3 // podemos ponerlo como variable de entorno

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
    <div className="flex-col justify-center justify-items-stretch">
      <SearchBookModify allBooks={books} onSearchResults={handleSearchResults} />
      <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
        <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
          {searchResults.map((book: book, index) => {
            if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
              return <Book key={book.id} {...book} />
            } else {
              return null
            }
          })}
        </div>
      </div>
      <Pagination
        count={searchResults.length / PAGE_SIZE}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={page}
        onChange={(e, value) => {
          setPage(value)
        }}
      />
    </div>
  )
}

export default BookList
