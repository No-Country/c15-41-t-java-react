export interface Book {
  id: number
  title: string
  author: string
  genre: string
  editorial: string
  image: string
}

export interface Author {
  name: string
  lastName: string
  id: number
}

export interface Editorial {
  name: string
  id: number
}
