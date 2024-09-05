import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import NewForm from './newForm'
import { Box } from '@mui/material'
import Newbreadcrumbs from './newbreadcrubs.page'
const ActiveKarigar = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}><Newbreadcrumbs/></Box>  
     <NewForm/>
        </Box>
      </Box>
  )
}

export default ActiveKarigar