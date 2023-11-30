import { useState, useEffect } from 'react'
import Book from './Book.tsx'

interface book {
  id: number
  title: string
  author: string
  genere: string
  editorial: string
  image: string
}

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
    <div className="m-2 grid w-full grid-cols-2 items-center justify-center gap-5 p-5 align-middle">
      {books.map((book: book) => (
        <Book key={book.id} {...book} />
      ))}
    </div>
  )
}

export default BookList
