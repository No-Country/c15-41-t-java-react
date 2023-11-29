import { useState } from 'react'
import Tabs from './Tabs.tsx'

type Props = {}

const BookList = (props: Props) => {
  const [books, setBooks] = useState([])
  return (
    <div>
      <Tabs />
    </div>
  )
}

export default BookList
