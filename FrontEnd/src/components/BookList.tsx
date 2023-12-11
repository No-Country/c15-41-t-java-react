import { useState, useEffect, useCallback } from 'react'
import BookCard from './BookCard.tsx'
import type { Book } from '../types/types'
import SearchBookModify from './SearchBookModify'
import Pagination from '@mui/material/Pagination'
import { useUser } from '../context/UserContext.tsx'
import Spinner from './Spinner.tsx'

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[] | []>([])
  const [searchResults, setSearchResults] = useState<Book[] | []>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const PAGE_SIZE = 6 // podemos ponerlo como variable de entorno
  const { fetch } = useUser()

  const getBooks = useCallback(async () => {
    try {
      setIsLoading(true)
      const books = await fetch('http://localhost:3000/books/all')
      setBooks(books)
      setSearchResults(books)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [fetch])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  const handleSearchResults = (results: any) => {
    setSearchResults(results)

    /*setBooks(results)*/
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <SearchBookModify allBooks={books} onSearchResults={handleSearchResults} setPage={setPage} />
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="p-10 text-center">Error cargando libros</p>
      ) : searchResults.length > 0 ? (
        <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
          {searchResults.map((book, index) => {
            if (index < page * PAGE_SIZE && index >= (page - 1) * PAGE_SIZE) {
              return <BookCard key={book.idBook} {...book} refresh={getBooks} />
            } else {
              return null
            }
          })}
        </div>
      ) : (
        <p className="p-10 text-center">No se encontraron coincidencias</p>
      )}
      <div className="justify-self-end pb-8">
        <Pagination
          count={Math.ceil(searchResults.length / PAGE_SIZE)}
          variant="outlined"
          shape="rounded"
          color="primary"
          page={page}
          onChange={(_, value) => {
            setPage(value)
          }}
        />
      </div>
    </div>
  )
}

export default BookList
