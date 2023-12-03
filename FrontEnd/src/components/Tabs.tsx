import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import RegisterForm from './RegisterForm'
import BookList from './BookList'
import { Book } from '../types/types'

const formData: Book = {
  id: 0,
  title: '',
  quantity: 0,
  author:{
    id: 0,
    name: '',
    lastName: ''
  },
  genre: '',
  editorial:{
    id: 0,
    name: ''
  },
  image: ''
  
}

const Tabs = () => {
  return (
    <ReactTabs className="max-lg:paddx-12 w-full px-24 max-sm:px-6">
      <TabList className="flex h-11 w-full list-none justify-evenly gap-x-1 max-lg:h-14">
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
        <RegisterForm formData={formData}/>
      </TabPanel>
    </ReactTabs>
  )
}

export default Tabs
