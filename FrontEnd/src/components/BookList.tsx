import { useState, useEffect } from 'react'
import BookCard from './BookCard.tsx'
import type { Book } from '../types/types'
import SearchBookModify from './SearchBookModify'
import Pagination from '@mui/material/Pagination'
import { useUser } from '../context/UserContext.tsx'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[] | []>([])
  const [searchResults, setSearchResults] = useState<Book[] | []>([])
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 3 // podemos ponerlo como variable de entorno
  const { fetch } = useUser()

  useEffect(() => {
    const getBooks = async () => {
      const books = await fetch('http://localhost:3000/books')
      console.log(books)
      setBooks(books)
      setSearchResults(books)
    }
    getBooks().catch(error => {
      console.error(error)
    })
  }, [])

  const handleSearchResults = (results: any) => {
    setSearchResults(results)
  }

  if (books.length === 0) return <p>Loading</p>

  return (
    <div className="flex h-full w-full flex-col items-center">
      <SearchBookModify allBooks={books} onSearchResults={handleSearchResults} setPage={setPage} />
      <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
        {searchResults.length > 0 ? (
          searchResults.map((book, index) => {
            if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
              return <BookCard key={book.id} {...book} />
            } else {
              return null
            }
          })
        ) : (
          <p>No se encontraron coincidencias</p>
        )}
      </div>
      <div className="justify-self-end pb-8">
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
