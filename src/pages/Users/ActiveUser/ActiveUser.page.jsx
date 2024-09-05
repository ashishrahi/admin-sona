import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import Activebreadcrumbs from './activeuserbreadcrubs.page'
const ActiveKarigar = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}><Activebreadcrumbs/></Box>  
     <Datatable/>
        </Box>
      </Box>
  )
}

export default ActiveKarigar