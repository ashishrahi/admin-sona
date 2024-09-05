import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import Karigarbreadcrubs from './karigarbreadcrubs.page'
const Karigar = () => {
  return (
    <Box className='list' style={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box marginLeft={3}> <Karigarbreadcrubs/></Box>
     <Datatable/>
        </Box>
      </Box>
  )}

export default Karigar