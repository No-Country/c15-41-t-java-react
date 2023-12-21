import { useState } from 'react'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import RegisterForm from '@/feature/Libros/RegisterForm'
import BookList from '@/feature/Libros/BookList'
import { Book } from '@/types/types'

const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const initialValues: Book = {
    idBook: 0,
    title: '',
    idAuthor: -1,
    idEditorial: -1,
    isbn: '',
    idGenre: -1,
    image: '',
    idImage: 0,
    quantity: 0,
    editorialDto: {
      name: '',
      idEditorial: 0,
      establishedDate: ''
    },
    authorDto: {
      idAuthor: -1,
      name: '',
      lastName: ''
    },
    genreDto: {
      idGenre: -1,
      name: ''
    },
    imageDto: {
      idImage: 0,
      name: '',
      imagenUrl: '',
      cloudinaryId: ''
    }
  }

  const reopenList = () => {
    setTabIndex(0)
  }

  return (
    <ReactTabs
      className="w-full px-24 max-lg:px-12 max-sm:px-6"
      selectedIndex={tabIndex}
      onSelect={index => setTabIndex(index)}
    >
      <TabList className="flex h-11 w-full list-none justify-evenly gap-x-1 ">
        <Tab
          className="flex w-full flex-col flex-wrap items-center justify-center bg-[#E6E7E9] px-2 text-center text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white"
          selectedClassName="bg-blueLight"
        >
          <span className="inline max-lg:hidden">Ver catálogo completo</span>
          <span className="hidden max-lg:inline">Catálogo completo</span>
        </Tab>
        <Tab className="flex w-full flex-col flex-wrap items-center justify-center bg-[#E6E7E9] px-2 text-center text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white">
          Agregar Libro
        </Tab>
      </TabList>
      <TabPanel>
        <BookList />
      </TabPanel>
      <TabPanel>
        <RegisterForm {...initialValues} setIsModalOpen={() => {}} refresh={reopenList} id={0} />
      </TabPanel>
    </ReactTabs>
  )
}

export default Tabs
