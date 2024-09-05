import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import NewPurity from './newPurity.page'
import { Box } from '@mui/material'
import Kundacrumb from './Kundabreadcrubs.page'
const Kunda = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className='breadcrubs' marginLeft={4}><Kundacrumb/></Box> 
     <NewPurity/>
        </Box>
      </Box>
  )
}

export default Kunda