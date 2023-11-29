import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
const Tabs = () => {
  return (
    <div>
      <ReactTabs>
        <TabList>
          <Tab selectedClassName="bg-blueLight">Catálogo Completo</Tab>
          <Tab>Agregar Libro</Tab>
          <Tab>Búsqueda</Tab>
        </TabList>

        <TabPanel>{}</TabPanel>
        <TabPanel>{'Agregar Libro'}</TabPanel>
        <TabPanel>{'Busqueda'}</TabPanel>
      </ReactTabs>
    </div>
  )
}

export default Tabs