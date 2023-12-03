export interface Book {
  id: number
  title: string
  idAuthor: number
  IdEditorial: number
  genre: string
  quantity: number
  image: string
  editorialDto: Editorial
  authorDto: Author
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
