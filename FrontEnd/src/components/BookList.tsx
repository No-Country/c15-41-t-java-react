import { useState, useEffect } from 'react'
import BookCard from './BookCard.tsx'
import type { Book } from '../types/types'
import SearchBookModify from './SearchBookModify'
import Pagination from '@mui/material/Pagination'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[] | []>([])
  const [searchResults, setSearchResults] = useState<Book[] | []>([])
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

  if (books.length === 0) return <p>Loading</p>

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <SearchBookModify allBooks={books} onSearchResults={handleSearchResults} />
      <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
        <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
          {searchResults.length > 0
            ? searchResults.map((book, index) => {
              if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
                return <BookCard key={book.id} {...book} />
              } else {
                return null
              }
            })
            : <p>No se encontraron coincidencias</p>}

        </div>
      </div>
      <div className='pb-8 justify-self-end'>
      <Pagination
        count={Math.ceil(searchResults.length / PAGE_SIZE)}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={page}
        onChange={(e, value) => {
          setPage(value)
        }}
      />
       </div>
    </div>
  )
}

export default BookList
