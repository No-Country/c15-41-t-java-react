export interface Book {
  id: number
  title: string
  quantity: number
  idAuthor: number
  author: {
    id: number
    name: string
    lastName: string
  }
  genre: string
  editorial: {
    id: number
    name: string
    idEditorial: number
  }
  image: string
}

interface Author {
  id: number;
  name: string;
  lastName: string;
}

interface Editorial {
  id: number;
  name: string;
}
