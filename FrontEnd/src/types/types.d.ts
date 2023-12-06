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
  quantity: number
  idAuthor: number
  IdEditorial: number
  genre: string
  quantity: number
  image: string
}

export interface User {
  dni: string
  name: string
  lastName: string
  phoneNumber: string
  address: string
  email: string
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
