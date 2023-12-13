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
  idUser: number
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
  idLoan: number
  loanDate: string
  returnExpectedDate: string
  idBook: number
  idAdmin: number
  idUser: number
  bookDto: Book
  adminDto: Admin
  userDto: User
}

export interface Admin {
  idAdmin: number
  username: string
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
