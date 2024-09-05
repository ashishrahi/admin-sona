import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import Inactivebreadcrubs from '../InactiveCategory/inactivecategorybreadcrubs.page'
import { Box } from '@mui/material'
const InactiveCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}} >
      <Navbar/>
     <Box marginLeft={4}><Inactivebreadcrubs/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}
export default InactiveCategory