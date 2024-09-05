import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import ViewForm from './viewForm'
import { Box } from '@mui/material'
import ViewCrumb from './viewbreadcrubs.page'

const ViewUser = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}} >
      <Navbar/>
      <Box marginLeft={4}><ViewCrumb/></Box>
     <ViewForm/>
        </Box>
      </Box>
  )
}

export default ViewUser