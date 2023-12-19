export interface Book {
  idBook: number
  title: string
  idAuthor: number
  idEditorial: number
  isbn: string
  idGenre: number
  image: string
  idImage: number
  quantity: number
  editorialDto: Editorial
  authorDto: Author
  genreDto: Genre
  imageDto: Image
}

export type BookPost = Omit<
  Book,
  'editorialDto' | 'authorDto' | 'idBook' | 'imageDto' | 'genreDto' | 'idImage'
>

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
  email: string
  name: string
  lastName: string
  password: string
}

export interface Author {
  name: string
  lastName: string
  idAuthor: number
}

export interface AuthorPost {
  name: string
  lastName: string
}

export interface Editorial {
  name: string
  idEditorial: number
  establishedDate: string
}

export interface AdminPost {
  idAdmin: number
  email: string
  name: string
  lastName: string
  password: string
}

export interface Genre {
  name: string
  idGenre: number
}

export interface Image {
  idImage: number
  name: string
  imagenUrl: string
  cloudinaryId: string
}
