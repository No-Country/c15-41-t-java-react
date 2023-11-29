import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'

const Tabs = () => {
  return (
    <ReactTabs className="w-full px-24">
      <TabList className="flex h-[44px] w-full list-none justify-evenly gap-x-1">
        <Tab
          className="flex w-full items-center justify-center bg-[#E6E7E9] text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white"
          selectedClassName="bg-blueLight"
        >
          Ver catálogo completo
        </Tab>
        <Tab className="flex w-full items-center justify-center bg-[#E6E7E9] text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white">
          Agregar Libro
        </Tab>
        <Tab
          className="flex w-full items-center justify-center bg-[#E6E7E9] text-base font-[500] leading-[24px] text-blueLight hover:cursor-pointer aria-selected:bg-blueLight aria-selected:text-white"
          selectedClassName="bg-blueLight"
        >
          Buscador
        </Tab>
      </TabList>

      <TabPanel>{}</TabPanel>
      <TabPanel>{'Agregar Libro'}</TabPanel>
      <TabPanel>{'Busqueda'}</TabPanel>
    </ReactTabs>
  )
}

export default Tabs
