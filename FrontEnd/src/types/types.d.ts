export interface Book {
  idBook: number
  title: string
  isbn: string
  quantity: number
  idAuthor: number
  idEditorial: number
  genre: string
  quantity: number
  image: string
  isbn: string
  editorialDto: Editorial
  authorDto: Author
}

export type BookPost = Omit<Book, 'editorialDto' | 'authorDto' | 'idBook'>

export interface User {
  idUsers: number
  dni: string
  name: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  loansDto: Loan[] | []
  active: boolean
}

export interface Loan {
  isLoan: boolean
  loanDate: string
  returnExpectedDate: string
  isBook: number
  isAdmin: number
  isUser: number
  bookDto: null
  adminDto: null
  userDto: null
}

export interface Author {
  name: string
  lastName: string
  idAuthor: number
}

export interface Editorial {
  name: string
  idEditorial: number
  establishedDate: string
}
