import { useState, useEffect } from 'react'
import Book from './Book.tsx'
import { book } from '../types/types'
import SearchBookModify  from './SearchBookModify'



const BookList: React.FC = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(' http://localhost:3000/books')
      const data = await response.json()
      console.log(data)
      setBooks(data)
    }
    getBooks()
  }, [])

  return (
    <div>
    <SearchBookModify />
    <div className="grid w-full items-center justify-center gap-y-5 gap-x-14 py-5 align-middle lg:grid-cols-2">
    <div className="grid w-full items-center justify-center gap-x-14 gap-y-5 py-5 align-middle lg:grid-cols-2">
      {books.map((book: book) => (
        <Book key={book.id} {...book} />
      ))}
    </div>
   </div> 
  )
}

export default BookList
