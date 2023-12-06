import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import UsersList from '../components/UsersList'
import UserRegisterForm from '../components/UserRegisterForm'
import { User } from '../types/types'

const initialValues: User = {
  idUsers: 0,
  dni: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  loansDto: [],
  active: true
}

const UsersTabs = () => {
  return (
    <ReactTabs className="max-lg:paddx-12 w-full px-24 max-sm:px-6">
      <TabList className="flex h-11 w-full list-none justify-evenly gap-x-1 max-lg:h-14">
        <Tab
          className="flex w-full flex-col flex-wrap items-center justify-center bg-[#E6E7E9] px-2 text-center text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white"
          selectedClassName="bg-blueLight"
        >
          <span className="inline">Socios registrados</span>
        </Tab>
        <Tab className="flex w-full flex-col flex-wrap items-center justify-center bg-[#E6E7E9] px-2 text-center text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white">
          Registrar nuevo Socio
        </Tab>
      </TabList>
      <TabPanel>
        <UsersList />
      </TabPanel>
      <TabPanel>
        <UserRegisterForm user={initialValues} setIsModalOpen={() => {}} />
      </TabPanel>
    </ReactTabs>
  )
}

export default UsersTabs
