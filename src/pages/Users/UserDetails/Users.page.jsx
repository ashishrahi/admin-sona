import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable'
import { Box } from '@mui/material'
import UserBreadcrubs from './userbreadcrubs.page'

const Users = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar />
     <Box marginLeft={4}><UserBreadcrubs/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Users