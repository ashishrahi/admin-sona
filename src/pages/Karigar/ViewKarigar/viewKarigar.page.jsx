import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import ViewForm from './viewForm'
import Viewbreadcrubs from './viewbreadcrubs.page'
import { Box } from '@mui/material'
const ActiveCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}>  <Viewbreadcrubs/></Box>
     <ViewForm/>
        </Box>
      </Box>
  )
}

export default ActiveCategory