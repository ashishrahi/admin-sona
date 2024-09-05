import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import Gaugesizecrumb from './gaugesizebreadcrubs.page'
const GaugeSize = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className='breadcrumb' marginTop={4}><Gaugesizecrumb/></Box> 
     <Datatable/>
        </Box>
      </Box>
  )
}

export default GaugeSize