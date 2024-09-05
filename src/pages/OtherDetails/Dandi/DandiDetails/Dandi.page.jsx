import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import Dandibreadcrub from './dandibreadcrubs.page'
const Dandi = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className="breadcrub" marginLeft={4}><Dandibreadcrub/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Dandi