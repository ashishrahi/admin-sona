import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import NewForm from './newForm'
import { Box } from '@mui/material'
import PolicyBreadcrumb from './policybreadcrubs.page'
const Gender = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={4}><PolicyBreadcrumb/></Box>
     <NewForm/>
        </Box>
      </Box>
  )
}

export default Gender