export interface Book {
  id: number
  title: string
  quantity: number
  idAuthor: number
  IdEditorial: number
  genre: string
  quantity: number
  image: string
  editorialDto: Editorial
  authorDto: Author
}

export interface BookPost {
  title: string
  isbn: string
  quantity: number
  idAuthor: number | null
  idEditorial: number | null
  genre: string
  image: string
}

export interface User {
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
