import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import Colorcrumb from './Colorbreadcrubs.page'
const Kunda = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className='breadcrubs' marginLeft={4}><Colorcrumb/></Box> 
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Kunda