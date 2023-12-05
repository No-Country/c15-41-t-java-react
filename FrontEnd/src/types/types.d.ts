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
  dni: number
  name: string
  lastName: string
  phoneNumber: number
  address: string
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
