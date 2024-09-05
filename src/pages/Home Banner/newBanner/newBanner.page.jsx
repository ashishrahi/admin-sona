import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import NewForm from './newForm'
import Newbreadcrubs from './newbreadcrubs.page'
import { Box } from '@mui/material'

const ActiveCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}>  <Newbreadcrubs/></Box>
     <NewForm/>
        </Box>
      </Box>
  )
}

export default ActiveCategory